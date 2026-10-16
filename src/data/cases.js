// Case-study content, lifted from the pages this replaced.
// Author's <strong> emphasis is preserved; nothing here is new copy.
export const cases = {
  "boltonvouched": {
    "slug": "boltonvouched",
    "title": "Bolton Vouched",
    "seoTitle": "Bolton Vouched — a local directory with the rules in Postgres",
    "description": "A Bolton recommendations directory where the ranking cannot be bought, consent is a database constraint, and a lapsed trade check takes the listing down.",
    "kind": "Own product",
    "role": "Next.js 16 App Router · React 19 · TypeScript · Tailwind 4 · Supabase Postgres with Row Level Security · Railway · Vitest, pgTAP and Playwright in CI",
    "problem": "A Bolton trades group answers <em>“anyone know a good plumber?”</em> every week, and every week the answers scroll away. The recommendations are real, local and worth more than any advertising — they are simply unsearchable, and the people being recommended have no way of being found outside the thread.<br><br>The obvious build is a directory. The reason most of them are worth nothing is that the ranking is for sale, the listings are scraped from somewhere without asking, and a trade certificate is a badge somebody typed in once. All three of those are the same failure: a rule that lives in the interface, where it can be talked round.",
    "approach": "So the rules live in the database instead, and the interface is only allowed to show them.<br><br><strong>Nobody is listed without agreeing to be.</strong> A provider goes <em>invited</em> → <em>consented</em> → <em>live</em>, and the move to live is not a permission the admin screen grants — it is a <code>CHECK</code> constraint that refuses the row unless consent is recorded. What is recorded is the part I would want checked: alongside the timestamp sits a <strong>SHA-256 of the exact wording that was on the page they agreed to</strong>, so the question “what did they actually consent to?” has an answer rather than a date.<br><br><strong>A certificate that expires takes the listing down by itself.</strong> Gas work and driving instruction are gated twice over. A trigger refuses to file the category at all without an in-date Gas Safe or DVSA check, and the public view independently hides it again the day that check lapses — so the dangerous state is unreachable from the write side and invisible from the read side, rather than depending on somebody running a report.<br><br><strong>Nothing about the ranking is for sale, and the schema is the proof.</strong> The score is a shrunk mean: a provider's own recency-weighted average pulled towards the register's average in proportion to how little evidence there is, with a two-year half-life so an old job counts for less than a recent one. Below three reviews there is no score at all — the interface gives those a <em>New on Bolton Vouched</em> section of its own rather than hiding them. The useful consequence is visible on the screenshot: a perfect record from two jobs sits <em>below</em> a good record from four, which is the right answer and the one a star average gets wrong. There is no argument to that function that money could reach.<br><br><strong>A trader's number is never in the page.</strong> The only thing the public view exposes is a boolean saying whether they are on WhatsApp. Tapping Call asks a server route, which logs the tap and answers with a redirect; the number is read by a <code>SECURITY DEFINER</code> function the browser's own key has no permission to call. Enquiries are counted once per person per day, keyed on an HMAC of the device rather than anything stored, and the provider's own taps and mine are excluded from their count — the number is for them, so the two people with a reason to inflate it are the two it ignores.<br><br>Underneath all of it, the anonymous role starts with <strong>nothing</strong>: every grant is revoked, and the default privileges are revoked too, so a table added next year is closed before anyone remembers to close it. The one door is a single view. Getting that view to work for an anonymous reader needed the sharpest thing I learned on this build — Postgres checks function permissions against the <em>calling</em> role even inside a view, so the helpers it needs sit in a schema the public has no access to at all, which works because permission is checked at run time and the schema only matters when a name is looked up.",
    "outcome": "<strong>It is built and deploying, and it has not launched.</strong> The directory, categories, profiles, the Call and WhatsApp routes, the consent links and the admin area all work — and so, since I last looked, do the parts that were missing: <strong>phone sign-in, reviews, provider replies and moderation are built and switched on</strong>, with the ranking reading real reviews rather than fixtures. What is still shut is the front door. The policy pages carry a <em>draft, pending legal review</em> banner and the domain has not been pointed at it. Saying which is which is the whole point of writing it down here.<br><br>The database is tested as a database rather than through the app. Running it myself: <strong>147 pgTAP assertions across five SQL suites, and 81 unit tests</strong>, all passing — and CI does not fake the database, it starts a real Supabase, applies every migration, runs the SQL suite against an empty register, then reloads fixtures and drives the whole thing in a browser with Playwright. The scoring tests are the ones that matter: they assert the no-score floor and the shrinkage directly, because an averaging bug is invisible until it has quietly ranked somebody's livelihood wrongly for a month.<br><br>Four things arrived with sign-in that are hard to retrofit, and all four are about not trusting the browser. Wrong sign-in codes are limited per number <em>and</em> per connection, so neither one phone nor one network can grind through them. A new phone account has to present a single-use nonce the app issued, so an account cannot be minted straight against the API. Review writes happen server-side under the session’s own user id and a device hash rather than being posted by the page. And the client IP is read from the <em>trusted</em> end of <code>X-Forwarded-For</code> rather than its first entry, which is the end an attacker writes. A removal for cause now also survives deleting the account and signing up again, which is the obvious way round a ban and the easy one to miss.<br><br>Two decisions are worth naming because they cost something. Hashing a device needs a secret, and the function <strong>throws rather than falling back</strong> if that secret is missing — an unconfigured deployment stops counting instead of silently counting everyone as one person. And the data lives in Supabase's London region for the plain reason that the privacy notice says it is in the UK, which is a sentence that has to be kept true rather than written.<br><br>Still ahead of launch, and listed in the repository rather than remembered: a solicitor's read of the draft policy pages, ICO registration, and the twelve-month purge job the retention policy already promises — which is written down as not built, because a privacy notice describing a job that does not exist is the worst kind of untrue.",
    "links": [
      {
        "href": "https://github.com/yameenbux/Boltontradesmen",
        "text": "Read the source"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/bv-web.jpg",
        "alt": "The Bolton Vouched front page: the headline reads Anyone know a good...? Bolton already does.",
        "w": 760,
        "h": 475,
        "caption": "The front page · the link that gets shared in the group",
        "portrait": false
      },
      {
        "src": "/assets/img/bv-plumbers.jpg",
        "alt": "The plumber category on a phone: two ranked providers with would-use-again percentages, then a New on Bolton Vouched section for those under three reviews",
        "w": 340,
        "h": 736,
        "caption": "Invented demonstration data · 100% from two jobs ranks below 75% from four, and under three reviews there is no score at all",
        "portrait": true
      },
      {
        "src": "/assets/img/bv-profile.jpg",
        "alt": "A provider profile on a phone, with would-use-again, on-time, on-price and tidy figures, and Call and WhatsApp buttons",
        "w": 340,
        "h": 736,
        "caption": "A profile · the Call button never shows the number, it asks the server for a redirect",
        "portrait": true
      },
      {
        "src": "/assets/img/bv-directory.jpg",
        "alt": "The Bolton Vouched directory home on a phone, with a search box and a grid of trade categories",
        "w": 340,
        "h": 736,
        "caption": "The directory · built to be added to a Home Screen",
        "portrait": true
      }
    ]
  },
  "taiyabah": {
    "slug": "taiyabah",
    "title": "Taiyabah Masjid",
    "seoTitle": "Taiyabah Masjid — mosque app, website, screens",
    "kind": "Community project",
    "role": "React Native app on Google Play · PWA · Cloudflare Worker · OneSignal push · Supabase/Postgres with Row Level Security · Stripe · Signage · Python build",
    "problem": "A Bolton masjid needed prayer times in front of its community every day &mdash; on phones, on the wall, and on the web. Three separate problems, all being solved by hand.",
    "approach": "I built <strong>one system</strong>: an installable app with live audio and push alerts, a public website, two always-on display screens inside the building, and a home display anyone can run on a spare tablet or TV that sounds the Adhan and Iqamah on time. A Python pipeline feeds all of them from a single timetable, so nothing is typed twice. The typefaces are served from the masjid’s own origin and kept by the service worker, so the Arabic still renders properly in the basement. It runs in <strong>four languages</strong>, and the Qur’anic, hadith and duʿā text is checked verbatim against its source on every build rather than trusted to stay right.<br><br>The website has since been rebuilt around <strong>accounts and an Admin Centre</strong>. Visitors register, confirm their email and sign in with two-step verification. Behind one sign-in sit seven staff areas — the screens the masjid runs itself — the prayer timetable it publishes a year at a time, notices, the appeal figure, hall rates, adult classes, Gift Aid rows for HMRC, food bank volunteers, charity collections, and a button that sends a notification to every phone with the app on it. <strong>Nobody needs a developer and nobody needs to push to GitHub.</strong> Hall hire takes a whole day, <strong>holds the date for thirty minutes</strong> while the hirer pays a deposit through Stripe, and confirms without an office step; the rate is stored on the booking, so one taken in March keeps March’s price.<br><br><strong>Six roles and three gates, every one of them enforced in Postgres</strong> rather than in the page — a rail that hides a row in the browser is not a lock. The hall office role reaches hall bookings and provably nothing else.<br><br>The newest piece is the <strong>imam’s inbox</strong>, and it is the shape the rest is built in: a congregant writes from the phone app, and <em>no imam’s address exists anywhere</em> to be harvested or handed over. The question becomes a row the app cannot read back; the imam signs in with an authenticator like everybody else and answers; the server sends the reply by reading the answer out of the row rather than trusting anything the request said. That table has Row Level Security on and <strong>no policies at all</strong>, with every grant revoked — which is the denial, not an oversight — and the check that opens it deliberately does not fall back to admin, because somebody writing to the imam in confidence is not writing to the committee.",
    "outcome": "<strong>The native rebuild shipped, and it is now what is on Google Play</strong> — version 2.0.1, version code 8. The Trusted Web Activity it replaced ended at version code 1. That is the part of this project I would most want read: the wrapper was a web page in a Chrome shell, and Android made it say so on first launch, put the tab bar wherever the browser left room, and stopped the audio whenever the phone was pocketed. None of that is fixable from inside a webview. Now the radio keeps playing with the phone locked and lock-screen controls, the qibla reads the magnetometer instead of asking a browser for a heading it may not give, and reminders are scheduled on the device, so they fire with no signal and cost the masjid nothing to send. There is a home-screen widget now too — a ring showing how long is left until the next jamāʻāh rather than another clock.<br><br><strong>Almost none of its content was retyped.</strong> One command lifts the copy out of the website's own markup, and CI then opens <em>both</em> apps in a browser and compares the home screen's sections, the twelve tiles and their order, and the More menu — because asserting that two surfaces agree is easy and measuring it is the only version worth having. The web app stays live and maintained, and remains the source of every word the native one says. It runs in <strong>four languages</strong> — English, Urdu, Gujarati and Arabic — and the Qur’anic, hadith and duʿā text is checked verbatim against its source on every build.<br><br>The rebuilt website, the accounts and the Admin Centre are finished and <strong>staged</strong>, waiting on the move to the masjid’s own domain — robots.txt blocks crawlers until then, so the temporary address is never indexed and there is no duplicate to clean up afterwards. Hall hire now runs on real availability with the deposit paid online, and nikāḥ requests and adult course sign-ups are open. Two things stay deliberately switched off: paying the nikāḥ fee online, until the masjid's own payment links exist, and the madrasah application form, which is published as a preview that cannot send because it would collect children's medical and SEND details and its data-protection assessment is not signed.<br><br><strong>iOS has moved from blocked to in testing.</strong> An Apple Developer Organization account for a charity is verified through Dun &amp; Bradstreet rather than Companies House, and the charity’s record had to be corrected before one could be issued. That cleared at the start of October and enrolment followed, so there is now a signed iPhone build on TestFlight, carrying the push entitlement and both app groups. The build before it is deliberately not the one to test — it shipped without them, so push is dead in it, and testing notifications on that build would say the whole push setup was broken when it is not. What is left is a pass on a real phone and the submission answers that have to be decided rather than coded. Apple’s rules also mean the app must hand donations to the system browser rather than take them in-app, which is the shape the Stripe links already have, and push would have to be rebuilt on the native SDK rather than carried over.",
    "links": [
      {
        "href": "https://taiyabahapp.ysbdesigns.uk/",
        "text": "See the app"
      },
      {
        "href": "https://yameenbux.github.io/Taiyabah-Masjid-HomeSmartScreen/",
        "text": "See the home display"
      },
      {
        "href": "https://taiyabahwebsite.ysbdesigns.uk/",
        "text": "See the website"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/taiyabah-web.jpg",
        "alt": "Taiyabah Masjid website home page",
        "w": 760,
        "h": 475,
        "caption": "Public website",
        "portrait": false
      },
      {
        "src": "/assets/img/taiyabah-tt.jpg",
        "alt": "Salah times display screen in the main hall",
        "w": 760,
        "h": 427,
        "caption": "Salah times display · main hall",
        "portrait": false
      },
      {
        "src": "/assets/img/taiyabah-home.jpg",
        "alt": "The home smart screen showing the countdown to the next jamā'ah and today's salah times",
        "w": 760,
        "h": 475,
        "caption": "Home display · countdown, Adhan on time",
        "portrait": false
      },
      {
        "src": "/assets/img/taiyabah-app.jpg",
        "alt": "The Taiyabah Masjid app on a phone, showing the next jamaʿah and the day’s beginning and jamaʿah times",
        "w": 340,
        "h": 735,
        "caption": "App · on Google Play, and installable from the web",
        "portrait": true
      },
      {
        "src": "/assets/img/taiyabah-foyer.jpg",
        "alt": "New-build appeal display screen in the foyer",
        "w": 380,
        "h": 675,
        "caption": "New-build appeal · foyer",
        "portrait": true
      },
      {
        "src": "/assets/img/taiyabah-hallhire.jpg",
        "alt": "The Taiyabah Centre hall hire page, showing the availability calendar and the venue details",
        "w": 760,
        "h": 528,
        "caption": "Hall hire · availability, slots and terms",
        "portrait": false
      },
      {
        "src": "/assets/img/taiyabah-venue.jpg",
        "alt": "The venue hire portal, showing incoming hall booking requests for staff to confirm or decline",
        "w": 760,
        "h": 532,
        "caption": "Venue hire portal · the office's working screen",
        "portrait": false
      }
    ],
    "description": "A prayer-times app on Google Play, a website, two always-on screens, and the Admin Centre a Bolton masjid runs all of it from."
  },
  "venetian": {
    "slug": "venetian",
    "title": "The Venetian Company",
    "seoTitle": "The Venetian Company — a plasterer's website",
    "kind": "Client",
    "role": "Astro · Tailwind · TypeScript · Identity · Design → build → deploy",
    "problem": "The Venetian Company lay Venetian plaster and microcement in homes across the country. Their work is genuinely beautiful and it lived entirely on Instagram — no website, nothing to send anyone, nothing that turns up in a search.",
    "approach": "I built the site before being asked. One page, art-directed around their own photography: a full-bleed hero, the two materials explained side by side, how a job runs, what it costs, and a single action running through all of it — <strong>book a call</strong>.",
    "outcome": "It is now <strong>live on their own domain</strong>, with a monogram, a full icon set and a web manifest behind it, so it installs to a phone and shows a proper mark in the tab rather than a blank glyph. Astro, hand-built, deployed end to end.",
    "links": [
      {
        "href": "https://thevenetiancompany.co.uk/",
        "text": "See it live"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/venetian-web.jpg",
        "alt": "The Venetian Company site hero, a plastered wall behind an oak staircase",
        "w": 760,
        "h": 475,
        "caption": "Hero · full-bleed photography",
        "portrait": false
      },
      {
        "src": "/assets/img/venetian-materials.jpg",
        "alt": "The section explaining Venetian plaster against microcement",
        "w": 760,
        "h": 475,
        "caption": "Two materials, told apart",
        "portrait": false
      },
      {
        "src": "/assets/img/venetian-finishes.jpg",
        "alt": "The finishes section of the site",
        "w": 760,
        "h": 475,
        "caption": "Finishes · told apart by name",
        "portrait": false
      },
      {
        "src": "/assets/img/venetian-phone.jpg",
        "alt": "The site on a phone, showing the monogram and wordmark",
        "w": 340,
        "h": 735,
        "caption": "Mobile · monogram, wordmark, one action",
        "portrait": true
      }
    ],
    "description": "A single-page site, monogram and icon set for a nationwide Venetian plastering firm — pitched unasked, now live on their own domain.",
    "retired": true
  },
  "hairbychrissy": {
    "slug": "hairbychrissy",
    "title": "Hair by Chrissy",
    "seoTitle": "Hair by Chrissy — a salon booking system",
    "kind": "Client",
    "role": "Node API on Render · Supabase/Postgres · Stripe Checkout · Unbuilt front end",
    "problem": "Chrissy fits hair extensions by hand in a private London studio. Bookings came through Instagram DMs — a thread per client, no calendar, and no way to stop two people asking for the same Saturday.",
    "approach": "So the site is not a brochure, it is the booking system. Pick a service, see <strong>genuine live availability</strong>, take a slot, and pay by cash or card — card takes a deposit through Stripe Checkout to hold the slot, with the balance on the day. Behind it Chrissy has her own dashboard: she sets working days, hours, breaks and time off, and the client calendar updates the moment she saves. Her day comes back as a run sheet, gaps included.",
    "outcome": "One front end, <strong>unbuilt and unbundled</strong>, served two ways. The booking engine — live calendar, dashboard, payments — runs as a small Node API on Render with Supabase behind it. GitHub Pages cannot run any of that, so the published copy deliberately falls back to <strong>enquiry mode</strong>: the real price list and an enquiry, rather than a calendar that looks live and is not. A build step snapshots the database to static JSON so the public page still shows her real services and prices.",
    "links": [
      {
        "href": "https://hairbychrissy.ysbdesigns.uk/",
        "text": "See the published site"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/hbc-web.jpg",
        "alt": "The Hair by Chrissy site hero",
        "w": 760,
        "h": 475,
        "caption": "Hero · editorial, photography-led",
        "portrait": false
      },
      {
        "src": "/assets/img/hbc-booking.jpg",
        "alt": "The four-step booking flow with live availability",
        "w": 760,
        "h": 475,
        "caption": "Booking · service, slot, details, payment",
        "portrait": false
      },
      {
        "src": "/assets/img/hbc-work.jpg",
        "alt": "The work gallery section",
        "w": 760,
        "h": 475,
        "caption": "Work · before and after",
        "portrait": false
      },
      {
        "src": "/assets/img/hbc-phone.jpg",
        "alt": "The site on a phone",
        "w": 340,
        "h": 735,
        "caption": "Mobile · book in four taps",
        "portrait": true
      }
    ],
    "description": "A booking platform for a London hair extension specialist — live availability, a Stripe deposit, and a dashboard she runs her own diary from."
  },
  "diamond": {
    "slug": "diamond",
    "title": "Diamond Heating & Plumbing",
    "seoTitle": "Diamond Heating & Plumbing — a trade website",
    "kind": "Client",
    "role": "Next.js 15, static export · TypeScript · Tailwind 4 · shadcn/ui",
    "problem": "A Bolton heating engineer, 26 years on the tools, gets rung by people who cannot describe what is wrong. &ldquo;The boiler&rsquo;s not working&rdquo; costs a visit to find out it was a part he could have carried in the van. What he needs before he sets off is a photo.",
    "approach": "One page, built for a phone, whose only job is to get a customer&rsquo;s details <strong>and photos of the fault</strong> into his WhatsApp in about a minute. That is harder than it sounds, because <strong>a WhatsApp link cannot carry an image</strong> — there is no parameter or trick that attaches one. So the form takes the only route that exists from a web page: the operating system&rsquo;s share sheet, opened with the message text and the photos already in it. On desktop, where browsers cannot share files, it falls back to a plain link and the confirmation screen tells the customer their photos did not travel and to add them with the paperclip. The message body says <strong>&ldquo;photos to follow&rdquo; rather than &ldquo;attached&rdquo;</strong>, so he is never promised photos that are not there. Photos are resized in the browser and <strong>never touch a server</strong> — which keeps the hosting free and avoids holding customers&rsquo; photographs of the inside of their homes.",
    "outcome": "Built and handed over, waiting on a mailbox and on real photography of the van and the work before it goes live. The design is taken off the vehicle rather than invented: black bodywork, orange keyline lettering, the dot-separated service list from the doors, and Gas Safe yellow used only where it appears on the van.",
    "links": [],
    "shots": [
      {
        "src": "/assets/img/diamond-web.jpg",
        "alt": "The Diamond Heating and Plumbing home page, with the van drawn in orange keyline on black",
        "w": 760,
        "h": 475,
        "caption": "Home · the van, drawn in keyline",
        "portrait": false
      },
      {
        "src": "/assets/img/diamond-form.jpg",
        "alt": "The job form, which turns the customer's answers and photos into one WhatsApp message",
        "w": 760,
        "h": 528,
        "caption": "The form · one WhatsApp message, photos attached",
        "portrait": false
      },
      {
        "src": "/assets/img/diamond-phone.jpg",
        "alt": "The Diamond Heating and Plumbing site on a phone, with call and WhatsApp always in reach",
        "w": 340,
        "h": 736,
        "caption": "On a phone · the sticky call and WhatsApp bar",
        "portrait": true
      }
    ],
    "description": "A one-page site for a Bolton heating engineer, built so a customer can get photos of the fault into WhatsApp in under a minute.",
    "retired": true
  },
  "masjidone": {
    "slug": "masjidone",
    "title": "MasjidOne",
    "seoTitle": "MasjidOne — madrasah and congregation software",
    "kind": "Own product",
    "role": "Next.js 15, static export · TypeScript · Tailwind · shadcn/ui · Supabase Postgres with Row Level Security · Stripe · OneSignal · Cloudflare Worker → Resend",
    "problem": "A masjid runs its week across half a dozen systems that have never heard of each other &mdash; prayer times in one, the website in another, the madrasah register on paper, fees in a book, donations somewhere else again. The office knows the same family three separate times and can only join them up by remembering; right now <em>the masjid is the integration</em>. Plenty of products do the congregation side well. The part nobody does is the <strong>madrasah’s daily operations</strong> &mdash; the register marked each evening, the sabaq heard, the fee due &mdash; in the same system, and then giving a parent a view of their own child.",
    "approach": "One record of one family, reachable from both sides. A masjid on the full plan gets five finished things &mdash; a website, a congregation app, unlimited in-mosque screens off the same timetable, the madrasah portal for the office and its teachers, and a parent portal inside the app &mdash; all on one Supabase Postgres, where <strong>every table carries a masjid_id</strong> and every policy and function filters on it. A database per customer would have meant a separate migration, key set and auth setup each time, and the thing that makes the product work happens <em>inside</em> one masjid rather than between them, so the separation would have bought nothing and cost a great deal to run. Row Level Security and SECURITY DEFINER functions scope every query to one masjid; Stripe runs an account per masjid at 0% commission on donations.<br><br>The doors are deliberately separate rather than one portal behind a permissions matrix. A teacher sees their own classes and nothing else &mdash; not the roll, not fees, not another teacher’s register. And <strong>a parent is not a smaller administrator</strong>: they arrive to answer one question about their own child, and should never land on a screen implying the rest of the madrasah is theirs to look at.",
    "outcome": "The madrasah portal is built &mdash; registers, fees, Hifz and sabaq progress, and parent access &mdash; and it holds a Bolton masjid’s full roll. <strong>The two halves are at different stages and the copy says so separately</strong>, because they are not in the same place: the congregation side runs every day, with a year of prayer times published and jamāʿah notifications firing off the timetable on their own, while the madrasah side is built and loaded but the office has not started marking registers on it — so it is not described as running. One piece is genuinely unbuilt and still labelled as such: knowing whether a hall screen is switched on and talking back.<br><br>Getting that right needed a rule rather than a glance. Features were being tagged <em>in development</em> because their tables were empty &mdash; but <strong>zero rows means nobody has used it yet, not that it does not exist</strong>. The test is whether the functions exist and enforce, not whether rows do.<br><br>Alongside the public site sit five module pages, a demonstration tenant anyone can walk through on invented data, and a support console that is the one page touching the real platform. Every gate on it is in Postgres rather than in the page: the anonymous role holds no EXECUTE, a platform admin needs a completed second factor, and entering a masjid you do not belong to writes a support-access row into <em>their</em> audit trail.",
    "links": [
      {
        "href": "https://masjidone.co.uk/",
        "text": "See it live"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/masjidone-web.jpg",
        "alt": "The MasjidOne home page: the madrasah and the congregation, on one system",
        "w": 760,
        "h": 475,
        "caption": "The marketing site · every interface on it labelled as a preview",
        "portrait": false
      },
      {
        "src": "/assets/img/masjidone-teacher.jpg",
        "alt": "A teacher's register in the demonstration tenant, with invented pupils marked in, late or absent",
        "w": 760,
        "h": 475,
        "caption": "Tonight’s register · a teacher sees their own classes and nothing else",
        "portrait": false
      },
      {
        "src": "/assets/img/masjidone-parent.jpg",
        "alt": "Parent access in the demonstration tenant: two invented children, their attendance for the week and a button to report an absence",
        "w": 760,
        "h": 475,
        "caption": "Parent access · their own children, their attendance, and a way to report an absence",
        "portrait": false
      },
      {
        "src": "/assets/img/masjidone-phone.jpg",
        "alt": "The MasjidOne site on a phone",
        "w": 340,
        "h": 736,
        "caption": "On a phone",
        "portrait": true
      }
    ],
    "description": "A product joining a masjid's madrasah to its congregation: one record of one family on Supabase, with a masjid_id on every table."
  },
  "bookedin": {
    "slug": "bookedin",
    "title": "Booked In",
    "seoTitle": "Booked In — booking pages for solo beauty professionals",
    "description": "A booking platform that takes no commission, where the database itself refuses a double booking — and refuses a treatment whose patch test has run out.",
    "kind": "Own product",
    "role": "Supabase Postgres with Row Level Security · Stripe · pg_cron · Render · Static front end, no build step · Twenty tracked migrations",
    "problem": "A solo lash, brow or nail technician has two bad options. A marketplace takes a slice of every booking and keeps the client relationship, or a salon system charges monthly for a diary built for a shop with a front door and staff rotas. Neither fits someone working out of other people’s front rooms.<br><br>This started as one page for <strong>èllash</strong>, a mobile technician covering three towns, where the awkward part was not the booking form but the travel: no salon diary understands that Tuesday is a Coventry day and Friday is Birmingham. Having built it once, the interesting question was whether the same thing could be handed to anyone else — which turns a page into a platform, and a platform has a problem a single page never had.",
    "approach": "<strong>Two people on two phones can take the same 09:00.</strong> Checking “is that slot free?” in application code does not fix it; it only narrows the window between the check and the insert. So the database refuses the second write itself — an <code>EXCLUDE USING gist</code> constraint over the studio and the appointment’s time range, so two overlapping confirmed bookings cannot both exist. The second transaction to commit raises <code>23P01</code> and rolls back. Cancelled rows sit outside the constraint, so cancelling frees the slot without any code deciding that it should.<br><br>That is the whole design in miniature: <strong>put the rule where it cannot be talked round.</strong> A studio’s plan is written <em>only</em> by the Stripe webhook, through a <code>SECURITY DEFINER</code> function with no grant to the anonymous or authenticated roles — so nothing running in a browser can promote itself to Pro. Cancelling at period end leaves her on Pro until the paid time actually runs out rather than cutting her off mid-month. And the view the booking page reads tells the client <em>which</em> times are gone without telling them <em>who</em> took them.<br><br>Each studio gets its own address and its own page, and the free tier carries a small line in the footer that Pro removes. The commercial promise is the one thing the architecture has to keep true: <strong>no commission, ever, however many clients she takes.</strong> There is no per-booking figure anywhere in the schema to take a percentage of.<br><br><strong>The second rule in the database is the one nobody else enforces.</strong> Tinting and lash extensions need a patch test 24 to 48 hours beforehand; the exact window is the insurer’s, a signed disclaimer does not replace it, and a test done at another salon does not count. Every other booking platform sells the appointment and leaves the compliance around it in a notebook — so the one thing a stranger can do unaided, book herself in, is also the thing that can quietly void the studio’s cover. Here a treatment that needs a test cannot be booked by somebody who has not had one in time, the refusal says what to do instead, the tile says so before anyone picks a time, and booking the patch test <em>is</em> the record, so nothing has to be written down afterwards. The window, the lifetime and which treatments need one are the studio’s own, because guessing at the wording of somebody else’s insurance policy is not a thing to do on their behalf.",
    "outcome": "<strong>It is live, and it is called Booked In</strong> — the name solo technicians already use about their own week, on its own domain at booked-in.co.uk. It grew out of the single èllash booking page, which is still live and still carries that technician’s real prices and photographs, and which is exactly why the platform needed its own sample studio: those photographs are her clients’ faces and cannot be reused as a sales demo for anyone else.<br><br>The schema is <strong>twenty tracked migrations</strong> and nine test suites. What is written: the exclusion constraint and the patch-test gate, sign-up and onboarding, two trades rather than one — the half that travels to a client and the half that works from a room, a rented chair or a shop, which needed an address in the database where previously there was only an area — photo handling, transactional email, a sender <code>pg_cron</code> runs every minute, rebooking reminders, deposits, and Stripe billing.<br><br>Rebooking is the feature that pays for Pro, and it is built to be hard to misuse: off until she turns it on, sent once per visit by primary key rather than by being careful, skipped for anyone already booked or long lapsed or opted out, and every message carries the one-tap opt-out that keeps it a soft opt-in rather than marketing.<br><br>Pricing is published: free to start, <strong>£10 a month</strong> for Pro, £24 for Pro+, a fifth off paid yearly, and fourteen days of Pro+ to begin with. <strong>No commission at any tier</strong>, and no cut of a deposit — there is no per-booking figure anywhere in the schema to take a percentage of. The build refuses to ship: <code>build.sh</code> will not produce a <code>dist/</code> containing a service-role key, and it decodes every JWT it finds rather than grepping for the phrase, because the two keys look alike and a comment mentioning one is not a leak.<br><br>Nothing here claims a customer count, because a studio signing up is their business and not a number this site gets to publish.",
    "links": [
      {
        "href": "https://booked-in.co.uk",
        "text": "See the product site"
      },
      {
        "href": "https://github.com/yameenbux/Peony-Beauty-Platform",
        "text": "Read the source"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/bookedin-web.jpg",
        "alt": "The Booked In marketing site: a laptop dashboard and a phone booking page side by side",
        "w": 760,
        "h": 475,
        "caption": "The product site · the phone picks a time and the booking arrives on the dashboard",
        "portrait": false
      },
      {
        "src": "/assets/img/bookedin-demo.jpg",
        "alt": "A sample studio booking page, step one of four, listing lash treatments and prices",
        "w": 760,
        "h": 475,
        "caption": "A studio’s own page · a sample, and labelled as one on the page itself",
        "portrait": false
      },
      {
        "src": "/assets/img/bookedin-phone.jpg",
        "alt": "The Booked In site on a phone, showing the booking page and the dashboard it feeds",
        "w": 340,
        "h": 736,
        "caption": "Where it is actually used · booked from a phone, in a minute",
        "portrait": true
      }
    ]
  },
  "buxtravel": {
    "retired": true,
    "slug": "buxtravel",
    "title": "Bux Travel",
    "seoTitle": "Bux Travel — minibus hire site for Bolton",
    "kind": "In-house",
    "role": "Twenty static pages · Service × town local SEO · Quote form with an email route · Quotation, invoice and receipt templates · WebP, sitemap and cache-stamp tooling",
    "problem": "A Bolton minibus and private-hire operator was losing work to whoever showed up first on Google. There was nowhere to send people.",
    "approach": "I built the whole site &mdash; services, fleet, coverage area, reviews, booking form and FAQ &mdash; and then <strong>split it the way people actually search</strong>: a page per vehicle size, a page per job (airport runs, school transport, weddings, days out, corporate, wheelchair accessible), and a page per town it covers. Twenty pages in all, each one tap from a WhatsApp message or a phone call.<br><br>The quote form now has <strong>an email route alongside WhatsApp</strong>, and every enquiry gets a reference that goes into the WhatsApp message, the logged record and the acknowledgement alike &mdash; so an email and a WhatsApp thread arriving a minute apart from the same person can be matched up. The button stays hidden unless the endpoint is actually configured, because <em>a button that silently swallows an enquiry is worse than no button</em>. Around it sit quotation, invoice and receipt templates, an email signature, and a review page with a printable card to hand a customer.",
    "outcome": "The questions a customer would have rung up to ask are answered before they ring, which shortens the gap between finding the business and booking it — and an enquiry can now arrive by email as well as WhatsApp, with the deposit terms stated on the page rather than discovered later. The star rating the site once declared about itself in its structured data was taken out: a business awarding itself a rating is the kind of thing a search engine discounts and a customer sees through. Still no framework and no build step: small Node scripts generate the WebP images, the sitemap and the cache-busting stamps, and pushing to <code>main</code> is the deploy.",
    "links": [
      {
        "href": "https://buxtravel.co.uk/",
        "text": "See it live"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/bux-web.jpg",
        "alt": "Bux Travel website home page",
        "w": 760,
        "h": 475,
        "caption": "Home · services and fleet",
        "portrait": false
      },
      {
        "src": "/assets/img/bux-phone.jpg",
        "alt": "Bux Travel website on a phone",
        "w": 340,
        "h": 735,
        "caption": "Mobile · one-tap enquiry",
        "portrait": true
      }
    ],
    "description": "A twenty-page minibus and private-hire site for a Bolton operator — a page per vehicle, job and town, with a quote form that reaches the office."
  },
  "luxescent": {
    "slug": "luxescent",
    "title": "LuxeScent UK",
    "seoTitle": "LuxeScent UK — a fragrance brand storefront",
    "kind": "Client",
    "role": "One-page static site · Self-hosted variable fonts · Scent finder · Etsy deep-links",
    "problem": "A Bolton maker of designer-inspired car diffusers was selling on Etsy alone, where an &pound;8.79 product looks like every other &pound;8.79 product.",
    "approach": "I built an editorial storefront for the nine-fragrance collection: a product carousel, an <strong>interactive scent finder</strong> for undecided buyers, and a Shop action on every product that deep-links to the right Etsy listing. The site does the selling; Etsy takes the payment.",
    "outcome": "It gives the brand a face that carries its price, and a guided path for buyers who would otherwise have bounced off a grid of near-identical bottles.",
    "links": [
      {
        "href": "https://yameenbux.github.io/Luxescentuk/",
        "text": "See it live"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/luxe-web.jpg",
        "alt": "LuxeScent UK storefront home page",
        "w": 760,
        "h": 475,
        "caption": "Storefront · collection",
        "portrait": false
      },
      {
        "src": "/assets/img/luxe-phone.jpg",
        "alt": "LuxeScent UK storefront on a phone",
        "w": 340,
        "h": 735,
        "caption": "Mobile · scent finder",
        "portrait": true
      }
    ],
    "description": "An editorial storefront with a scent finder and Etsy deep-links for a Bolton car-diffuser brand.",
    "retired": true
  },
  "tidemark": {
    "slug": "tidemark",
    "title": "Tidemark",
    "seoTitle": "Tidemark — a weight tracker with no server and no account",
    "kind": "Own product",
    "role": "Expo SDK 57 · React Native 0.86 · React 19 · TypeScript 6 · react-native-svg · @noble scrypt and XChaCha20-Poly1305 · StoreKit 2 via expo-iap · GitHub Actions → Pages on its own domain",
    "problem": "A bathroom scale gives one number a day, and that number swings by a kilo or more on salt, water, sleep and a late meal. Someone doing everything right sees it go <em>up</em> on a Tuesday and concludes it is not working. That is the day most people stop.<br><br>Plenty of apps log weight. The ones that read the numbers properly tend to want an account, and weight, medication and body photos are <strong>health data &mdash; a special category under UK GDPR</strong>. So the interesting problem was not the maths. It was whether you can ship something useful without ever holding any of it.",
    "approach": "You can, and the answer was to <strong>have no server and no account at all</strong>. Everything runs on the phone: the data lives in AsyncStorage and files, encrypted by iOS while the device is locked (<code>NSFileProtectionComplete</code>), and the App Store privacy label reads <em>Data Not Collected</em> because it is true rather than because it was argued for.<br><br>That decision is written down with its costs beside it, which is the part I would want to be judged on. <strong>No sync between devices. Lose the phone without a backup and the data is gone. No remote switch</strong> &mdash; a risky feature can only be turned off in a build, because there is nothing to turn it off from. The repository carries a standing rule that no SDK which sends anything off the phone may be added, analytics and crash reporting included: one of them breaks the privacy label, the policy and the paywall promise in a single commit.<br><br>The trend uses <strong>Holt&rsquo;s linear smoothing</strong> (<code>src/core/trend.ts</code>) rather than a moving average, so it follows the direction you are heading instead of trailing a week behind it. All of that maths sits in <code>src/core</code> as plain TypeScript with no React in it, close to fully unit-tested, which is why it can be trusted without a device in the loop. The charts are drawn by hand with react-native-svg &mdash; no chart library, so nothing to fight over dark mode or large text.<br><br>Two details carry more weight than they look. <strong>Reminders never contain a number</strong>, and the medication reminder does not name the medication: a lock screen is visible to anyone stood near it. And backups can be password-locked with audited primitives &mdash; <strong>scrypt and XChaCha20-Poly1305 from @noble</strong>, with the system&rsquo;s own randomness &mdash; rather than anything hand-rolled.",
    "outcome": "One TypeScript codebase produces the iPhone app and a web build, developed <strong>without a Mac</strong>. CI runs typecheck, lint at zero warnings and the full test suite on every push, and <strong>fails if coverage drops below the floor</strong> recorded in <code>package.json</code> &mdash; a test suite that is allowed to quietly shrink is one that stops meaning anything. A second workflow publishes the web app on every push to <code>main</code>, and a third loads the live app, its privacy policy and the older tracker <strong>every six hours</strong> and fails if any of them is down, so a broken deploy arrives as an email rather than as a discovery.<br><br>The deploy is least-privilege on purpose. The job that runs <code>npm ci</code> — and so every dependency’s install scripts — is granted <code>contents: read</code> and nothing else; only the separate deploy job holds <code>pages: write</code>. A compromised postinstall script on that build runner cannot publish anything.<br><br><strong>Tidemark now has its own site, at tidemark.ysbdesigns.uk</strong>, and the old GitHub Pages addresses redirect to it. One workflow publishes the site, the privacy policy, the original single-file tracker it grew out of, and — at <code>/app/</code>, <code>noindex</code> — a web build of the app. <strong>That build is a test harness, not a product</strong>, and the repository labels it as one.<br><br><strong>It is on neither store, and the status of every feature is published rather than implied.</strong> The company’s Apple Developer enrolment has come through since I last checked: signing is managed by EAS for the YSB Ventures team, builds upload to App Store Connect, and the app has its own App Store ID there — the first upload was rejected for answering the export-compliance question without a code, which is now answered per build instead. What has <em>not</em> happened is the device pass. CI compiles everything for the simulator, which proves it builds rather than that it works, and the twenty-four numbered checks its own README sets out have not been run on a real iPhone. Its own site sorts features into three tiers and I am using its words, not mine — nine are <em>in the app</em>; <strong>Home Screen and Lock Screen widgets are built and in testing</strong>; and the <strong>Apple Watch app and complications are designs, not code</strong>, which that site says outright beside the pictures. Apple Health sync and automatic backups moved the other way since I last checked: both are built and the whole native app compiles in CI, but like the widgets they have never run on a phone, so its own copy rules keep them tagged in development until they do. iCloud sync and the Apple Watch app are not built at all. Three things are written and unit-tested but <em>not proven on a device</em> — buying and restoring Plus, iOS file encryption while the phone is locked, and the production hardening plugin. That a portfolio can be this specific about what is unfinished is the point of keeping the status in the repository rather than in someone’s head.",
    "links": [
      {
        "href": "https://tidemark.ysbdesigns.uk",
        "text": "See the product site"
      },
      {
        "href": "https://github.com/yameenbux/Tidemark-Fitness",
        "text": "Read the source"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/tidemark-today.jpg",
        "alt": "The Today screen on invented demonstration data: a trend weight of 87.7 kg, progress against a plan, and the week’s pace",
        "w": 340,
        "h": 736,
        "caption": "Today · invented demonstration data, not anyone’s weigh-ins",
        "portrait": true
      },
      {
        "src": "/assets/img/tidemark-trend.jpg",
        "alt": "The Trend screen: scattered daily weigh-ins in grey, the smoothed trend line through them, and a dashed target line",
        "w": 340,
        "h": 736,
        "caption": "The whole product in one chart · the scatter is the scale, the line is the answer",
        "portrait": true
      },
      {
        "src": "/assets/img/tidemark-habits.jpg",
        "alt": "The Habits screen showing a week of water, steps and workout ticks, headed “consistency, not streaks”",
        "w": 340,
        "h": 736,
        "caption": "Habits · consistency rather than streaks, so one missed day costs nothing",
        "portrait": true
      }
    ],
    "description": "A weight tracker that reads the trend rather than the scale — and holds no account, no server and nothing off the phone."
  }
};
