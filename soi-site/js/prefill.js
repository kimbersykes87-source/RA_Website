/**
 * Rubber Armstrong SOI: fill in from last year for returning campers.
 * Email + birth year are checked by the tracking Worker (ra-email-tracking-v2, /soi-prefill), which
 * returns the stored profile. Country of residence, likelihood, offer and notes are never filled in.
 * An invite link can carry the email in the URL fragment (#email=...), which is never sent to a server.
 */
import { CONFIG } from './config.js';
import { COUNTRIES } from './countries.js';

(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);

  function emailFromFragment() {
    const m = /(?:^|[#&])email=([^&]+)/.exec(window.location.hash || '');
    if (!m) return '';
    try {
      return decodeURIComponent(m[1]).trim();
    } catch {
      return '';
    }
  }

  function setSelect(id, value) {
    const el = $(id);
    if (!el || value === null || value === undefined || value === '') return false;
    const v = String(value);
    const match = Array.from(el.options).find((o) => o.value === v || o.value.toLowerCase() === v.toLowerCase());
    if (!match) return false;
    el.value = match.value;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function setInput(id, value) {
    const el = $(id);
    if (!el || value === null || value === undefined || value === '') return;
    el.value = String(value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function setChecks(name, years) {
    const wanted = new Set((years || []).map(String));
    document.querySelectorAll(`input[name="${name}"]`).forEach((cb) => {
      cb.checked = wanted.has(cb.value);
    });
  }

  function show(text, kind) {
    const box = $('prefill-message');
    $('prefill-text').textContent = text;
    box.className = `message message-${kind} show`;
  }

  function fill(p) {
    setInput('firstName', p.firstName);
    setInput('lastName', p.lastName);
    setSelect('sex', p.sex);
    setSelect('birthYear', p.birthYear);
    // Stored as an ISO code (for example 'gb'); the form uses country names.
    const birth = COUNTRIES.find((c) => c.code.toLowerCase() === String(p.countryOfBirth || '').toLowerCase());
    setSelect('countryOfBirth', birth ? birth.name : p.countryOfBirth);
    if (p.phoneCode) setSelect('phoneCountryCode', String(p.phoneCode).startsWith('+') ? p.phoneCode : `+${p.phoneCode}`);
    setInput('phone', p.phone);
    setInput('referringCampmate', p.referredBy);
    setChecks('burnsWithRA', p.burnsWithRA);
    setChecks('burnsWithoutRA', p.burnsWithoutRA);
    const fb = $('firstBurn');
    if (fb) fb.checked = !!p.firstBurn;
    // Country of residence is deliberately left for the person to choose.
  }

  async function lookup() {
    const email = $('prefillEmail').value.trim();
    const birthYear = $('prefillBirthYear').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !birthYear) {
      show('Enter your email and birth year.', 'warning');
      return;
    }
    const btn = $('prefill-btn');
    btn.disabled = true;
    btn.classList.add('loading');
    try {
      const res = await fetch(CONFIG.PREFILL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, birthYear })
      });
      const data = await res.json().catch(() => ({}));
      if (data.status === 'ok' && data.profile) {
        fill(data.profile);
        setInput('email', email);
        show(
          'Done. We filled in your details from last time. Please check them, choose your country of residence, and answer the 2027 questions at the end.',
          'success'
        );
        $('countryOfResidence')?.focus();
      } else if (data.status === 'limited') {
        show('Too many tries. Please wait 15 minutes, or just fill in the form below.', 'warning');
      } else if (data.status === 'not_found') {
        setInput('email', email);
        show('We could not find you with that email and birth year. No problem, please fill in the form below.', 'warning');
      } else {
        show('Something went wrong. Please fill in the form below.', 'warning');
      }
    } catch {
      show('Something went wrong. Please fill in the form below.', 'warning');
    } finally {
      btn.disabled = false;
      btn.classList.remove('loading');
    }
  }

  // Show or hide the email and birth year fields behind the 'Camped with RA in 2026?' checkbox.
  function setOpen(open) {
    const toggle = $('prefillToggle');
    const fields = $('prefill-fields');
    if (!toggle || !fields) return;
    toggle.checked = open;
    toggle.setAttribute('aria-expanded', String(open));
    fields.hidden = !open;
  }

  function applyEmailFromLink() {
    const fromLink = emailFromFragment();
    if (!fromLink) return;
    setOpen(true);
    $('prefillEmail').value = fromLink;
    setInput('email', fromLink);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    $('prefillBirthYear').focus();
  }

  function init() {
    const year = $('prefillBirthYear');
    if (!year) return;
    for (let y = 2010; y >= 1940; y--) {
      const o = document.createElement('option');
      o.value = String(y);
      o.textContent = String(y);
      year.appendChild(o);
    }
    const toggle = $('prefillToggle');
    if (toggle) {
      toggle.addEventListener('change', () => {
        setOpen(toggle.checked);
        if (toggle.checked) $('prefillEmail').focus();
      });
    }
    applyEmailFromLink();
    window.addEventListener('hashchange', applyEmailFromLink);
    $('prefill-btn').addEventListener('click', lookup);
    [$('prefillEmail'), year].forEach((el) =>
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          lookup();
        }
      })
    );
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
