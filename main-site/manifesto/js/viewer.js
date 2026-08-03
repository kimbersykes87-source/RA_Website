/*
 * Rubber Armstrong — Manifesto PDF viewer
 *
 * Renders Manifesto_2026.pdf as a horizontally-swipeable stack of pages using
 * PDF.js (from cdnjs). Swipe/scroll-snap handles page navigation on touch and
 * trackpad; keyboard arrows work on desktop; browser viewport pinch handles
 * zoom (the meta viewport allows user-scalable up to 5x).
 *
 * Rendering strategy: lazy. Each page has a placeholder skeleton. An
 * IntersectionObserver ensures the current page + its immediate neighbours
 * are rendered as canvases at devicePixelRatio for crispness. Far pages stay
 * as skeletons to bound memory (24 hi-res PDF pages would otherwise be ~200MB).
 */

import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';

const PDF_URL = 'Manifesto_2026.pdf';
const NEIGHBOUR_RADIUS = 1; // render current +/- 1 pages; unload beyond this + buffer
const UNLOAD_RADIUS = 3;    // keep last-rendered within +/- 3 to avoid flicker on back-swipe

const pagesEl = document.getElementById('pages');
const loadingEl = document.getElementById('loading');
const hintEl = document.getElementById('hint');
const currentEl = document.getElementById('page-current');
const totalEl = document.getElementById('page-total');
const prevBtn = document.getElementById('nav-prev');
const nextBtn = document.getElementById('nav-next');

const state = {
  pdf: null,
  numPages: 0,
  currentPage: 1,
  renderedCanvases: new Map(), // pageNum -> {canvas, task}
  slots: [], // pageNum -> DOM element
};

/**
 * Load the PDF, populate skeleton slots, wire up interactions.
 */
async function init() {
  try {
    const loadingTask = pdfjsLib.getDocument({
      url: PDF_URL,
      disableAutoFetch: false,
      disableStream: false,
    });
    state.pdf = await loadingTask.promise;
    state.numPages = state.pdf.numPages;
    totalEl.textContent = String(state.numPages);

    buildSlots();
    setUpObserver();
    setUpNavigation();
    setUpScrollTracking();

    // Render the first page eagerly so we can hide the loading overlay ASAP.
    await renderPage(1);
    hideLoading();

    // Warm up the next couple of pages in the background.
    renderNeighbours(1);
  } catch (err) {
    console.error('Manifesto viewer failed to load:', err);
    showFallback(err);
  }
}

/**
 * Build the 24 slot elements upfront so scroll-snap has correct geometry
 * even before any page renders.
 */
function buildSlots() {
  const frag = document.createDocumentFragment();
  for (let n = 1; n <= state.numPages; n++) {
    const slot = document.createElement('div');
    slot.className = 'page';
    slot.dataset.page = String(n);
    slot.setAttribute('aria-label', `Page ${n} of ${state.numPages}`);
    const skel = document.createElement('div');
    skel.className = 'page__skeleton';
    slot.appendChild(skel);
    frag.appendChild(slot);
    state.slots[n] = slot;
  }
  pagesEl.appendChild(frag);
}

/**
 * Render a single PDF page into its slot's canvas, replacing the skeleton.
 * Cancels any previous in-flight render for the same page.
 */
async function renderPage(pageNum) {
  if (state.renderedCanvases.has(pageNum)) return;
  const slot = state.slots[pageNum];
  if (!slot) return;

  // Mark as in-progress immediately to prevent duplicate concurrent renders.
  state.renderedCanvases.set(pageNum, { canvas: null, task: null });

  try {
    const page = await state.pdf.getPage(pageNum);

    // Fit the page inside the current slot at its aspect ratio. We render at
    // devicePixelRatio × an oversample factor so pinch-zoom stays crisp for a
    // bit before pixelation. dpr is capped so 3x-density phones don't blow
    // memory.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const OVERSAMPLE = 1.5;
    const viewport1 = page.getViewport({ scale: 1 });
    const availW = Math.max(160, slot.clientWidth - 32);
    const availH = Math.max(160, slot.clientHeight - 76);
    const fitScale = Math.min(
      availW / viewport1.width,
      availH / viewport1.height,
    );
    const renderScale = fitScale * dpr * OVERSAMPLE;
    const viewport = page.getViewport({ scale: renderScale });

    const canvas = document.createElement('canvas');
    canvas.className = 'page__canvas';
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    // CSS display size = fitScale × natural. Setting both dimensions
    // authoritatively means CSS doesn't need to guess at aspect ratio.
    canvas.style.width = Math.floor(viewport1.width * fitScale) + 'px';
    canvas.style.height = Math.floor(viewport1.height * fitScale) + 'px';

    const ctx = canvas.getContext('2d', { alpha: false });
    const task = page.render({ canvasContext: ctx, viewport });
    state.renderedCanvases.set(pageNum, { canvas, task });
    await task.promise;

    // Only swap the DOM if this render wasn't superseded.
    const rec = state.renderedCanvases.get(pageNum);
    if (rec && rec.canvas === canvas) {
      slot.innerHTML = '';
      slot.appendChild(canvas);
    }
  } catch (err) {
    if (err?.name !== 'RenderingCancelledException') {
      console.error(`Failed to render page ${pageNum}:`, err);
    }
    state.renderedCanvases.delete(pageNum);
  }
}

