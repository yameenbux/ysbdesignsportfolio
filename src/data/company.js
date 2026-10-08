/**
 * Statutory company details for the footer disclosure line.
 *
 * Added 8 October. This reverses the earlier removal of the limited-company
 * details, and the reason is not cosmetic: if YSB Ventures Ltd is the trading
 * entity, UK disclosure rules require the registered name, the place of
 * registration, the company number and the registered office on its business
 * website. The same details are also what Apple checks the website against
 * when verifying an organisation enrolment, so the two needs coincide.
 *
 * `number` and `office` are the gate — the line renders only when BOTH are
 * set, because a disclosure missing either is worse than no disclosure. They
 * are deliberately empty rather than guessed: a wrong company number is a
 * false statement about a real entity, and the copy rules bar inventing
 * anything, placeholders included.
 *
 * Fill from the Companies House record, matching it character for character
 * (`Ltd` and `Limited` are not interchangeable). `vat` is optional and
 * renders only if VAT-registered.
 */
export const company = {
  // The registered name, exactly as Companies House spells it.
  name: 'YSB Ventures Ltd',
  // 'England and Wales', 'Scotland' or 'Northern Ireland'.
  jurisdiction: 'England and Wales',
  // Eight characters, e.g. '12345678'.
  number: '',
  // One line, comma-separated, including the postcode.
  office: '',
  // Optional, e.g. 'GB123456789'. Omit unless registered.
  vat: '',
};

/** The line is incomplete without both, so it is all-or-nothing. */
export const hasCompanyDetails = Boolean(company.number && company.office);
