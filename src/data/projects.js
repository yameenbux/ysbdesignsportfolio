/**
 * One source for every list of work on the site, so home, the wheel and the
 * work index cannot drift apart.
 *
 * `line` is the wheel's read-out copy: one sentence, drawn from that case
 * study's own problem or outcome. Nothing here is a metric, a rating or a
 * client count.
 */

// All six, in the order they sit on the wheel. Taiyabah first because it is
// the largest piece of work and the strongest screenshot; the two smallest
// sit opposite each other so no half of the wheel is weaker than the other.
export const all = [
  {
    slug: 'taiyabah', href: '/taiyabah.html', name: 'Taiyabah Masjid',
    kind: 'Community project', where: 'Bolton',
    line: 'Prayer times in front of a whole community every day. One system feeds a phone app, a public website, two always-on screens in the building and a home display.',
    layers: { interface: 96, software: 88, infra: 92 },
    img: '/assets/img/taiyabah-web.jpg', alt: 'The Taiyabah Masjid website',
  },
  {
    slug: 'venetian', href: '/venetian.html', name: 'The Venetian Company',
    kind: 'Client', where: 'Nationwide',
    line: 'Plaster and microcement work that lived entirely on Instagram. Now a site on their own domain, art-directed around their own photography.',
    layers: { interface: 94, software: 34, infra: 62 },
    img: '/assets/img/venetian-web.jpg', alt: 'The Venetian Company website',
  },
  {
    slug: 'hairbychrissy', href: '/hairbychrissy.html', name: 'Hair by Chrissy',
    kind: 'Client', where: 'London',
    line: 'Bookings arrived as Instagram DMs, with no calendar. The site is the booking system: live availability, deposits and a real calendar behind it.',
    layers: { interface: 80, software: 98, infra: 70 },
    img: '/assets/img/hbc-web.jpg', alt: 'The Hair by Chrissy booking site',
  },
  {
    slug: 'ellash', href: '/ellash.html', name: 'èllash',
    kind: 'Client', where: 'Manchester',
    line: 'A calendar for a beauty business without the overhead of a big platform — no per-booking commission and no monthly fee.',
    layers: { interface: 78, software: 84, infra: 44 },
    img: '/assets/img/ellash-web.jpg', alt: 'The èllash booking page',
  },
  {
    slug: 'buxtravel', href: '/buxtravel.html', name: 'Bux Travel',
    kind: 'In-house', where: 'Bolton',
    line: 'A minibus operator whose customers rang to ask the same questions. The site answers them before the phone goes.',
    layers: { interface: 88, software: 24, infra: 56 },
    img: '/assets/img/bux-web.jpg', alt: 'The Bux Travel website',
  },
  {
    slug: 'luxescent', href: '/luxescent.html', name: 'LuxeScent UK',
    kind: 'Client', where: 'Birmingham',
    line: 'A fragrance brand selling from a grid of near-identical bottles. Now a face that carries the price, and a guided path to the right one.',
    layers: { interface: 90, software: 30, infra: 42 },
    img: '/assets/img/luxe-web.jpg', alt: 'The LuxeScent UK website',
  },
];

// The three with enough captured material to carry a screenshot-led layout
// (CLAUDE.md, "The three case studies"). The work index leads on these.
export const lead = [
  {
    ...all[0],
    stack: 'PWA · Website · Signage · Home display · Serverless backend',
    outcome: 'Prayer times in front of a whole community every day. One system feeds a phone app, a public website, two always-on screens inside the building, and a home display for a spare tablet.',
    problem: 'A Bolton masjid needed prayer times in front of its community every day — on phones, on the wall, and on the web. Three separate problems, all being solved by hand.',
    approach: 'One system instead of three. An installable app with live audio and push alerts, a public website, two always-on screens inside the building, and a home display anyone can run on a spare tablet or TV. A Python pipeline feeds all of them from a single timetable, so nothing is typed twice.',
  },
  {
    ...all[1],
    stack: 'Website · Identity · Design → build → deploy',
    outcome: 'Venetian plaster and microcement work that lived entirely on Instagram — nothing to send anyone, nothing that turned up in a search. Now a site on their own domain, art-directed around their own photography.',
    problem: 'They lay Venetian plaster and microcement in homes across the country. The work is genuinely beautiful and it lived entirely on Instagram — nothing to send anyone, nothing that turned up in a search.',
    approach: 'I built the site before being asked. One page, art-directed around their own photography: a full-bleed hero, the two materials explained side by side, how a job runs, what it costs, and one action running through all of it — book a call.',
  },
  {
    ...all[2],
    stack: 'Booking platform · Front end · Backend · Payments',
    outcome: 'Bookings arrived as Instagram DMs, with no calendar and no way to stop two people asking for the same Saturday. The site is the booking system: live availability, deposits, and a real calendar behind it.',
    problem: 'Chrissy fits hair extensions by hand in a private London studio. Bookings came through Instagram DMs — a thread per client, no calendar, and no way to stop two people asking for the same Saturday.',
    approach: 'The site is not a brochure, it is the booking system. Pick a service, see genuine live availability, take a slot, pay a deposit. Behind it sits a real calendar, an admin view, deposit handling and automatic confirmation emails.',
  },
];
