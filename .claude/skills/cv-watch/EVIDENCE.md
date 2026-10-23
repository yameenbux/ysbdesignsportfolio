# CV evidence log

Append-only. Newest first. Every entry carries the claim as it would appear on
the CV, the measurement, and where a stranger can verify it.

**No personal contact details in this file.** The repo is public; the CV's
phone number lives only in gitignored `cv/contact.json`.

---

## Divergences to resolve

Tracked here because a mismatch between the CV, the site and LinkedIn is the
small inconsistency that makes a reader look harder at everything else.

| # | Divergence | Status |
|---|---|---|
| 1 | **CompTIA Security+ is on the CV but not on LinkedIn.** It is also a stronger pinned skill than at least two of the five currently there | open |
| 2 | **LinkedIn's YSB Designs entry** may still read `Aug 2026 – Nov 2026` with "I currently work here" unticked, which both ends in the future and contradicts the CV's `Aug 2026 – present` | open — needs confirming |
| 3 | **The case studies close with a freelance CTA** — "If this looks like your problem… tell me what it takes" over a WhatsApp button — written for a prospect, not a hiring manager. Last pre-pivot copy on the main reading path | open |
| 5 | **Two CV variants now carry overlapping claims.** Platform and integration templates share facts; a correction landing in one and not the other is the five-times-recorded failure in a new place | open — standing |
| 4 | **`og.png` is the pre-pivot services card.** Every link shared to LinkedIn renders with "the website you see, the software behind it, and the hosting it runs on" | open — replacement built, not deployed |

---

## Claims currently carried on the CV

The baseline, so a future session can tell what is new. Each already passed
the honesty gates.

| Claim | Measurement | Verifiable at |
|---|---|---|
| Windows 11 migration, 600+ practices | Nine-month programme, up to 120 sites/week, out of hours, no loss of opening-hours time | User-supplied, 19 Oct 2026 |
| Cisco switch and router refresh | Same 600+ site estate | User-supplied |
| Multi-tenant Postgres, access enforced in the database | RLS, role-checked functions, revoked default privileges | `ysbdesigns.uk/engineering.html`; project repos |
| CI release gates refusing an unproven commit | `native-release.yml` requires a successful smoke run at that exact `head_sha` | Taiyabah repo workflows |
| 564 database assertions, 329 unit tests | Measured by running the suites, not by summing `plan()` lines | Bolton Vouched repo |
| Apps on iOS and Android | React Native app on Google Play; signed iOS build on TestFlight | Play listing; App Store Connect |
| Eight years in IT, five running a 600+ site estate | Helpdesk from May 2017, Infrastructure Engineer from May 2020 | CV dates |

---

## Log

### 2026-10-23 — the integration variant, for an internal role

An internal Integration Engineer posting at the current employer: Boomi and
Azure Integration Services (including API Management), REST and SOAP, FTP/MFT,
and "AI assisted coding tools (e.g. Claude Code)". R4, Dentally and IFS named.

**The CV now has two variants from one renderer.** `cv/cv.template.html` is
the platform cut; `cv/cv.integration.template.html` is the same facts
re-weighted, rendered with `node cv/render.mjs integration`. Same head, same
CSS (diffed identical), same one-page check. **When a fact changes, both
templates change** — this is the two-places shape the portfolio spec records
five times, now with a CV on each side of it.

**What the integration cut says that the platform cut does not:**

- **"600+ dental practices on R4 and Dentally"** on the MyDentist line.
  Inferred from the posting being internal and naming those systems; the
  estate he runs is the estate they run on. **He must confirm the wording
  before it is sent** — if part of the estate is on one system and part on
  the other, "on R4 and Dentally" still holds; if a practice-management
  system he has not touched is in the mix, it does not.
- **Three integration mechanisms promoted to the engineering bullets**, each
  checkable in a public repo: the Stripe webhook as the only writer of plan
  state through a `SECURITY DEFINER` function (Booked In); ordered
  write-through from in-memory SQLite to Postgres with the API answering
  only once rows have landed (Domi); the Android build asking Google's
  Digital Asset Links API rather than reading the checked-in JSON (Taiyabah).
  They displaced "shipped apps" (still in the facts strip) and the test
  counts, which this log already rated the weakest bullet.
- **An "AI-assisted delivery" skills row** naming Claude Code. Asked about on
  19 October and held back then as unevidenced for a platform audience; this
  posting asks for it by name, and the evidence is the skill system in five
  public repos.

**Deliberately not claimed, because nothing evidences it:** Boomi, Azure
Integration Services, API Management, SOAP, FTP/MFT. He may well have FTP or
MFT from the estate side — it was never relevant to a platform pitch so it was
never recorded — but an unrecorded claim is not a claim this log can carry.
**If he confirms it, it goes on; until then it stays off.** Boomi's associate
training is free and would turn "none" into a held certification before
interview; it is not on the CV until it is held.

**One near-miss worth recording.** The first draft wrapped `SECURITY DEFINER`
in `<code>`, and the CV template has no `code` rule — so it would have
rendered in the browser's default monospace, the Phase 23 failure on a
document whose whole design bars it. Caught by grepping for the rule before
rendering. The tag is gone; the words stand.

**Checked:** one page, 8px spare; the PDF text layer reads in order and every
new claim extracts. Rated ready to send on confirmation of the R4/Dentally line.