/**
 * Ensure the current page and its immediate neighbours are rendered.
 * Evict pages further than UNLOAD_RADIUS to bound memory.
 */
function renderNeighbours(centrePage) {
  for (let offset = -NEIGHBOUR_RADIUS; offset <= NEIGHBOUR_RADIUS; offset++) {
    const n = centrePage + offset;
    if (n >= 1 && n <= state.numPages) renderPage(n);
  }
  // Evict far-away pages
  for (const n of Array.from(state.renderedCanvases.keys())) {
    if (Math.abs(n - centrePage) > UNLOAD_RADIUS) {
      const rec = state.renderedCanvases.get(n);
      if (rec?.task?.cancel) rec.task.cancel();
      state.renderedCanvases.delete(n);
      const slot = state.slots[n];
      if (slot) {
        slot.innerHTML = '';
        const skel = document.createElement('div');
        skel.className = 'page__skeleton';
        slot.appendChild(skel);
      }
    }
  }
}

/**
 * Track which page is currently in view via IntersectionObserver, updating
 * the pager and triggering neighbour renders on the fly.
 */
function setUpObserver() {
  const io = new IntersectionObserver((entries) => {
    // Pick the entry that's most in view.
    let best = null;
    for (const entry of entries) {
      if (!best || entry.intersectionRatio > best.intersectionRatio) {
        best = entry;
      }
    }
    if (best && best.intersectionRatio > 0.55) {
      const n = Number(best.target.dataset.page);
      if (n && n !== state.currentPage) {
        state.currentPage = n;
        currentEl.textContent = String(n);
        updateNavButtons();
        renderNeighbours(n);
      }
    }
  }, {
    root: pagesEl,
    threshold: [0.55, 0.85],
  });

  for (const slot of state.slots) {
    if (slot) io.observe(slot);
  }
}

/**
 * Backup: also update currentPage via scroll position (some browsers can
 * miss IO events during fast swipes).
 */
function setUpScrollTracking() {
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const w = pagesEl.clientWidth || 1;
      const idx = Math.round(pagesEl.scrollLeft / w) + 1;
      if (idx !== state.currentPage && idx >= 1 && idx <= state.numPages) {
        state.currentPage = idx;
        currentEl.textContent = String(idx);
        updateNavButtons();
        renderNeighbours(idx);
      }
    });
  };
  pagesEl.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Programmatic navigation used by arrow buttons and keyboard.
 */
function goToPage(n) {
  n = Math.max(1, Math.min(state.numPages, n));
  const slot = state.slots[n];
  if (!slot) return;
  slot.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function setUpNavigation() {
  prevBtn.hidden = false;
  nextBtn.hidden = false;

  prevBtn.addEventListener('click', () => goToPage(state.currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(state.currentPage + 1));
  updateNavButtons();

  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        goToPage(state.currentPage + 1);
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        goToPage(state.currentPage - 1);
        break;
      case 'Home':
        e.preventDefault();
        goToPage(1);
        break;
      case 'End':
        e.preventDefault();
        goToPage(state.numPages);
        break;
    }
  });

  // Re-render current page on resize (fit is viewport-dependent).
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Cancel + evict all cached renders, then re-render neighbourhood.
      for (const [, rec] of state.renderedCanvases) rec?.task?.cancel?.();
      state.renderedCanvases.clear();
      for (const slot of state.slots) {
        if (!slot) continue;
        if (!slot.querySelector('.page__skeleton')) {
          slot.innerHTML = '';
          const skel = document.createElement('div');
          skel.className = 'page__skeleton';
          slot.appendChild(skel);
        }
      }
      renderNeighbours(state.currentPage);
      // Re-anchor the scroll on the current page after layout shift.
      const slot = state.slots[state.currentPage];
      if (slot) pagesEl.scrollLeft = slot.offsetLeft;
    }, 200);
  }, { passive: true });
}

function updateNavButtons() {
  prevBtn.disabled = state.currentPage <= 1;
  nextBtn.disabled = state.currentPage >= state.numPages;
}

function hideLoading() {
  loadingEl.hidden = true;
  // Show the "swipe/arrow" hint briefly, only on first visit + on touch devices.
  const isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (!sessionStorage.getItem('ra_manifesto_hint_seen')) {
    hintEl.hidden = false;
    hintEl.textContent = isTouch
      ? 'Swipe to turn the page. Pinch to zoom.'
      : 'Arrow keys or click ‹ › to navigate. Pinch or Ctrl+scroll to zoom.';
    sessionStorage.setItem('ra_manifesto_hint_seen', '1');
    setTimeout(() => { hintEl.hidden = true; }, 6200);
  }
}

function showFallback(err) {
  loadingEl.innerHTML = `
    <div style="max-width: 28rem; padding: 1rem; text-align: center;">
      <p style="margin: 0 0 1rem; opacity: .85;">
        Couldn't load the interactive viewer${err?.message ? ' (' + err.message + ')' : ''}.
      </p>
      <a href="Manifesto_2026.pdf" download
         style="display: inline-block; padding: .75rem 1.25rem; background: #FFF200; color: #000; text-decoration: none; border-radius: 999px; font-weight: 600;">
        Download the PDF
      </a>
    </div>
  `;
}

init();
