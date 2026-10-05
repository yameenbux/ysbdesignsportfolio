// Case-study content, lifted from the pages this replaced.
// Author's <strong> emphasis is preserved; nothing here is new copy.
export const cases = {
  "taiyabah": {
    "slug": "taiyabah",
    "title": "Taiyabah Masjid",
    "kind": "Community project",
    "role": "PWA + Android app on Google Play · Cloudflare Worker · OneSignal push · Supabase/Postgres with Row Level Security · Stripe · Signage · Python build",
    "problem": "A Bolton masjid needed prayer times in front of its community every day &mdash; on phones, on the wall, and on the web. Three separate problems, all being solved by hand.",
    "approach": "I built <strong>one system</strong>: an installable app with live audio and push alerts, a public website, two always-on display screens inside the building, and a home display anyone can run on a spare tablet or TV that sounds the Adhan and Iqamah on time. A Python pipeline feeds all of them from a single timetable, so nothing is typed twice. The typefaces are served from the masjid’s own origin and kept by the service worker, so the Arabic still renders properly in the basement. It runs in <strong>three languages</strong>, and the Qur’anic, hadith and duʿā text is checked verbatim against its source on every build rather than trusted to stay right.<br><br>The website has since been rebuilt around <strong>accounts and an Admin Centre</strong>. Visitors register, confirm their email and sign in with two-step verification. Behind one sign-in sit seven staff areas — the screens the masjid runs itself — the prayer timetable it publishes a year at a time, notices, the appeal figure, hall rates, adult classes, Gift Aid rows for HMRC, food bank volunteers, charity collections, and a button that sends a notification to every phone with the app on it. <strong>Nobody needs a developer and nobody needs to push to GitHub.</strong> Hall hire takes a whole day, <strong>holds the date for thirty minutes</strong> while the hirer pays a deposit through Stripe, and confirms without an office step; the rate is stored on the booking, so one taken in March keeps March’s price.<br><br><strong>Six roles and three gates, every one of them enforced in Postgres</strong> rather than in the page — a rail that hides a row in the browser is not a lock. The hall office role reaches hall bookings and provably nothing else.<br><br>The newest piece is the <strong>imam’s inbox</strong>, and it is the shape the rest is built in: a congregant writes from the phone app, and <em>no imam’s address exists anywhere</em> to be harvested or handed over. The question becomes a row the app cannot read back; the imam signs in with an authenticator like everybody else and answers; the server sends the reply by reading the answer out of the row rather than trusting anything the request said. That table has Row Level Security on and <strong>no policies at all</strong>, with every grant revoked — which is the denial, not an oversight — and the check that opens it deliberately does not fall back to admin, because somebody writing to the imam in confidence is not writing to the committee.",
    "outcome": "<strong>The app is on Google Play</strong>, as a Trusted Web Activity verified through Google’s Digital Asset Links so a store install opens with no browser bar, and the same app stays installable straight from the web. The community opens it daily, the screens refresh themselves, and the new-build appeal runs in the foyer without anyone touching it.<br><br>The rebuilt website, the accounts and the Admin Centre are finished and <strong>staged</strong>, waiting on the move to the masjid’s own domain — robots.txt blocks crawlers until then, so the temporary address is never indexed and there is no duplicate to clean up afterwards. Online booking stays switched off on the public page until the office’s diary goes in: the calendar shows how it will work and says plainly that it is not live yet. The madrasah application form is published the same way, as a preview that cannot send, until the data-protection assessment is signed off.<br><br>iOS is the one still open. It needs a D-U-N-S number for the charity before an Apple developer account can exist at all, and Apple’s rules mean a wrapped app has to hand donations to the system browser rather than take them in-app — which is the shape the Stripe links already have.",
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
    "description": "A single-page site, monogram and icon set for a nationwide Venetian plastering firm — pitched unasked, now live on their own domain."
  },
  "hairbychrissy": {
    "slug": "hairbychrissy",
    "title": "Hair by Chrissy",
    "kind": "Client",
    "role": "Node API on Render · Supabase/Postgres · Stripe Checkout · Unbuilt front end",
    "problem": "Chrissy fits hair extensions by hand in a private London studio. Bookings came through Instagram DMs — a thread per client, no calendar, and no way to stop two people asking for the same Saturday.",
    "approach": "So the site is not a brochure, it is the booking system. Pick a service, see <strong>genuine live availability</strong>, take a slot, and pay by cash or card — card takes a deposit through Stripe Checkout to hold the slot, with the balance on the day. Behind it Chrissy has her own dashboard: she sets working days, hours, breaks and time off, and the client calendar updates the moment she saves. Her day comes back as a run sheet, gaps included.",
    "outcome": "One front end, <strong>unbuilt and unbundled</strong>, served two ways. The booking engine — live calendar, dashboard, payments — runs as a small Node API on Render with Supabase behind it. GitHub Pages cannot run any of that, so the published copy deliberately falls back to <strong>enquiry mode</strong>: the real price list and an enquiry, rather than a calendar that looks live and is not. A build step snapshots the database to static JSON so the public page still shows her real services and prices.",
    "links": [
      {
        "href": "https://hairbychrissy.ysbdesigns.uk/",
        "text": "See it live"
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
    "description": "A one-page site for a Bolton heating engineer, built so a customer can get photos of the fault into WhatsApp in under a minute."
  },
  "masjidone": {
    "slug": "masjidone",
    "title": "MasjidOne",
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
  "ellash": {
    "slug": "ellash",
    "title": "èllash",
    "kind": "Client",
    "role": "One page, no build step, no dependencies · Travel-day calendar · Deposits",
    "problem": "Beauty businesses lose a slice of every booking to the big platforms, or pay a monthly fee for a diary they barely use. For a mobile lash technician working across three towns, that overhead buys very little — and none of it understands that Tuesday is a Coventry day.",
    "approach": "So èllash gets its own booking page instead. Four steps — treatment, date and time, details, confirm — with availability built around <strong>travel days rather than a salon diary</strong>: pick an area and only the days she is actually in that area come back. A deposit secures the slot, and the confirmation carries her aftercare guide.",
    "outcome": "One page, no build step, no dependencies, no per-booking commission and <strong>no monthly platform fee</strong>. It is the simple version of what Fresha and Treatwell sell, for a business that needs a calendar rather than a marketplace.",
    "links": [
      {
        "href": "https://ellashtech.ysbdesigns.uk/",
        "text": "See it live"
      }
    ],
    "shots": [
      {
        "src": "/assets/img/ellash-web.jpg",
        "alt": "The èllash booking page, treatment step",
        "w": 760,
        "h": 475,
        "caption": "Step one · pick a treatment",
        "portrait": false
      },
      {
        "src": "/assets/img/ellash-flow.jpg",
        "alt": "Choosing an area, date and start time",
        "w": 760,
        "h": 475,
        "caption": "Availability · built on travel days",
        "portrait": false
      },
      {
        "src": "/assets/img/ellash-phone.jpg",
        "alt": "The booking page on a phone",
        "w": 340,
        "h": 735,
        "caption": "Mobile · four steps, one page",
        "portrait": true
      }
    ],
    "description": "A booking page for a mobile lash technician — availability built around travel days, with no commission and no monthly platform fee."
  },
  "buxtravel": {
    "slug": "buxtravel",
    "title": "Bux Travel",
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
    "description": "An editorial storefront with a scent finder and Etsy deep-links for a Bolton car-diffuser brand."
  }
};
