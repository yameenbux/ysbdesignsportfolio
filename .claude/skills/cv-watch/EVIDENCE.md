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
