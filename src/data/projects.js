/**
 * One source for every list of work on the site, so home, the wheel and the
 * work index cannot drift apart.
 *
 * `line` is the wheel's read-out copy: one sentence, drawn from that case
 * study's own problem or outcome. Nothing here is a metric, a rating or a
 * client count.
 *
 * `product: true` separates the things I own from the things I was asked to
 * build. The work index groups on this, not on the `kind` string, which is
 * display copy and would be a fragile thing to branch on.
 *
 * `status` is the badge printed over a shot. Omit it and the project gets the
 * pulsing "Live" chip; set it and that exact string is shown flat instead. A
 * Live badge on something nobody can visit, or on a product that is part-built,
 * is the one kind of claim the copy rules bar — so the honest label goes here
 * rather than the badge being removed. Keep it to about two words: a long one
 * lies across the shot and covers the client's own logo.
 */

// Everything, in the order it sits on the wheel.
export const all = [
  {
    slug: 'taiyabah', href: '/taiyabah.html', name: 'Taiyabah Masjid',
    kind: 'Community project', where: 'Bolton',
    line: 'Prayer times in front of a whole community every day, and the office work behind them: an app on Google Play, a website, two screens in the building and a home display, all fed by one timetable.',
    stack: 'PWA + Android app on Google Play · Cloudflare Worker · Supabase/Postgres with RLS · Stripe · OneSignal push · Signage',
    outcome: 'Prayer times in front of a whole community every day, and the office work behind them. The app is now on Google Play, and one system feeds it, a public website, two always-on screens in the building and a home display — while the rebuilt site carries accounts and an Admin Centre the masjid runs itself, from the timetable and notices to hall bookings, Gift Aid and a push to every phone.',
    problem: 'A Bolton masjid needed prayer times in front of its community every day — on phones, on the wall, and on the web. Three separate problems, all being solved by hand.',
    approach: 'One system instead of three. An installable app with live audio and push alerts, a public website, two always-on screens inside the building, and a home display anyone can run on a spare tablet or TV. A Python pipeline feeds all of them from a single timetable, so nothing is typed twice. Six roles and three gates sit in Postgres rather than in the page, and the imam’s inbox is the sharpest case: no address exists to be harvested, and the table that holds a question has Row Level Security on with no policies at all.',
    layers: { interface: 96, software: 94, infra: 95 },
    img: '/assets/img/taiyabah-web.jpg', alt: 'The Taiyabah Masjid website',
  },
  {
    slug: 'venetian', href: '/venetian.html', name: 'The Venetian Company',
    kind: 'Client', where: 'Nationwide',
    line: 'Plaster and microcement work that lived entirely on Instagram. Now a site on their own domain, art-directed around their own photography.',
    stack: 'Astro · Tailwind · TypeScript · Identity · Design → build → deploy',
    outcome: 'Venetian plaster and microcement work that lived entirely on Instagram — nothing to send anyone, nothing that turned up in a search. Now a site on their own domain, art-directed around their own photography.',
    problem: 'They lay Venetian plaster and microcement in homes across the country. The work is genuinely beautiful and it lived entirely on Instagram — nothing to send anyone, nothing that turned up in a search.',
    approach: 'I built the site before being asked. One page, art-directed around their own photography: a full-bleed hero, the two materials explained side by side, how a job runs, what it costs, and one action running through all of it — book a call.',
    layers: { interface: 94, software: 34, infra: 62 },
    img: '/assets/img/venetian-web.jpg', alt: 'The Venetian Company website',
  },
  {
    slug: 'ellash', href: '/ellash.html', name: 'èllash',
    kind: 'Client', where: 'Manchester',
    line: 'A calendar for a beauty business without the overhead of a big platform — no per-booking commission and no monthly fee.',
    layers: { interface: 78, software: 84, infra: 44 },
    img: '/assets/img/ellash-web.jpg', alt: 'The èllash booking page',
  },
  {
    slug: 'diamond', href: '/diamond.html', name: 'Diamond Heating & Plumbing',
    kind: 'Client', where: 'Bolton',
    status: 'Not live yet',
    line: 'A heating engineer rung by people who could not describe the fault. The site gets their details and photos of the problem into his WhatsApp in about a minute.',
    stack: 'Next.js 15, static export · TypeScript · Tailwind 4 · shadcn/ui',
    outcome: 'A heating engineer who kept being rung by people who could not describe the fault. The site gets their details and photos of the problem into his WhatsApp in about a minute, so he arrives with the right part.',
    problem: 'A Bolton heating engineer gets rung by people who cannot describe what is wrong. "The boiler\'s not working" costs a visit to find out it was a part he could have carried in the van.',
    approach: 'One page, built for a phone. A WhatsApp link cannot carry an image, so the form uses the operating system\'s share sheet — message text and photos already in it — and falls back to a plain link on desktop, where it tells the customer their photos did not travel. Photos are resized in the browser and never touch a server.',
    layers: { interface: 92, software: 54, infra: 36 },
    img: '/assets/img/diamond-web.jpg', alt: 'The Diamond Heating and Plumbing home page',
  },
  {
    slug: 'buxtravel', href: '/buxtravel.html', name: 'Bux Travel',
    kind: 'In-house', where: 'Bolton',
    line: 'A minibus operator whose customers rang to ask the same questions. The site answers them before the phone goes.',
    layers: { interface: 88, software: 24, infra: 56 },
    img: '/assets/img/bux-web.jpg', alt: 'The Bux Travel website',
  },
  {
    slug: 'hairbychrissy', href: '/hairbychrissy.html', name: 'Hair by Chrissy',
    kind: 'Client', where: 'London',
    line: 'Bookings arrived as Instagram DMs, with no calendar. The site is the booking system: live availability, deposits and a real calendar behind it.',
    stack: 'Node API on Render · Supabase/Postgres · Stripe Checkout · Unbuilt front end',
    outcome: 'Bookings arrived as Instagram DMs, with no calendar and no way to stop two people asking for the same Saturday. The site is the booking system: live availability, cash or card with a Stripe deposit, and a dashboard where she sets her own days, hours and time off.',
    problem: 'Chrissy fits hair extensions by hand in a private London studio. Bookings came through Instagram DMs — a thread per client, no calendar, and no way to stop two people asking for the same Saturday.',
    approach: 'The site is not a brochure, it is the booking system. One unbuilt front end served two ways: a Node API on Render with Supabase behind it runs the live calendar, the dashboard and Stripe Checkout, and the copy published to Pages falls back to enquiry mode rather than showing a calendar that only looks live.',
    layers: { interface: 80, software: 98, infra: 70 },
    img: '/assets/img/hbc-web.jpg', alt: 'The Hair by Chrissy booking site',
  },
  {
    slug: 'luxescent', href: '/luxescent.html', name: 'LuxeScent UK',
    kind: 'Client', where: 'Birmingham',
    line: 'A fragrance brand selling from a grid of near-identical bottles. Now a face that carries the price, and a guided path to the right one.',
    layers: { interface: 90, software: 30, infra: 42 },
    img: '/assets/img/luxe-web.jpg', alt: 'The LuxeScent UK website',
  },
  {
    slug: 'masjidone', href: '/masjidone.html', name: 'MasjidOne',
    kind: 'Own product', where: 'Bolton',
    product: true,
    status: 'In one masjid',
    line: 'The congregation side runs every day; the madrasah side is built and holds a Bolton masjid’s full roll — both on one record of one family.',
    stack: 'Next.js 15, static export · TypeScript · Tailwind · shadcn/ui · Supabase Postgres with RLS · Stripe · OneSignal · Cloudflare Worker → Resend',
    outcome: 'Four surfaces on one Supabase Postgres, with a masjid_id on every table and Row Level Security scoping every query to one masjid. The congregation side runs every day in a Bolton masjid; the madrasah portal — registers, fees, Hifz and sabaq, parent access — is built and holds that masjid’s full roll.',
    problem: 'The office knows the same family three separate times — prayer times in one system, the website in another, the register on paper, fees in a book — and can only join them up by remembering.',
    approach: 'One Supabase Postgres behind four surfaces per masjid, with Row Level Security and SECURITY DEFINER functions scoping every query to one masjid. The doors are separate rather than one portal behind a permissions matrix: a teacher sees their own classes and nothing else, and a parent is not a smaller administrator. The support console touches the real platform, and every gate on it is in Postgres rather than in the page.',
    layers: { interface: 90, software: 98, infra: 88 },
    img: '/assets/img/masjidone-web.jpg', alt: 'The MasjidOne marketing site',
  },
  {
    slug: 'tidemark', href: '/tidemark.html', name: 'Tidemark',
    kind: 'Own product', where: 'iPhone and web',
    product: true,
    status: 'Not released',
    line: 'A weight tracker that reads the trend rather than the scale — and deliberately has no server, no account and nothing leaving the phone.',
    stack: 'Expo SDK 57 · React Native 0.86 · React 19 · TypeScript 6 · react-native-svg · @noble scrypt and XChaCha20-Poly1305 · StoreKit 2 · GitHub Actions → Pages',
    outcome: 'One TypeScript codebase for the iPhone app and a web build, written without a Mac. CI typechecks, lints at zero warnings and fails if coverage drops below its floor; a separate job loads the live app every six hours and fails if it is down. Not on the App Store — the company’s Apple enrolment is in review.',
    problem: 'A scale swings by a kilo a day on salt, water and sleep, so someone doing everything right sees a gain on a Tuesday and stops. The apps that read the numbers properly want an account — and weight, medication and body photos are health data.',
    approach: 'No server and no account, so there is nothing held to lose: the data stays on the phone, encrypted by iOS while it is locked, and the privacy label reads Data Not Collected because it is true. The trend uses Holt’s linear smoothing rather than a moving average, in plain TypeScript with no React in it and close to fully unit-tested. The costs are written down beside the decision — no sync, no recovery without a backup, and no remote switch.',
    layers: { interface: 92, software: 96, infra: 44 },
    img: '/assets/img/tidemark-web.jpg', alt: 'Three Tidemark screens on demonstration data: Today, the trend chart, and habits',
  },
];

// The ones with enough captured material to carry a screenshot-led write-up.
// Derived from a field rather than by index, so reordering the wheel above
// cannot silently change which projects the work index writes up.
export const lead = all.filter((p) => p.problem);
