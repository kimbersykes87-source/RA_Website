# Copy Changes Review - All Text Modifications
**Date:** January 2026  
**Status:** Awaiting Approval

This document shows ALL text/copy changes made across the project. Review carefully before approval.

---

## 1. MAIN SITE - Ticketing Page (`main-site/ticketing.html`)

### Change 1: Steward Sale Ticket Process Clarification
**Location:** Lines 92-98

**BEFORE:**
```html
<li>Steward Sale tickets are applied for via the Statement of Intent.</li>
```

**AFTER:**
```html
<li>If you're interested in potentially receiving a Steward Sale ticket allocation, indicate this in your Statement of Intent.</li>
<li><strong>Expressing interest does not guarantee a ticket.</strong> Final allocation decisions are made by camp leadership based on contribution needs and camp capacity.</li>
```

### Change 2: Added Ticket Requirements Section
**Location:** After line 102 (new content)

**ADDED:**
```html
<div class="content-card" style="margin-top: var(--space-6); background-color: var(--color-bg-elevated); border-left: 3px solid var(--color-accent);">
  <p style="margin-bottom: 0; font-size: var(--font-size-sm);">
    <strong>Important:</strong> You do not need a Burning Man ticket to submit an SOI. However, if approved, you will need to secure a ticket through any Burning Man sale (Steward, DGS, Main Sale, OMG Sale, or resale) to complete the Join process. We cannot guarantee tickets, and approval does not guarantee camp placement if you cannot secure a ticket.
  </p>
</div>
```

---

## 2. MAIN SITE - Join Page (`main-site/join.html`)

### Change 1: Process Description
**Location:** Line 87

**BEFORE:**
```html
Joining Rubber Armstrong is a two-stage process, aligned with the Burning Man ticket cycle.
```

**AFTER:**
```html
Joining Rubber Armstrong is a multi-stage process aligned with the Burning Man ticket cycle.
```

### Change 2: Hero Subtitle Tone
**Location:** Line 77

**BEFORE:**
```html
Read it properly before applying.
```

**AFTER:**
```html
Please read this page carefully before submitting your SOI.
```

### Change 3: Review Period Language
**Location:** Lines 125-141

**BEFORE:**
```html
<ul>
  <li>Submissions are reviewed manually</li>
  <li>The review period typically takes 4–8 weeks</li>
  <li>We may not contact everyone</li>
  <li>Submitting an SOI does not guarantee a place</li>
</ul>

<p style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-4);">
  We prioritise people who demonstrate:
</p>
```

**AFTER:**
```html
<ul>
  <li>Submissions are reviewed manually</li>
  <li>The review period typically takes 4–8 weeks from submission</li>
  <li>We personally review each submission</li>
  <li>Submitting an SOI does not guarantee a place</li>
</ul>

<p style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-4);">
  We look for people who show:
</p>
```

### Change 4: Added "What to Expect" Section
**Location:** After line 141 (new content)

**ADDED:**
```html
<div class="content-card" style="margin-top: var(--space-6); background-color: var(--color-bg-elevated); border-left: 3px solid var(--color-accent);">
  <p style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-3);">
    What to Expect:
  </p>
  <ul style="font-size: var(--font-size-sm); margin-bottom: 0;">
    <li>Review typically takes 4-8 weeks from submission</li>
    <li>If approved, you'll receive an email with next steps after major ticket sales conclude (typically mid-to-late March)</li>
    <li>If not approved, you may not receive a response (we receive many submissions and cannot respond to all)</li>
    <li>If you don't hear back by late March, assume we were unable to move forward with your application this year, but we appreciate your interest</li>
    <li>Approved applicants who miss the follow-up window may forfeit their spot</li>
  </ul>
</div>
```

### Change 5: Timing and Tickets Section
**Location:** Lines 150-160

**BEFORE:**
```html
<li>The SOI opens before tickets are finalised</li>
<li>The formal "I Want to Join" intake opens only after the Steward Sale has completed</li>
...
<p>If you are approved to move forward, you will be contacted with next steps after major ticket sales have concluded.</p>
```

**AFTER:**
```html
<li>The SOI opens before tickets are finalized</li>
<li>The formal "I Want to Join" intake opens after major ticket sales have concluded, typically in mid-to-late March</li>
<li>You do not need a Burning Man ticket to submit an SOI</li>
...
<p>If you are approved to move forward, you will be contacted with next steps after major ticket sales have concluded. However, if approved, you will need to secure a ticket through any Burning Man sale (Steward, DGS, Main Sale, OMG Sale, or resale) to complete the Join process.</p>
```

### Change 6: Important Notes - Approval Language
**Location:** Lines 169-173

**BEFORE:**
```html
<li>Submitting an SOI does not mean you are in the camp</li>
<li>Approval means you may be invited to complete the next step once tickets are secured</li>
<li>If you are looking for guaranteed tickets, plug-and-play camping, or low responsibility, this camp is not for you</li>
```

