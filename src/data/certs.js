/**
 * Certifications, as credentials rather than a list.
 *
 * `badge` is the path to the real Microsoft badge image, downloaded from
 * Credly. It is deliberately optional and empty until that file exists: a
 * card renders its badge only when there is one, so nothing has to be drawn
 * or approximated. **Never substitute a generic Azure logo or anything
 * redrawn** — Microsoft's certification badges are trademark-governed and
 * issued through Credly, and a hiring manager who holds the same certificate
 * recognises a fake immediately.
 *
 * `verify` is the public Credly URL for that badge. A link a reader can click
 * is stronger evidence than an image they cannot check, so if only one of the
 * two is available, this is the one worth having.
 *
 * `held: false` means the exam is booked and not sat. A card in that state
 * never shows a badge, because there is not one to show.
 */
export const certs = [
  {
    code: 'AZ-900',
    name: 'Microsoft Azure Fundamentals',
    held: true,
    badge: '',   // e.g. '/assets/img/az900-badge.png'
    verify: '',  // e.g. 'https://www.credly.com/badges/<id>/public_url'
  },
  {
    code: 'AZ-104',
    name: 'Microsoft Azure Administrator',
    held: false,
    note: 'Exam booked, not yet sat — a plan rather than a qualification.',
  },
];
