/**
 * The client-facing commercial terms: the four-step process, the three price
 * tiers and the questions that come up before booking.
 *
 * These lived in about.astro until 7 October, when the site pivoted to a
 * hiring audience. They are real business terms and are carried over verbatim
 * on the numbers — not mine to reword — but they no longer belong on the page
 * a hiring manager reads first.
 */

export const steps = [
  ['Chat', "Message me on WhatsApp. We talk through what you need and I give you a fixed quote — no obligation."],
  ['Book', 'A 50% deposit books your slot, and I start gathering your content and photos.'],
  ['Build', "I design and build it, share a live preview, and refine it with you until it's right."],
  ['Launch', 'Final balance, we go live, and the care plan keeps it fast, secure and up to date.'],
];

export const plans = [
  {
    name: 'Starter',
    build: '£495',
    care: '£20/mo',
    blurb: 'A sharp one-page presence for a small local business.',
    includes: [
      '1–3 page mobile website',
      'WhatsApp and click-to-call buttons',
      'Google Business Profile set up',
      'Hosting, domain and security included',
      'Up to 30 minutes of edits each month',
    ],
  },
  {
    name: 'Business',
    build: '£895',
    care: '£35/mo',
    blurb: 'For businesses that want enquiries, not just a listing.',
    includes: [
      '4–6 page website',
      'Photo gallery and enquiry form',
      'Customer reviews section',
      'Basic local SEO to rank in your area',
      'Up to 1 hour of edits each month',
    ],
  },
  {
    name: 'Premium',
    build: 'from £1,500',
    care: '£55/mo',
    blurb: 'Bigger sites with menus, ordering or content built in.',
    includes: [
      '6+ pages, or a custom build',
      'Menus or online ordering integration',
      'Blog or news section',
      'Ongoing SEO monitoring',
      'Priority support and content updates',
    ],
  },
];

/**
 * The questions that actually come up before someone books, answered here
 * rather than on a page of their own — the sitemap is settled at five
 * navigable pages, and these belong next to the process and the prices.
 *
 * Nothing here states a timescale, a client count or a result I cannot
 * evidence. Where the honest answer is "it depends", it says so and points
 * at the quote, which is where the real number lives.
 */
export const faqs = [
  [
    'How long does it take?',
    "It depends on the size of the build and how quickly content reaches me — that second one is usually the deciding factor. You get a date in your quote before you pay anything, and I hold to it.",
  ],
  [
    'Do I have to be near Manchester?',
    "No. I'm in Greater Manchester and the work has gone to London, Birmingham, Coventry and Nuneaton. Everything happens over WhatsApp and a shared preview link, so where you are is not the deciding factor.",
  ],
  [
    'I already have a website. Can you fix it rather than replace it?',
    "Sometimes. Send me the address and I'll tell you honestly whether it is worth repairing or whether you'd get more for the money starting again. I'll say so if repairing is the better call.",
  ],
  [
    'Do I have to take the care plan?',
    "The care plan covers hosting, the domain, security updates and your monthly edits, so a site on a plan has somewhere to live. If you'd rather host it yourself, say so at the quote stage and I'll build it to hand over instead.",
  ],
  [
    'Who owns the site when it is finished?',
    "You do, once the final balance is paid — design, content and code, with the domain registered in your name. The terms page spells it out.",
  ],
  [
    'Do you only build websites?',
    "No. Booking systems, installable apps, the backends and databases behind them, and the hosting and deploy pipeline they run on. The prices above cover websites; anything with software behind it is quoted per project.",
  ],
  [
    'What do you need from me to start?',
    "A deposit to book the slot, and your content — text, photos, logo. If the photos are the thing holding you up, tell me early and we work around it rather than letting the project stall.",
  ],
];
