export const LOGO_WIDTHS = [120, 240, 360, 500] as const;

export function logoSrcSet() {
  return LOGO_WIDTHS.map((width) => `/brand/logo-mark-${width}.webp ${width}w`).join(", ");
}

/** CSS size of the header mark: 7.5rem mobile, 13rem from md, 16rem from lg. */
export const LOGO_HEADER_SIZES =
  "(max-width: 767.98px) 120px, (min-width: 1024px) 256px, 208px";

/** CSS size of the footer mark: 52px on phones, 56px to 860px, 72px above. */
export const LOGO_FOOTER_SIZES = "(max-width: 767.98px) 52px, (max-width: 860px) 56px, 72px";