**AFTER:**
```html
<li>Submitting an SOI does not mean you are in the camp</li>
<li>If approved, you will be invited to complete the Join form after major ticket sales conclude, provided you have secured a Burning Man ticket through any sale (Steward, DGS, Main Sale, OMG Sale, or resale)</li>
<li>Approval does not guarantee camp placement if you cannot secure a ticket</li>
<li>If you are looking for guaranteed tickets, plug-and-play camping, or low responsibility, this camp is not for you</li>
```

---

## 3. SOI FORM - Statement of Intent (`soi-site/index.html`)

### Change 1: Form Notice - Added Timeline
**Location:** Lines 77-79

**BEFORE:**
```html
<div class="form-notice">
  <p><strong>Important</strong>: This is not a Burning Man ticket. This is not a guarantee of placement. This is the start of a conversation.</p>
</div>
```

**AFTER:**
```html
<div class="form-notice">
  <p><strong>Important</strong>: This is not a Burning Man ticket. This is not a guarantee of placement. This is the start of a conversation.</p>
  <p style="margin-top: var(--space-3); font-size: var(--font-size-sm);">Submissions are reviewed manually (typically 4-8 weeks). If approved, you'll be contacted after major ticket sales conclude (typically mid-to-late March). If you don't hear back by late March, we weren't able to move forward with your application this year, but we appreciate your interest.</p>
</div>
```

### Change 2: Steward Ticket Interest Field Hint
**Location:** Line 512

**BEFORE:**
```html
<span class="field-hint">RA may have access to Steward Sale tickets for dedicated members</span>
```

**AFTER:**
```html
<span class="field-hint">Indicate if you're interested in potentially receiving a Steward Sale ticket allocation. Note: Expressing interest does not guarantee a ticket. Final allocations are determined by camp leadership based on contribution needs and capacity.</span>
```

### Change 3: Submission Acknowledgment
**Location:** Line 559

**BEFORE:**
```html
By submitting, you acknowledge this is not a ticket, not a guarantee of placement, and is the beginning of a conversation.
```

**AFTER:**
```html
By submitting, you acknowledge this is not a ticket, not a guarantee of placement, and is the beginning of a conversation. You understand that expressing interest in Steward Sale tickets does not guarantee a ticket allocation, and that approval does not guarantee camp placement if you cannot secure a Burning Man ticket.
```

---

## 4. EMAIL TEMPLATES - Invitation Email (`invitation-2026-final.html`)

### Change 1: Tent Sale Contact Method
**Location:** Line 21

**BEFORE:**
```html
If you know another camp that could use proven shelter, reach out to me directly.
```

**AFTER:**
```html
If you know another camp that could use proven shelter, reach out to us at rubberarmstrongcamp@gmail.com.
```

### Change 2: Added SOI Explanation Section
**Location:** After line 25 (new content)

**ADDED:**
```html
<p style="margin-bottom: 16px; font-size: 14px; color: #666; background-color: #f9f9f9; padding: 12px; border-left: 3px solid #000;">
  <strong>About the Statement of Intent:</strong> This is a brief form (about 5 minutes) that helps us understand who you are, what you bring to the camp, and your interest in joining. It's not a ticket, not a guarantee of placement, but the first step in our process. Submissions are reviewed manually, and we'll contact approved applicants after major ticket sales conclude (typically mid-to-late March). If you're interested in potentially receiving a Steward Sale ticket allocation, indicate this in your SOI. Note: Expressing interest does not guarantee a ticket.
</p>
```

### Change 3: CTA Text
**Location:** Line 25

**BEFORE:**
```html
If you are interested in joining us for 2026 complete the Statement of Intent form.
```

**AFTER:**
```html
If you're interested in joining us for 2026, please complete the Statement of Intent form.
```

---

## 5. EMAIL TEMPLATES - Follow-Up Email (`follow-up.html`)

### Change 1: Removed False Urgency
**Location:** Line 21

**BEFORE:**
```html
<p style="margin-bottom: 16px;"><strong>Steward tickets are coming up soon</strong>, and we need to know who's interested in joining so we can allocate tickets accordingly.</p>
```

**AFTER:**
```html
<p style="margin-bottom: 16px;">If you're planning to join us in 2026, please complete the Statement of Intent when you're ready. This helps us plan for infrastructure and understand interest levels. Steward Sale ticket allocations (if any) will be determined after we review all submissions and understand camp capacity needs.</p>
```

### Change 2: Updated Additional Info
**Location:** Line 34

**BEFORE:**
```html
Even if you're unsure or can only join for part of the week, we'd love to hear from you. The form helps us plan for infrastructure, tents, and steward ticket allocation.
```

**AFTER:**
```html
Even if you're unsure or can only join for part of the week, we'd love to hear from you. The form helps us plan for infrastructure and understand interest levels.
```

---

## 6. GMAIL AUTOMATION SCRIPT (`gmail-automation.gs`)

### Change 1: Template Function - Tent Contact
**Location:** Line 96

**BEFORE:**
```javascript
We are in advanced talks with a tent manufacturer on a new run of tents with serious upgrades. That means we will have around 25 existing Rubber Armstrong tents available for sale. If you know another camp that could use proven shelter, reach out to me directly.
```

