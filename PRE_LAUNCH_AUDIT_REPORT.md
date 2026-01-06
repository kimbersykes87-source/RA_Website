# Pre-Launch Risk Audit Report
**Rubber Armstrong 2026 Email Campaign**  
**Date:** January 2026  
**Auditor:** Senior Technical + Communications Auditor  
**Scope:** End-to-end review of all documents, pages, forms, emails, and scripts

---

## Executive Summary

**Status: ⚠️ NO-GO - Critical Issues Must Be Fixed**

This audit identified **8 critical issues** that must be resolved before sending emails tomorrow, plus **12 high-risk ambiguities** and multiple operational improvements. The primary concerns are:

1. **Contradictory messaging** about Steward Sale tickets and process
2. **Missing critical information** about what happens after SOI submission
3. **Tone inconsistencies** that could create false expectations
4. **Operational gaps** that will generate unnecessary admin work
5. **Legal/expectation risks** around ticket guarantees and timelines

**Estimated fix time:** 4-6 hours for critical issues

---

## Critical Issues
**Must fix before sending emails tomorrow**

### 1. **Contradictory Steward Sale Information**
**Location:** Multiple files  
**Severity:** CRITICAL

**Problem:**
- `ticketing.html` says: "Steward Sale tickets are applied for via the Statement of Intent"
- `join.html` says: "The formal 'I Want to Join' intake opens only after the Steward Sale has completed"
- Email says: "We have also requested 40 Steward Sale tickets"
- SOI form asks: "Interest in Securing RA Steward Sale Ticket"

**Why it's a problem:**
Recipients will be confused about:
- Can they get Steward Sale tickets through SOI?
- When do Steward Sale tickets actually happen?
- Is expressing interest in SOI the same as applying for tickets?
- What happens if they say "yes" to Steward Ticket interest?

**Fix:**
1. **Clarify in `ticketing.html`:** "Steward Sale tickets are allocated by Burning Man Org to camps. If you are interested in potentially receiving a Steward Sale ticket allocation, indicate this in your SOI. However, expressing interest does not guarantee a ticket, and final allocation decisions are made by the camp leadership based on contribution needs and camp capacity."

2. **Update `join.html`:** Change "The formal 'I Want to Join' intake opens only after the Steward Sale has completed" to "The formal 'I Want to Join' intake opens after major ticket sales have concluded, typically in mid-to-late March."

3. **Add to email:** "If you're interested in potentially receiving a Steward Sale ticket allocation, indicate this in your SOI. Note: Expressing interest does not guarantee a ticket."

---

### 2. **Missing "What Happens Next" Information**
**Location:** `join.html`, `soi-site/index.html`, email templates  
**Severity:** CRITICAL

