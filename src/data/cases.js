// Case-study content, lifted from the pages this replaced.
// Author's <strong> emphasis is preserved; nothing here is new copy.
export const cases = {
  "taiyabah": {
    "slug": "taiyabah",
    "title": "Taiyabah Masjid",
    "kind": "Community project",
    "role": "PWA · Website · Signage · Home display · Serverless backend",
    "problem": "A Bolton masjid needed prayer times in front of its community every day &mdash; on phones, on the wall, and on the web. Three separate problems, all being solved by hand.",
    "approach": "I built <strong>one system</strong>: an installable app with live audio and push alerts, a public website, two always-on display screens inside the building, and a home display anyone can run on a spare tablet or TV that sounds the Adhan and Iqamah on time. A Python pipeline feeds all of them from a single timetable, so nothing is typed twice.",
    "outcome": "The community opens the app daily, the screens refresh themselves, and the new-build appeal runs in the foyer without anyone touching it.",
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
        "alt": "The Taiyabah prayer-times app on a phone",
        "w": 340,
        "h": 735,
        "caption": "App · daily prayer times",
        "portrait": true
      },
      {
        "src": "/assets/img/taiyabah-foyer.jpg",
        "alt": "New-build appeal display screen in the foyer",
        "w": 380,
        "h": 675,
        "caption": "New-build appeal · foyer",
        "portrait": true
      }
    ],
    "description": "A prayer-times app, public website and two always-on display screens, designed, built and deployed for a Bolton masjid."
  },
  "venetian": {
    "slug": "venetian",
    "title": "The Venetian Company",
    "kind": "Client",
    "role": "Website · Identity · Design → build → deploy",
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
    "role": "Booking platform · Front end · Backend · Payments",
    "problem": "Chrissy fits hair extensions by hand in a private London studio. Bookings came through Instagram DMs — a thread per client, no calendar, and no way to stop two people asking for the same Saturday.",
    "approach": "So the site is not a brochure, it is the booking system. Pick a service, see <strong>genuine live availability</strong>, take a slot, pay a deposit. Behind it sits a real calendar, an admin view for Chrissy, deposit handling and automatic confirmation emails.",
    "outcome": "Built with <strong>no framework and no dependencies</strong> — a plain Node server, a JSON store and hand-written front end, so there is nothing to patch, nothing to renew and nothing to go stale.",
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
    "description": "A booking platform for a London hair extension specialist — live availability, deposits and an admin calendar, built with no framework and no dependencies."
  },
  "ellash": {
    "slug": "ellash",
    "title": "èllash",
    "kind": "Client",
    "role": "Booking page · Calendar · Deposits · Mobile-first",
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
    "description": "A booking page for a mobile lash technician — live availability built around travel days, deposits and aftercare, with no per-booking commission and no monthly platform fee."
  },
  "buxtravel": {
    "slug": "buxtravel",
    "title": "Bux Travel",
    "kind": "In-house",
    "role": "Website · Design → deploy",
    "problem": "A Bolton minibus and private-hire operator was losing work to whoever showed up first on Google. There was nowhere to send people.",
    "approach": "I built the whole site &mdash; services, fleet, coverage area, reviews, booking form and FAQ &mdash; structured so local group-travel searches land on it, and so <strong>every page is one tap from a WhatsApp message or a phone call</strong>.",
    "outcome": "The questions a customer would have rung up to ask are answered before they ring, which shortens the gap between finding the business and booking it.",
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
    "description": "A full minibus and private-hire website for a Bolton operator, built to turn local searches into WhatsApp enquiries."
  },
  "luxescent": {
    "slug": "luxescent",
    "title": "LuxeScent UK",
    "kind": "Client",
    "role": "Website · Brand · Client project",
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
