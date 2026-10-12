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
    line: 'Prayer times in front of a whole community every day, and the office work behind them: a React Native app on Google Play, a website, two screens in the building and a home display, all fed by one timetable.',
    stack: 'React Native app on Google Play · PWA · Cloudflare Worker · Supabase/Postgres with RLS · Stripe · OneSignal push · Signage',
    outcome: 'Prayer times in front of a whole community every day, and the office work behind them. The Google Play app is now the React Native rebuild rather than the web wrapper it started as, and one system feeds it, a public website, two always-on screens in the building and a home display — while the rebuilt site carries accounts and an Admin Centre the masjid runs itself, from the timetable and notices to hall bookings, Gift Aid and a push to every phone.',
    problem: 'A Bolton masjid needed prayer times in front of its community every day — on phones, on the wall, and on the web. Three separate problems, all being solved by hand.',
    approach: 'One system instead of three. An installable app with live audio and push alerts, a public website, two always-on screens inside the building, and a home display anyone can run on a spare tablet or TV. A Python pipeline feeds all of them from a single timetable, so nothing is typed twice. Six roles and three gates sit in Postgres rather than in the page, and the imam’s inbox is the sharpest case: no address exists to be harvested, and the table that holds a question has Row Level Security on with no policies at all.',
    logo: { src: '/assets/brand/taiyabah.png', alt: 'Taiyabah Masjid wordmark', w: 202, h: 30 },
    tech: ['react', 'cloudflareworkers', 'supabase', 'postgresql', 'stripe', 'googleplay'],
    layers: { interface: 96, software: 94, infra: 95 },
    img: '/assets/img/taiyabah-web.jpg', alt: 'The Taiyabah Masjid website',
  },
  {
    slug: 'ellash', href: '/ellash.html', name: 'èllash',
    kind: 'Own product', where: 'Manchester',
    product: true,
    line: 'A calendar for a beauty business without the overhead of a big platform — no per-booking commission and no monthly fee.',
    logo: { src: '/assets/brand/ellash.png', alt: 'èllash wordmark', w: 101, h: 30 },
    tech: ['html5', 'css', 'javascript', 'github'],
    layers: { interface: 78, software: 84, infra: 44 },
    img: '/assets/img/ellash-web.jpg', alt: 'The èllash booking page',
  },
  {
    slug: 'buxtravel', href: '/buxtravel.html', name: 'Bux Travel',
    kind: 'In-house', where: 'Bolton',
    line: 'A minibus operator whose customers rang to ask the same questions. The site answers them before the phone goes.',
    logo: { src: '/assets/brand/buxtravel.png', alt: 'Bux Travel wordmark', w: 78, h: 30 },
    tech: ['html5', 'css', 'javascript', 'nodedotjs', 'github'],
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
    logo: { src: '/assets/brand/hairbychrissy.png', alt: 'Hair by Chrissy wordmark', w: 206, h: 30 },
    tech: ['nodedotjs', 'supabase', 'postgresql', 'stripe', 'render'],
    layers: { interface: 80, software: 98, infra: 70 },
    img: '/assets/img/hbc-web.jpg', alt: 'The Hair by Chrissy booking site',
  },
  {
    slug: 'masjidone', href: '/masjidone.html', name: 'MasjidOne',
    kind: 'Own product', where: 'Bolton',
    product: true,
    status: 'In one masjid',
    line: 'The congregation side runs every day; the madrasah side is built and holds a Bolton masjid’s full roll — both on one record of one family.',
    stack: 'Next.js 15, static export · TypeScript · Tailwind · shadcn/ui · Supabase Postgres with RLS · Stripe · OneSignal · Cloudflare Worker → Resend',
    outcome: 'Five products on one Supabase Postgres, with a masjid_id on every table and Row Level Security scoping every query to one masjid. The congregation side runs every day in a Bolton masjid; the madrasah portal — registers, fees, Hifz and sabaq, parent access — is built and holds that masjid’s full roll.',
    problem: 'The office knows the same family three separate times — prayer times in one system, the website in another, the register on paper, fees in a book — and can only join them up by remembering.',
    approach: 'One Supabase Postgres behind five products per masjid, with Row Level Security and SECURITY DEFINER functions scoping every query to one masjid. The doors are separate rather than one portal behind a permissions matrix: a teacher sees their own classes and nothing else, and a parent is not a smaller administrator. The support console touches the real platform, and every gate on it is in Postgres rather than in the page.',
    logo: { src: '/assets/brand/masjidone.png', alt: 'MasjidOne wordmark', w: 141, h: 30 },
    tech: ['nextdotjs', 'typescript', 'tailwindcss', 'supabase', 'postgresql', 'stripe'],
    layers: { interface: 90, software: 98, infra: 88 },
    img: '/assets/img/masjidone-web.jpg', alt: 'The MasjidOne marketing site',
  },
  {
    slug: 'tidemark', href: '/tidemark.html', name: 'Tidemark',
    kind: 'Own product', where: 'iPhone',
    product: true,
    status: 'Not released',
    line: 'A weight tracker that reads the trend rather than the scale — and deliberately has no server, no account and nothing leaving the phone.',
    stack: 'Expo SDK 57 · React Native 0.86 · React 19 · TypeScript 6 · react-native-svg · @noble scrypt and XChaCha20-Poly1305 · StoreKit 2 · GitHub Actions → Pages',
    outcome: 'One TypeScript codebase, written without a Mac. CI typechecks, lints at zero warnings and fails if coverage drops below its floor; the job that runs npm ci cannot publish, only a separate deploy job can. On neither store — the company’s Apple enrolment is in review — and its own site publishes which features are in the app, which are in testing and which are still only designs.',
    problem: 'A scale swings by a kilo a day on salt, water and sleep, so someone doing everything right sees a gain on a Tuesday and stops. The apps that read the numbers properly want an account — and weight, medication and body photos are health data.',
    approach: 'No server and no account, so there is nothing held to lose: the data stays on the phone, encrypted by iOS while it is locked, and the privacy label reads Data Not Collected because it is true. The trend uses Holt’s linear smoothing rather than a moving average, in plain TypeScript with no React in it and close to fully unit-tested. The costs are written down beside the decision — no sync, no recovery without a backup, and no remote switch.',
    logo: { src: '/assets/brand/tidemark.png', alt: 'Tidemark wordmark', w: 176, h: 30 },
    tech: ['expo', 'react', 'typescript', 'githubactions'],
    layers: { interface: 92, software: 96, infra: 44 },
    img: '/assets/img/tidemark-web.jpg', alt: 'Three Tidemark screens on demonstration data: Today, the trend chart, and habits',
  },
  {
    slug: 'boltonvouched', href: '/boltonvouched.html', name: 'Bolton Vouched',
    kind: 'Own product', where: 'Bolton',
    product: true,
    status: 'Pre-launch',
    line: 'A WhatsApp group asks who is good round here every week and the answers scroll away. This keeps them — with the ranking, the consent and the trade checks all enforced in Postgres rather than in the page.',
    stack: 'Next.js 16 App Router · React 19 · TypeScript · Tailwind 4 · Supabase Postgres with RLS · Railway · Vitest, pgTAP and Playwright in CI',
    outcome: 'Built and deploying, not yet launched: the policy pages are still marked draft pending legal review, the domain has not been switched over and no resident can leave a review yet. What is finished is the part that is hard to retrofit — a ranking nobody can buy, consent recorded as a database constraint, and trade checks that expire on their own.',
    problem: 'A Bolton trades group answers “anyone know a good plumber?” every week, and the answers scroll away. The recommendations are real and local — they are just unsearchable, and the people being recommended have no way to be found outside the thread.',
    approach: 'The rules that matter are in the database, where the interface cannot talk them round. A provider cannot be set live without recorded consent, because a CHECK constraint refuses the row — and the evidence stored alongside it includes a SHA-256 of the exact wording they agreed to, so what was consented to is provable rather than merely dated. Gas work and driving instruction are gated twice: a trigger refuses to file the category without an in-date certificate, and the public view hides it again the day that certificate expires. Ranking is a shrunk mean with a two-year half-life and no score at all below three reviews, so one glowing review cannot outrank a long record — and there is no input to that function that money could reach.',
    logo: { src: '/assets/brand/boltonvouched.png', alt: 'Bolton Vouched wordmark', w: 158, h: 30 },
    tech: ['nextdotjs', 'typescript', 'tailwindcss', 'supabase', 'postgresql', 'railway'],
    layers: { interface: 82, software: 97, infra: 86 },
    img: '/assets/img/bv-web.jpg', alt: 'The Bolton Vouched front page',
  },
];

// The ones with enough captured material to carry a screenshot-led write-up.
// Derived from a field rather than by index, so reordering the wheel above
// cannot silently change which projects the work index writes up.
export const lead = all.filter((p) => p.problem);
