// The projects that lead, in the order they appear. Home and the work index
// both read from here so their copy cannot drift apart.
// Outcome lines are drawn from each case study; nothing here is a metric,
// a rating or a client count.
//
// `product: true` separates the things I own from the things I was asked to
// build. The work index groups on this, not on the `kind` string, which is
// display copy and would be a fragile thing to branch on.
//
// `status` is the badge the homepage prints over each shot. Omit it and the
// project gets the pulsing "Live" chip; set it and that exact string is shown
// flat instead. A Live badge on something nobody can visit, or on a product
// that is part-built, is the one kind of claim the copy rules bar — so the
// honest label goes here rather than the badge being removed.
export const lead = [
  {
    slug: 'taiyabah', href: '/taiyabah.html', name: 'Taiyabah Masjid',
    kind: 'Community project', where: 'Bolton',
    stack: 'PWA + Cloudflare Worker · Supabase/Postgres · Stripe · OneSignal push · Signage',
    outcome: 'Prayer times in front of a whole community every day, and the office work behind them. One system feeds a phone app, a public website, two always-on screens in the building and a home display — and the rebuilt site now carries accounts, hall and nikāḥ bookings with Stripe deposits, course sign-ups and a madrasah portal.',
    problem: 'A Bolton masjid needed prayer times in front of its community every day — on phones, on the wall, and on the web. Three separate problems, all being solved by hand.',
    approach: 'One system instead of three. An installable app with live audio and push alerts, a public website, two always-on screens inside the building, and a home display anyone can run on a spare tablet or TV. A Python pipeline feeds all of them from a single timetable, so nothing is typed twice.',
    layers: { interface: 96, software: 88, infra: 92 },
    img: '/assets/img/taiyabah-web.jpg', alt: 'The Taiyabah Masjid website',
  },
  {
    slug: 'venetian', href: '/venetian.html', name: 'The Venetian Company',
    kind: 'Client', where: 'Nationwide',
    stack: 'Astro · Tailwind · TypeScript · Identity · Design → build → deploy',
    outcome: 'Venetian plaster and microcement work that lived entirely on Instagram — nothing to send anyone, nothing that turned up in a search. Now a site on their own domain, art-directed around their own photography.',
    problem: 'They lay Venetian plaster and microcement in homes across the country. The work is genuinely beautiful and it lived entirely on Instagram — nothing to send anyone, nothing that turned up in a search.',
    approach: 'I built the site before being asked. One page, art-directed around their own photography: a full-bleed hero, the two materials explained side by side, how a job runs, what it costs, and one action running through all of it — book a call.',
    layers: { interface: 94, software: 34, infra: 62 },
    img: '/assets/img/venetian-web.jpg', alt: 'The Venetian Company website',
  },
  {
    slug: 'hairbychrissy', href: '/hairbychrissy.html', name: 'Hair by Chrissy',
    kind: 'Client', where: 'London',
    stack: 'Node API on Render · Supabase/Postgres · Stripe Checkout · Unbuilt front end',
    outcome: 'Bookings arrived as Instagram DMs, with no calendar and no way to stop two people asking for the same Saturday. The site is the booking system: live availability, cash or card with a Stripe deposit, and a dashboard where she sets her own days, hours and time off.',
    problem: 'Chrissy fits hair extensions by hand in a private London studio. Bookings came through Instagram DMs — a thread per client, no calendar, and no way to stop two people asking for the same Saturday.',
    approach: 'The site is not a brochure, it is the booking system. One unbuilt front end served two ways: a Node API on Render with Supabase behind it runs the live calendar, the dashboard and Stripe Checkout, and the copy published to Pages falls back to enquiry mode rather than showing a calendar that only looks live.',
    layers: { interface: 80, software: 98, infra: 70 },
    img: '/assets/img/hbc-web.jpg', alt: 'The Hair by Chrissy booking site',
  },
  {
    slug: 'diamond', href: '/diamond.html', name: 'Diamond Heating & Plumbing',
    kind: 'Client', where: 'Bolton',
    status: 'Not live yet',
    stack: 'Next.js 15, static export · TypeScript · Tailwind 4 · shadcn/ui',
    outcome: 'A heating engineer who kept being rung by people who could not describe the fault. The site gets their details and photos of the problem into his WhatsApp in about a minute, so he arrives with the right part.',
    problem: 'A Bolton heating engineer gets rung by people who cannot describe what is wrong. "The boiler\'s not working" costs a visit to find out it was a part he could have carried in the van.',
    approach: 'One page, built for a phone. A WhatsApp link cannot carry an image, so the form uses the operating system\'s share sheet — message text and photos already in it — and falls back to a plain link on desktop, where it tells the customer their photos did not travel. Photos are resized in the browser and never touch a server.',
    layers: { interface: 92, software: 54, infra: 36 },
    img: '/assets/img/diamond-web.jpg', alt: 'The Diamond Heating and Plumbing home page',
  },
  {
    slug: 'masjidone', href: '/masjidone.html', name: 'MasjidOne',
    kind: 'Own product', where: 'Bolton',
    product: true,
    status: 'In development',
    stack: 'Next.js 15, static export · TypeScript · Tailwind · shadcn/ui · Supabase Postgres · Stripe',
    outcome: 'Four surfaces on one Supabase Postgres, with a masjid_id on every table and Row Level Security scoping every query to one masjid. The marketing site is built and published; the madrasah portal and parent access are in development, and the pricing page says which is which on the plan card itself.',
    problem: 'The office knows the same family three separate times — prayer times in one system, the website in another, the register on paper, fees in a book — and can only join them up by remembering.',
    approach: 'One Supabase Postgres behind four surfaces per masjid, with Row Level Security scoping every query to one masjid. What I have built and can show is the marketing site: Next.js 15 exported to static files. The madrasah portal and parent access are not built yet, and the pricing page says so in the plan itself.',
    layers: { interface: 88, software: 94, infra: 82 },
    img: '/assets/img/masjidone-web.jpg', alt: 'The MasjidOne marketing site',
  },
];