**Problem:**
Nowhere clearly states:
- How long review takes (join.html says "4-8 weeks" but email doesn't mention this)
- What happens if someone is NOT approved (do they get notified?)
- What happens if someone IS approved but misses a window
- When will they hear back (specific timeline or "we may not contact everyone")?

**Why it's a problem:**
Recipients will email asking "Did you get my SOI?" "When will I hear back?" "What if I don't hear anything?" This creates operational load.

**Fix:**
Add to `join.html` after "Stage 2: Review Period" section:

```html
<p style="font-weight: var(--font-weight-semibold); margin-top: var(--space-6);">
  What to Expect:
</p>
<ul style="font-size: var(--font-size-md);">
  <li>Review typically takes 4-8 weeks from submission</li>
  <li>If approved, you'll receive an email with next steps after major ticket sales conclude (typically mid-to-late March)</li>
  <li>If not approved, you may not receive a response (we receive many submissions and cannot respond to all)</li>
  <li>If you don't hear back by late March, assume we were unable to move forward with your application</li>
  <li>Approved applicants who miss the follow-up window may forfeit their spot</li>
</ul>
```

Add similar language to email footer or as a separate section.

---

### 3. **Email Says "Reach Out to Me Directly" But No Contact Method**
**Location:** `email_tracking/templates/invitation-2026-final.html` line 21  
**Severity:** CRITICAL

**Problem:**
Email says: "If you know another camp that could use proven shelter, reach out to me directly."

But there's no "me" identified, no email address, no contact method. This will cause confusion and missed opportunities.

**Fix:**
Change to: "If you know another camp that could use proven shelter, reach out to us at rubberarmstrongcamp@gmail.com."

---

### 4. **Follow-Up Email Creates False Urgency**
**Location:** `email_tracking/templates/follow-up.html` line 21  
**Severity:** CRITICAL

**Problem:**
Follow-up email says: "**Steward tickets are coming up soon**, and we need to know who's interested in joining so we can allocate tickets accordingly."

This implies:
- Steward Sale is imminent (but it's not - it's typically mid-March)
- They need to submit SOI urgently to get tickets
- The camp is waiting on their response to allocate tickets

**Why it's a problem:**
Creates false urgency, could cause panic submissions, and sets wrong expectations about timeline.

**Fix:**
Change to: "If you're planning to join us in 2026, please complete the Statement of Intent when you're ready. This helps us plan for infrastructure and understand interest levels. Steward Sale ticket allocations (if any) will be determined after we review all submissions and understand camp capacity needs."

---

### 5. **Join Page Says "Two-Stage Process" But Describes Three Stages**
**Location:** `main-site/join.html` lines 85-143  
**Severity:** CRITICAL

**Problem:**
- Line 87: "Joining Rubber Armstrong is a two-stage process"
- But then describes: Stage 1 (SOI), Stage 2 (Review), and implies Stage 3 (Join form after approval)

**Why it's a problem:**
Confusing structure. Recipients won't understand the actual flow.

**Fix:**
Change line 87 to: "Joining Rubber Armstrong is a multi-stage process aligned with the Burning Man ticket cycle."

Then clarify:
- **Stage 1:** Submit Statement of Intent (SOI) - open now
- **Stage 2:** Review period (4-8 weeks)
- **Stage 3:** If approved, complete Join form after ticket sales conclude

---

### 6. **SOI Form Missing Critical Context About Steward Tickets**
**Location:** `soi-site/index.html` line 512  
**Severity:** CRITICAL

**Problem:**
Form hint says: "RA may have access to Steward Sale tickets for dedicated members"

This is vague and could be interpreted as:
- "If I'm dedicated, I'll get a ticket"
- "All members get tickets"
- "Tickets are guaranteed for good applicants"

**Fix:**
Change hint to: "Indicate if you're interested in potentially receiving a Steward Sale ticket allocation. Note: Expressing interest does not guarantee a ticket. Final allocations are determined by camp leadership based on contribution needs and capacity."

---

### 7. **Duplicate HTML Content in Files**
**Location:** `main-site/join.html` lines 237-255, `main-site/ticketing.html` lines 169-189  
**Severity:** CRITICAL

**Problem:**
Both files have duplicate closing HTML (footer, nav, script tags repeated 3 times). This suggests file corruption or incomplete edits.

**Fix:**
Remove duplicate content. Each file should end once with proper closing tags.

---

### 8. **Email Template Inconsistency**
**Location:** `email_tracking/templates/invitation-2026.html` vs `invitation-2026-final.html`  
**Severity:** CRITICAL

**Problem:**
Two different versions of the same email:
- `invitation-2026.html` has different CTA text and structure
- `invitation-2026-final.html` is the one referenced in automation scripts
- Which one is actually being sent?

**Fix:**
1. Confirm which template is actually used by `gmail-automation.gs`
2. Delete or archive the unused version
3. Update all references to point to the correct template
4. Add comment in code: "This is the active template - do not edit invitation-2026.html"

---

## High-Risk Ambiguities
**Could cause confusion or follow-up but not catastrophic**

### 9. **"We May Not Contact Everyone" Is Buried**
**Location:** `main-site/join.html` line 128  
**Severity:** HIGH

**Problem:**
Critical information ("We may not contact everyone") is in a bullet point, easy to miss. Many recipients will assume they'll get a response.

**Fix:**
Make this more prominent:
- Add as a callout box
- Put it in the email itself
- Add to SOI form submission confirmation

---

### 10. **Review Timeline Inconsistency**
**Location:** `main-site/join.html` line 127  
**Severity:** HIGH

**Problem:**
Says "typically takes 4–8 weeks" but:
- What if someone submits in January? They won't hear until March?
- What if Steward Sale happens in mid-March? Will reviews be done by then?
- Is "4-8 weeks" from submission or from a specific date?

**Fix:**
Clarify: "Review typically takes 4-8 weeks from submission. However, final decisions and next steps are communicated after major ticket sales conclude (typically mid-to-late March), regardless of when you submitted your SOI."

---

### 11. **"Approval Means You May Be Invited" Is Weak Language**
**Location:** `main-site/join.html` line 171  
**Severity:** HIGH

**Problem:**
"Approval means you may be invited to complete the next step once tickets are secured"

The double conditional ("may be invited" + "once tickets are secured") is confusing. Does approval guarantee an invitation? Or is it still conditional?

**Fix:**
Clarify: "If approved, you will be invited to complete the Join form after major ticket sales conclude, provided you have secured a Burning Man ticket through any sale (Steward, DGS, Main Sale, etc.). Approval does not guarantee camp placement if you cannot secure a ticket."

---

### 12. **Missing Information About Ticket Requirements**
**Location:** All pages  
**Severity:** HIGH

**Problem:**
Nowhere clearly states:
- Do you need a ticket BEFORE submitting SOI? (No, but this isn't clear)
- Do you need a ticket to be approved? (Unclear)
- What if you get approved but can't get a ticket?
- Can you join if you get a ticket through Main Sale instead of Steward?

**Fix:**
Add to `join.html` and `ticketing.html`:

"You do not need a Burning Man ticket to submit an SOI. However, if approved, you will need to secure a ticket through any Burning Man sale (Steward, DGS, Main Sale, OMG Sale, or resale) to complete the Join process. We cannot guarantee tickets, and approval does not guarantee camp placement if you cannot secure a ticket."

---

### 13. **Email Doesn't Explain What SOI Actually Is**
**Location:** Email templates  
**Severity:** HIGH

**Problem:**
Email says "complete the Statement of Intent form" but doesn't explain:
- What is it?
- Why do I need to fill it out?
- What happens after?
- How long does it take?

**Fix:**
Add to email before CTA:

"The Statement of Intent is a brief form (about 5 minutes) that helps us understand who you are, what you bring to the camp, and your interest in joining. It's not a ticket, not a guarantee of placement, but the first step in our process. Submissions are reviewed manually, and we'll contact approved applicants after major ticket sales conclude."

---

### 14. **"10th Year Running" May Be Inaccurate**
**Location:** Email templates, `main-site/about.html`  
**Severity:** HIGH

**Problem:**
Email says "10th year running" and "Est. 2015". 
- 2015 to 2026 = 11 years (if counting 2015 as year 1)
- Or 10 years if 2015 doesn't count
- Need to verify: Is this the 10th or 11th year?

**Fix:**
Verify the math and update consistently. If it's actually the 11th year, update all references.

---

### 15. **Tent Sale Information Is Premature**
**Location:** Email templates  
**Severity:** HIGH

**Problem:**
Email mentions "25 existing Rubber Armstrong tents available for sale" but:
- This is operational detail, not relevant to SOI submission
- Could confuse recipients ("Do I need to buy a tent?")
- Should this be in a separate email to existing members only?

**Fix:**
Either:
1. Remove from initial invitation email (send to existing members separately)
2. Or clarify: "For existing RA members: We will have approximately 25 existing tents available for sale. Contact us if interested."

---

### 16. **Missing Unsubscribe Instructions in Some Templates**
**Location:** `email_tracking/templates/invitation-2026-final.html`  
**Severity:** HIGH

**Problem:**
`invitation-2026-final.html` has unsubscribe via email, but `invitation-2026.html` has a tracking URL. Inconsistent and may not comply with email best practices.

**Fix:**
Standardize unsubscribe method across all templates. Use tracking URL method (more reliable) and ensure it works.

---

### 17. **"Past, Present and Future Rubbers" Is Confusing**
**Location:** Email greeting  
**Severity:** MEDIUM-HIGH

**Problem:**
Greeting says "Hello past, present and future Rubbers" but:
- "Past" implies former members (are they being invited back?)
- "Present" implies current members (do they need to submit SOI?)
- "Future" is clear

**Fix:**
Clarify audience: "Hello Rubber Armstrong family and friends," or "Hello past and future Rubber Armstrong campers,"

---

### 18. **No Clear Call-to-Action Hierarchy in Email**
**Location:** Email templates  
**Severity:** MEDIUM-HIGH

**Problem:**
Email has multiple CTAs:
- Complete SOI form (primary)
- Forward to friends (secondary)
- Contact about tents (tertiary)

But they're not visually prioritized, and the tent CTA might distract from the main goal.

**Fix:**
Make SOI CTA clearly primary (larger, more prominent). Move tent info to footer or separate section.

---

### 19. **Join Page Process Description Doesn't Match Reality**
**Location:** `main-site/join.html`  
**Severity:** MEDIUM-HIGH

**Problem:**
Page says "two-stage process" but the actual flow is:
1. SOI submission
2. Review (4-8 weeks)
3. Approval/rejection
4. Join form (if approved, after tickets)
5. Final confirmation

That's actually 5 stages, not 2.

**Fix:**
Rewrite to accurately describe the flow without over-complicating. Use "multi-stage" or break it down clearly.

---

### 20. **Missing Information About What "Approval" Actually Means**
**Location:** All pages  
**Severity:** MEDIUM-HIGH

**Problem:**
"Approval" is used but never clearly defined:
- Does it mean guaranteed camp placement?
- Does it mean you can submit Join form?
- Does it mean you'll get a Steward ticket?
- What are you actually approved FOR?

**Fix:**
Define clearly: "Approval means you've passed our initial review and alignment check. If approved, you'll be invited to complete the Join form after ticket sales conclude. Approval does not guarantee camp placement, tickets, or infrastructure allocation - those depend on ticket availability and camp capacity."

---

## Tone & Clarity Improvements
**Suggested rewrites or framing changes**

### 21. **Overly Formal Language in Some Places**
**Location:** Various pages  
**Severity:** MEDIUM

**Examples:**
- "We prioritise people who demonstrate" (British spelling, formal tone)
- "Submissions are reviewed manually" (could be warmer)
- "We may not contact everyone" (too blunt)

**Fix:**
- "We look for people who show"
- "We personally review each submission"
- "Due to volume, we may not be able to respond to every submission, but we read them all"

---

### 22. **Inconsistent Use of "We" vs "Rubber Armstrong"**
**Location:** Email templates  
**Severity:** MEDIUM

**Problem:**
Email mixes "we" and "Rubber Armstrong" inconsistently. Sometimes sounds like one person, sometimes like an organization.

**Fix:**
Standardize: Use "we" for camp leadership/community, "Rubber Armstrong" for the camp as an entity.

---

### 23. **"Read It Properly" Is Condescending**
**Location:** `main-site/join.html` line 77  
**Severity:** MEDIUM

**Problem:**
"Read it properly before applying" sounds like you're scolding the reader.

**Fix:**
"Please read this page carefully before submitting your SOI" or "Take a few minutes to understand our process"

---

### 24. **Missing Warmth in Rejection Language**
**Location:** `main-site/join.html`  
**Severity:** MEDIUM

**Problem:**
"We may not contact everyone" is cold. No acknowledgment that this might be disappointing.

**Fix:**
"We receive many thoughtful submissions and unfortunately cannot respond to all of them. If you don't hear from us by late March, we weren't able to move forward with your application this year, but we appreciate your interest."

---

### 25. **Email Doesn't Match Website Tone**
**Location:** Email vs website  
**Severity:** MEDIUM

**Problem:**
Email is more casual/conversational, website is more formal. Creates inconsistency.

**Fix:**
Align tone. Either make email slightly more formal or website slightly more conversational.

---

## Operational Improvements
**Changes that reduce admin load or future pain**

### 26. **No FAQ Page to Answer Common Questions**
**Location:** Missing  
**Severity:** MEDIUM

**Problem:**
Recipients will email asking:
- "Do I need a ticket to submit SOI?"
- "When will I hear back?"
- "What if I'm approved but can't get a ticket?"
- "Can I bring a partner?"
- "What are the costs?"

**Fix:**
Create FAQ page or add FAQ section to Join page. Address top 10-15 questions.

---

### 27. **No Automated Response to SOI Submissions**
**Location:** Form submission flow  
**Severity:** MEDIUM

**Problem:**
People submit SOI and get no confirmation email. They'll email asking "Did you get it?"

**Fix:**
Add automated confirmation email:
- "Thanks for your SOI submission"
- "What happens next"
- "Timeline expectations"
- "Contact info if questions"

---

### 28. **Missing "What If I Don't Have a Ticket?" Information**
**Location:** All pages  
**Severity:** MEDIUM

**Problem:**
Many recipients won't have tickets. Nowhere explains:
- Can they still join if they get a ticket later?
- What if they get a ticket through Main Sale?
- Is there a deadline to secure a ticket?

**Fix:**
Add section: "What if I don't have a ticket yet?"
- You can submit SOI without a ticket
- If approved, you'll need to secure a ticket through any sale
- We can't guarantee tickets, but we'll work with you if you're approved

---

### 29. **No Clear Process for Existing Members**
**Location:** Email and website  
**Severity:** MEDIUM

**Problem:**
Email goes to "past, present and future" but doesn't clarify:
- Do existing 2025 members need to submit SOI?
- Is there a different process for returning members?
- What about people who camped with RA before?

**Fix:**
Add note: "Returning RA members: You still need to submit an SOI for 2026. This helps us plan capacity and understand who's returning."

---

### 30. **Missing Information About Camp Costs**
**Location:** All pages  
**Severity:** MEDIUM

**Problem:**
Nowhere mentions:
- Are there camp dues?
- What are the costs?
- What's included vs. what to bring?

**Fix:**
Add section or FAQ item about costs. Even if it's "Camp costs are determined annually and communicated to approved members."

---

### 31. **No Clear Definition of "Contribution"**
**Location:** Multiple pages  
**Severity:** MEDIUM

**Problem:**
Pages mention "contribution" and "what you can offer" but it's vague. People will ask:
- Do I need special skills?
- What counts as contribution?
- How much contribution is expected?

**Fix:**
Clarify: "Contribution means participating in camp operations - shifts, helping with setup/strike, bringing skills or energy to the community. Everyone contributes in their own way."

---

### 32. **Join.html Has Duplicate Content**
**Location:** `main-site/join.html` lines 237-255  
**Severity:** LOW-MEDIUM

**Problem:**
File has duplicate closing HTML. Suggests incomplete edit or corruption.

**Fix:**
Remove duplicates. File should end once.

---

### 33. **No Process for Handling Edge Cases**
**Location:** Documentation  
**Severity:** MEDIUM

**Problem:**
No guidance on:
- What if someone submits SOI twice?
- What if contact info changes?
- What if someone is approved but can't attend?
- What if someone needs to cancel after joining?

**Fix:**
Document process or add to FAQ.

---

## Structural Issues

### 34. **Information Scattered Across Multiple Pages**
**Location:** Website structure  
**Severity:** MEDIUM

**Problem:**
Critical information is spread across:
- Join page (process)
- Ticketing page (tickets)
- About page (values)
- Camp Life page (expectations)

Recipients have to read multiple pages to understand the full picture.

**Fix:**
Consider a "How to Join" page that consolidates the key information, or add clear cross-links.

---

### 35. **SOI Form Doesn't Link Back to Key Information**
**Location:** `soi-site/index.html`  
**Severity:** MEDIUM

**Problem:**
Form has brief intro but doesn't link to:
- Join page (full process explanation)
- Ticketing page (ticket information)
- Camp Life page (what to expect)

**Fix:**
Add "Before submitting, make sure you've read:" with links to key pages.

---

## Final Go / No-Go Assessment

### ⚠️ **NO-GO - Do Not Send Emails Tomorrow**

### Blockers (Must Fix):

1. **Contradictory Steward Sale information** (Issue #1) - Will cause mass confusion
2. **Missing "what happens next" clarity** (Issue #2) - Will generate hundreds of "when will I hear back?" emails
3. **Email contact method missing** (Issue #3) - Operational blocker
4. **False urgency in follow-up email** (Issue #4) - Creates wrong expectations
5. **Process description mismatch** (Issue #5) - Confusing structure
6. **SOI form Steward ticket context missing** (Issue #6) - Legal/expectation risk
7. **Duplicate HTML content** (Issue #7) - Technical issue, may cause display problems
8. **Email template inconsistency** (Issue #8) - Don't know which template is actually used

### Recommended Action Plan:

**Before sending emails:**
1. Fix all 8 critical issues (4-6 hours)
2. Address high-risk ambiguities #9-12 (2-3 hours)
3. Test email sending with 3 test addresses
4. Verify all links work
5. Confirm which email template is actually being used
6. Review final email content one more time

**Timeline:**
- Critical fixes: 4-6 hours
- High-risk fixes: 2-3 hours
- Testing: 1 hour
- **Total: 7-10 hours of work before safe to send**

### If You Must Send Tomorrow:

**Minimum viable fixes (2-3 hours):**
1. Fix Issue #1 (Steward Sale clarity)
2. Fix Issue #2 (What happens next)
3. Fix Issue #3 (Email contact)
4. Fix Issue #8 (Template consistency)
5. Add FAQ or prominent "common questions" section

**Then:**
- Send to 10-20 test recipients first
- Wait 24 hours for questions/feedback
- Address any issues
- Then send to full list

---

## Additional Recommendations

### Before Steward Sale:
- Create FAQ page addressing all common questions
- Set up automated SOI confirmation emails
- Document process for handling edge cases
- Create "What to Expect" timeline graphic

### After Initial Send:
- Monitor email questions closely
- Update FAQ based on common questions
- Send follow-up clarification email if needed
- Document lessons learned for next year

---

## Summary of Issues by Category

| Category | Critical | High-Risk | Tone/Clarity | Operational | Total |
|----------|----------|-----------|--------------|-------------|-------|
| **Count** | 8 | 12 | 5 | 8 | 33 |
| **Fix Time** | 4-6 hrs | 2-3 hrs | 1-2 hrs | 2-3 hrs | 9-14 hrs |

---

**Report prepared by:** Senior Technical + Communications Auditor  
**Date:** January 2026  
**Next Review:** After critical fixes are implemented