**AFTER:**
```javascript
We are in advanced talks with a tent manufacturer on a new run of tents with serious upgrades. That means we will have around 25 existing Rubber Armstrong tents available for sale. If you know another camp that could use proven shelter, reach out to us at rubberarmstrongcamp@gmail.com.
```

### Change 2: Template Function - Added SOI Explanation
**Location:** After line 100 (new content in template)

**ADDED:**
```html
<p style="margin-bottom: 16px; font-size: 14px; color: #666; background-color: #f9f9f9; padding: 12px; border-left: 3px solid #000;">
  <strong>About the Statement of Intent:</strong> This is a brief form (about 5 minutes) that helps us understand who you are, what you bring to the camp, and your interest in joining. It's not a ticket, not a guarantee of placement, but the first step in our process. Submissions are reviewed manually, and we'll contact approved applicants after major ticket sales conclude (typically mid-to-late March). If you're interested in potentially receiving a Steward Sale ticket allocation, indicate this in your SOI. Note: Expressing interest does not guarantee a ticket.
</p>
```

### Change 3: Template Function - CTA Text
**Location:** Line 100

**BEFORE:**
```javascript
If you are interested in joining us for 2026 complete the Statement of Intent form.
```

**AFTER:**
```javascript
If you're interested in joining us for 2026, please complete the Statement of Intent form.
```

### Change 4: Plain Text Template
**Location:** Lines 57-61

**BEFORE:**
```javascript
We are in advanced talks with a tent manufacturer on a new run of tents with serious upgrades. That means we will have around 25 existing Rubber Armstrong tents available for sale. If you know another camp that could use proven shelter, reach out to me directly.

We have been going through the post playa survey properly, and the changes are already being built into 2026 and we are working on some exciting upgrades.

If you are interested in joining us for 2026 complete the Statement of Intent form. If you know someone that you think would be a good fit with our fam, feel free to forward them this invite.
```

**AFTER:**
```javascript
We are in advanced talks with a tent manufacturer on a new run of tents with serious upgrades. That means we will have around 25 existing Rubber Armstrong tents available for sale. If you know another camp that could use proven shelter, reach out to us at rubberarmstrongcamp@gmail.com.

We have been going through the post playa survey properly, and the changes are already being built into 2026 and we are working on some exciting upgrades.

If you're interested in joining us for 2026, please complete the Statement of Intent form. If you know someone that you think would be a good fit with our fam, feel free to forward them this invite.

About the Statement of Intent: This is a brief form (about 5 minutes) that helps us understand who you are, what you bring to the camp, and your interest in joining. It's not a ticket, not a guarantee of placement, but the first step in our process. Submissions are reviewed manually, and we'll contact approved applicants after major ticket sales conclude (typically mid-to-late March). If you're interested in potentially receiving a Steward Sale ticket allocation, indicate this in your SOI. Note: Expressing interest does not guarantee a ticket.
```

---

## 7. EMAIL TEMPLATES - Alternative Version (`invitation-2026.html`)

**Note:** This template was synchronized with `invitation-2026-final.html` to match all changes above.

### Changes Match:
- Tent contact method updated
- SOI explanation added
- CTA text updated

---

## 8. EMAIL TEMPLATES - Text Version (`invitation-2026.txt`)

### Changes Match:
- Tent contact method updated
- SOI explanation added (in plain text format)
- CTA text updated

---

## SUMMARY OF KEY THEMES

### 1. Steward Sale Ticket Clarity
- **Everywhere:** Added clear disclaimers that expressing interest does NOT guarantee tickets
- **Everywhere:** Clarified that allocations are determined by camp leadership based on needs

### 2. Timeline Expectations
- **Everywhere:** Clarified "4-8 weeks from submission" but "final decisions after ticket sales conclude (mid-to-late March)"
- **Everywhere:** Added "if you don't hear back by late March" language

### 3. Ticket Requirements
- **Everywhere:** Clarified you don't need a ticket to submit SOI
- **Everywhere:** Clarified you DO need a ticket (from any sale) to complete Join process if approved

### 4. Approval Language
- **Everywhere:** Changed from "may be invited" to "will be invited" (if approved)
- **Everywhere:** Added "approval does not guarantee camp placement if you cannot secure a ticket"

### 5. Contact Information
- **Email templates:** Changed "reach out to me directly" to "reach out to us at rubberarmstrongcamp@gmail.com"

### 6. Tone Improvements
- Changed "Read it properly" to "Please read this page carefully"
- Changed "We prioritise" to "We look for"
- Changed "We may not contact everyone" to warmer rejection language

---

## FILES WITH NO TEXT CHANGES (Only Structure)

- `main-site/ticketing.html` - Removed duplicate HTML closing tags (lines 169-189)
- `main-site/join.html` - Removed duplicate HTML closing tags (lines 237-255)

---

## READY FOR REVIEW

All changes maintain the existing tone while adding clarity and setting proper expectations. 

**Total files with copy changes:** 8 files  
**Total new sections added:** 4 major sections  
**Total disclaimers/clarifications added:** 12 instances

---

**Awaiting your approval to push these changes live.**