### 2026-10-19 — the facts strip, and what it paid for

A design pass, not a claims pass. **Nothing new is claimed and nothing was
softened** — the figures below were already on the CV, inside sentences.

**The defect was hierarchy.** Six sections were weighted identically, so the
document's strongest assets — 600+ sites, a nine-month migration, apps on both
stores — were only findable by reading prose, on a page that gets scanned
before it gets read. A three-cell numeral strip now sits under the masthead.

**It cost 48px on a page that had 17px spare, and the space came from the
redundancy it created**, which is the part worth recording:

- The Experience bullet opened *"Led the Windows 11 migration across 600+
  dental practices — a nine-month programme"*. The strip says both of those
  one inch above it. The bullet keeps what the strip does not say: that the
  programme was owned from build through rollout, and the **120 sites a week**
  peak rate.
- The profile lede opened on *"five of them running a 600+ site estate"*.
  Same duplication, same fix.

**Two typographic defects found by looking rather than measuring**, both
already in the shipped CV:

- **"Postgres row-level security" was breaking at the hyphen** into "row-" /
  "level security", and "Cisco Meraki" split across lines. A skill is one
  term; each is atomic now and the row wraps only at its separators.
- The name was 22pt against a four-line contact block. 25pt costs nothing,
  because the header's height is set by the contact block, not the name.

**Checked:** one page, 13px spare. The PDF text layer still reads in document
order and every bullet, skill term and strip figure extracts — the strip is a
grid, so nothing is interleaved and an ATS parse is unaffected.

**Third strip cell:** carries the apps rather than *"1 paying customer"*. The
customer is a stronger fact but a weak hero numeral beside "600+", and it
already leads the Engineering practice subline — putting it in both would be
the duplication this pass exists to remove.

### 2026-10-19 — Domi, and a paying customer

**Passed scrutiny question 2** (proves a capability the CV could not evidence)
**and question 3** (changes a claim already on the CV).

`audiologydomi` — a home-visit healthcare diary that acts on a cancellation:
ranks the waiting list against the specific gap, texts whoever actually fits
it, books the first yes. Added to the portfolio as an own product,
pre-launch.

**The CV change is one line and it is the biggest single upgrade since the
rebuild.** The engineering practice subline now reads *"Production systems
built, deployed and operated end to end — **one with a paying customer**"*.
Before this, that whole section could be read as side projects. A product a
business pays for is a different claim, and it is a stronger one than
commissioned work: it says somebody chose to buy the thing rather than hiring
the person. It displaced nothing — it replaced existing text.

**Verifiable at:** `server/pilot.js` refers to *"the targets agreed at
signing"* and a thirteen-week pilot. The customer itself is the client's
business and is not named on the site or the CV.

**Two source claims found stale by checking, both in the same README:**

- The badge reads `npm dependencies: none`; `package.json` carries `pg`. The
  honest version is better — the **demo** loads nothing, and the Postgres
  client is required lazily only when a live database is configured.
- *"Domi has none yet, so no testimonials, logos or trusted-by lines"* — there
  is now one paying customer. **A README is a claim, not evidence**, for the
  fourth and fifth recorded time, both in one file.

**Not yet carried across, pending an answer:** whether the pilot is running
with real patients. The repository lists six things needed *before real
patients* (UK database with a tested restore, real accounts, encrypted offline
copies, secrets, contracted routing, DPIA/ICO/DSP Toolkit/Cyber Essentials).
If those are done the site's `Pre-launch` status is wrong; if the client has
signed but is not live yet, it is right. **Do not change the status without
that answer** — a Live chip over a case study saying no practice is using it
is the contradiction this spec exists to prevent, and Phase 23 records it
happening in the opposite direction.

**Candidate for the CV, not yet taken:** Domi's write-through architecture — a
live practice runs on the same in-memory SQLite the demo does, with Postgres
as the durable record, and the server answers only once the rows have landed.
It is the most distinctive engineering claim available, but the CV is full,
and it would have to displace the "564 assertions and 329 unit tests" bullet,
which is the weakest of the four (a number without a mechanism behind it).


### 2026-10-19 — baseline set

CV rebuilt from the 2023-era version. The old one carried none of the
engineering work, opened with "I'm a Computer Network Technology graduate" on
eight years of experience, and listed telephony, finance and facilities
administration at the same weight as two 600-site rollouts. Those were cut:
real experience, but helpdesk signals on a document arguing for platform work.

Three things surfaced that were not recorded anywhere before:

- **CompTIA Security+ (Nov 2023)** appeared on the old CV and in no other
  source — not `CLAUDE.md`, not the site, not LinkedIn. A genuine security
  credential that had been doing nothing.
- **The Windows 11 rollout had no figures.** Now nine months, up to 120 sites
  a week, out of hours, no opening-hours downtime.
- **The opening claim was soft.** "8+ years running hybrid estates" invited a
  probe, since the infrastructure role began May 2020. Split into "eight years
  in IT, five of them running a 600+ site estate" — more defensible *and* a
  bigger statement.

**Still missing, and asked for twice:** a measured outcome for the PowerShell
automation — minutes per user before and after, or provisioning tickets
removed per month. It is the difference between 9.5 and 10, and the page has
~33px held in reserve for it.

Rated 9.5/10, green to send.
