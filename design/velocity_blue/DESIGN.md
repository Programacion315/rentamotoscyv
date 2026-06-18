---
name: Velocity Blue
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434653'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737784'
  outline-variant: '#c3c6d5'
  surface-tint: '#215abd'
  primary: '#00357f'
  on-primary: '#ffffff'
  primary-container: '#004aad'
  on-primary-container: '#a9c1ff'
  inverse-primary: '#b0c6ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#31384d'
  on-tertiary: '#ffffff'
  tertiary-container: '#474f65'
  on-tertiary-container: '#bac1db'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001945'
  on-primary-fixed-variant: '#00429b'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  action-orange: '#E94C1F'
  surface-white: '#FFFFFF'
  border-subtle: '#E2E8F0'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  button-text:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered for a premium motorcycle rental service, emphasizing reliability, freedom, and professional maintenance. The target audience includes urban commuters, adventure tourists, and motorcycle enthusiasts who value efficiency and vehicle quality.

The chosen design style is **Corporate / Modern** with a focus on high-performance aesthetics. It utilizes structured layouts, ample whitespace, and subtle depth to create an interface that feels as tuned and precise as the motorcycles being rented. While drawing structural inspiration from the reference—specifically in its clear categorization and prominent CTAs—this system strips away visual clutter in favor of a "clean-tech" aesthetic that prioritizes high-resolution vehicle imagery and effortless booking flows.

## Colors

The palette shifts the reference's aggressive black-and-red scheme toward a more professional and trustworthy "Velocity Blue." 

- **Primary Blue:** Used for brand identity, primary actions, and active states. It evokes professionalism and safety.
- **Secondary Grey:** Utilized for secondary information and supporting text to maintain a sophisticated, neutral backdrop.
- **Action Orange:** Retained from the reference as a high-visibility accent color, used exclusively for "Book Now" buttons and critical alerts to drive conversion.
- **Neutral/Surface:** A range of ultra-light greys and pure whites ensure the interface feels airy and modern, allowing the colors of the motorcycles to pop.

## Typography

This design system employs a tiered typography strategy to balance modern tech with mechanical precision. 

- **Hanken Grotesk** serves as the headline face. Its sharp, contemporary cuts mirror modern automotive design.
- **Inter** is the workhorse for body copy, chosen for its exceptional legibility during the booking process and technical specifications.
- **JetBrains Mono** is used sparingly for labels (e.g., "Engine Displacement," "Price Per Day") to introduce a technical, "spec-sheet" feel that appeals to motorcycle enthusiasts.

For mobile, headlines scale down slightly to ensure high-impact hero sections remain readable without excessive scrolling.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The spacing rhythm is based on an 8px base unit.

- **Desktop:** A maximum container width of 1280px prevents lines of text from becoming too long and keeps vehicle cards centered and focused.
- **Margins:** Large 48px outer margins on desktop create a "gallery" feel for the motorcycle listings.
- **Rhythm:** Use `stack-lg` (32px) to separate distinct sections (e.g., Search bar from Results), and `stack-sm` (8px) for internal component spacing (e.g., Icon to Label).

## Elevation & Depth

The design system utilizes **Tonal Layers** and **Ambient Shadows** to create a sense of organized hierarchy.

- **Level 0 (Surface):** The background (#F8FAFC) is flat.
- **Level 1 (Cards):** Vehicle cards and search modules use a pure white background with a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.05)) and a subtle 1px border (#E2E8F0).
- **Level 2 (Dropdowns/Modals):** Elements that float above the UI use a more pronounced shadow to indicate interactivity and focus.
- **Interactive States:** Buttons lift slightly on hover through an increased shadow spread, providing tactile feedback to the user.

## Shapes

The shape language is **Rounded**, striking a balance between the "rugged" nature of motorcycles and the "smooth" experience of a professional service.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) radius.
- **Large Components:** Hero sections and primary vehicle containers use a 1rem (16px) radius to soften the visual weight of large images.
- **Status Pills:** Badges for "Available" or "Discounted" use a fully rounded (pill) shape to distinguish them from functional UI buttons.

## Components

### Buttons
- **Primary:** Velocity Blue background with white text. High-contrast and solid.
- **Conversion:** Action Orange background. Reserved strictly for "Reserve Now" or "Confirm Booking."
- **Ghost:** Transparent background with a 1px Blue or Grey border for secondary actions like "View Specs."

### Vehicle Cards
- Designed as the primary content unit. Top-aligned high-res image, followed by a `label-caps` category, a `headline-md` title, and a clear price-per-day indicator. The bottom of the card houses the primary action button.

### Input Fields
- Clean, 1px bordered boxes that use the Secondary Grey for placeholders. On focus, the border transitions to Primary Blue with a subtle 2px outer glow.

### Filters & Chips
- Use the `roundedness: 2` setting. Active filters are filled with a light tint of Primary Blue, while inactive ones remain outlined.

### Availability Calendar
- A custom component for motorcycle rental. High-contrast selection range using Primary Blue, with unavailable dates greyed out and struck through.