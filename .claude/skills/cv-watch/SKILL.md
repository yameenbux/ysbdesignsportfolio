---
name: cv-watch
description: Scrutinise project work for CV-worthy evidence, keep the evidence log and the CV current, and judge readiness to apply. Use whenever work lands on any YSB project — a feature shipped, a number measured, a status changed, a claim invalidated — and whenever the CV, the evidence log or application readiness is discussed. Also use when asked "is this CV-worthy", "should this go on the CV", or "am I ready to apply".
---

# CV watch

Three jobs. They run in order and the first one gates the other two.

**The CV lives at `cv/cv.template.html`** and renders with `node cv/render.mjs`.
Personal contact details are placeholders filled from `cv/contact.json`, which
is gitignored — **this repo is public** and the CV carries a personal mobile,
not the site's business number. Never commit the filled HTML, the PDF or the
contact file, and never put the phone number in a commit message, a comment
or `CLAUDE.md`.

---

## 1 — Scrutinise

After any significant piece of work, ask the four questions below. Most work
fails all four, and saying so takes one line. **Do not manufacture a finding
to look useful** — a log full of marginal entries is worse than a short one,
because it stops being read.

1. **Does it produce a number that was measured, not estimated?** Test counts,
   migration counts, sites, durations, rates. The standard is the one
   `CLAUDE.md` already sets for the engineering page: a figure is only usable
   if the command that reproduces it can be printed underneath.
2. **Does it prove a capability the CV cannot currently evidence?** Not a new
   tool used once — a thing that was built, shipped and survived contact.
3. **Does it change a claim already on the CV?** A status moving pre-launch →
   live, a count going up, a platform being replaced.
4. **Does it INVALIDATE a claim on the CV?** This one matters most and is the
   easiest to miss. A retired project, a renamed repository, a cert that
   lapsed, a number that moved. `CLAUDE.md` records four separate occasions
   where a stale number survived in one file after being corrected in another
   — the CV is now a fifth place the same claim can rot.

Then apply the **honesty gates**, which are not negotiable and come straight
from `CLAUDE.md`:

- No invented metrics, no reach or usage numbers, no client counts.
- Nothing about a client's own operations — roll sizes, role counts,
  registration numbers, named staff.
- A README is a claim, not evidence. Prefer the running system, the schema,
  the workflow file.
- An Azure certificate is not Azure production experience.
- AZ-104 reads "booked, not yet sat" until it is passed. **If it is passed,
  promote it. If it is postponed, remove it** — it is the one claim on the CV
  with an expiry date.

---

## 2 — Update

When something passes, append to `.claude/skills/cv-watch/EVIDENCE.md` — never
rewrite history there. One entry: the date, the claim in the words that would
appear on the CV, the measurement, and **where a stranger can verify it**.

Then decide whether it reaches the CV itself, and this is a harder test than
it sounds:

> **The CV is ONE PAGE and it is currently full.** Every addition displaces
> something. An entry that cannot name what it replaces has not earned its
> place yet — leave it in the log.

If it does earn a place:

1. Edit `cv/cv.template.html`.
2. Run `node cv/render.mjs`. **It exits non-zero if the CV spills to a second
   page.** When that happens, cut content — do not shrink the type. The
   typography is already at its floor.
3. Check the arithmetic of any new figures against the ones already there.
   Three numbers that individually look fine can contradict each other: 600
   sites at 120 a week does not take nine months unless the nine months is the
   whole programme and 120 is the peak rate. **An interviewer will do this sum.**
4. Say what changed and why it displaced what it displaced.

**Keep the three surfaces consistent.** The CV, `ysbdesigns.uk` and LinkedIn
now make overlapping claims, and a mismatch between them is the small
inconsistency that makes a reader look harder at everything else. When a
claim changes, check all three. Known live divergences are listed at the top
of `EVIDENCE.md`.

---

## 3 — Readiness

**State the honest position first, every time: he is already employable on
this CV, and the advice is to apply now.** Readiness here means "this
application is materially stronger than last month's", not "now you may
begin". A monthly review that keeps saying *wait* is doing harm, and the
standing note in `CLAUDE.md` applies directly — building the portfolio is not
the same as getting the job, and it is the easier of the two.

Report against these signals. They are falsifiable on purpose; do not add
soft ones.

| Signal | Why it matters | State |
|---|---|---|
| **AZ-104 sat and passed** | Removes the one dated claim and converts intent into a credential | pending |
| **A second measured outcome** | The Windows 11 figures carry the CV alone; PowerShell automation has no number against it | pending |
| **A second written-up paying client** | `CLAUDE.md` has flagged the 2-against-4 group imbalance three times. A portfolio weighted to own products argues less well that other people hire him | pending |
| **A pre-launch product launched** | Bolton Vouched moving live changes a claim from built to running | pending |
| **CV / portfolio / LinkedIn agree** | Checked at every update, not just at review | — |

Two of the five is a strong application. Four is a strong candidate. **None of
them is a reason to wait**, and the review should say so in the same breath as
reporting the gaps.
