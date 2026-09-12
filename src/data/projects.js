// The projects that lead, in the order they appear. Home and the work index
// both read from here so their copy cannot drift apart.
// Outcome lines are drawn from each case study; nothing here is a metric,
// a rating or a client count.
//
// `live: false` marks work that is built and handed over but not yet on a
// public address. The homepage's "Live" badge reads this — a badge on a site
// nobody can visit would be the one kind of claim the copy rules bar.
export const lead = [
  {
    slug: 'taiyabah', href: '/taiyabah.html', name: 'Taiyabah Masjid',
    kind: 'Community project', where: 'Bolton',
    stack: 'PWA · Website · Signage · Home display · Accounts & portals · Serverless backend',
    outcome: 'Prayer times in front of a whole community every day, and the office work behind them. One system feeds a phone app, a public website, two always-on screens in the building and a home display — and the rebuilt site now carries accounts, hall and nikāḥ bookings with Stripe deposits, course sign-ups and a madrasah portal.',
    problem: 'A Bolton masjid needed prayer times in front of its community every day — on phones, on the wall, and on the web. Three separate problems, all being solved by hand.',
    approach: 'One system instead of three. An installable app with live audio and push alerts, a public website, two always-on screens inside the building, and a home display anyone can run on a spare tablet or TV. A Python pipeline feeds all of them from a single timetable, so nothing is typed twice.',
    layers: { interface: 96, software: 88, infra: 92 },
    img: '/assets/img/taiyabah-web.jpg', alt: 'The Taiyabah Masjid website',
  },
  {
    slug: 'venetian', href: '/venetian.html', name: 'The Venetian Company',
    kind: 'Client', where: 'Nationwide',
    stack: 'Website · Identity · Design → build → deploy',
    outcome: 'Venetian plaster and microcement work that lived entirely on Instagram — nothing to send anyone, nothing that turned up in a search. Now a site on their own domain, art-directed around their own photography.',
    problem: 'They lay Venetian plaster and microcement in homes across the country. The work is genuinely beautiful and it lived entirely on Instagram — nothing to send anyone, nothing that turned up in a search.',
    approach: 'I built the site before being asked. One page, art-directed around their own photography: a full-bleed hero, the two materials explained side by side, how a job runs, what it costs, and one action running through all of it — book a call.',
    layers: { interface: 94, software: 34, infra: 62 },
    img: '/assets/img/venetian-web.jpg', alt: 'The Venetian Company website',
  },
  {
    slug: 'hairbychrissy', href: '/hairbychrissy.html', name: 'Hair by Chrissy',
    kind: 'Client', where: 'London',
    stack: 'Booking platform · Front end · Backend · Payments',
    outcome: 'Bookings arrived as Instagram DMs, with no calendar and no way to stop two people asking for the same Saturday. The site is the booking system: live availability, deposits, and a real calendar behind it.',
    problem: 'Chrissy fits hair extensions by hand in a private London studio. Bookings came through Instagram DMs — a thread per client, no calendar, and no way to stop two people asking for the same Saturday.',
    approach: 'The site is not a brochure, it is the booking system. Pick a service, see genuine live availability, take a slot, pay a deposit. Behind it sits a real calendar, an admin view, deposit handling and automatic confirmation emails.',
    layers: { interface: 80, software: 98, infra: 70 },
    img: '/assets/img/hbc-web.jpg', alt: 'The Hair by Chrissy booking site',
  },
  {
    slug: 'diamond', href: '/diamond.html', name: 'Diamond Heating & Plumbing',
    kind: 'Client', where: 'Bolton',
    live: false,
    stack: 'Single-page site · WhatsApp photo handoff · Static export',
    outcome: 'A heating engineer who kept being rung by people who could not describe the fault. The site gets their details and photos of the problem into his WhatsApp in about a minute, so he arrives with the right part.',
    problem: 'A Bolton heating engineer gets rung by people who cannot describe what is wrong. "The boiler\'s not working" costs a visit to find out it was a part he could have carried in the van.',
    approach: 'One page, built for a phone. A WhatsApp link cannot carry an image, so the form uses the operating system\'s share sheet — message text and photos already in it — and falls back to a plain link on desktop, where it tells the customer their photos did not travel. Photos are resized in the browser and never touch a server.',
    layers: { interface: 92, software: 54, infra: 36 },
    img: '/assets/img/diamond-web.jpg', alt: 'The Diamond Heating and Plumbing home page',
  },
];
