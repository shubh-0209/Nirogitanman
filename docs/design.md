# Nirogitanman Design System

## Design Philosophy
Nirogitanman's design philosophy is centered around trust, clarity, and calmness. As a healthcare platform, the interface must instill confidence and provide a frictionless experience. We prioritize content over decoration, ensuring that medical information, AI assistance, and daily health metrics are presented with absolute clarity.

## Brand Personality
- **Professional & Clinical**: Serious about health without being intimidating.
- **Empathetic & Calm**: Reducing anxiety through predictable, soft, and balanced UI.
- **Modern & Premium**: High-quality craftsmanship that implies a state-of-the-art technological foundation.

## Visual Language
- **Minimalism**: Stripped of all non-essential visual noise. 
- **No Gradients, Glassmorphism, or Neumorphism**: Strictly flat, clean design with distinct boundaries.
- **Large Whitespace**: Generous margins and padding to let content breathe.
- **Rounded Corners**: Friendly, approachable aesthetics (e.g., `rounded-xl`, `rounded-2xl`).
- **Soft Shadows**: Elevated elements use large, highly diffused, low-opacity shadows (e.g., `shadow-sm`, `shadow-md` with custom alpha) rather than harsh drop shadows.

## Color Palette
Strictly adhere to the following palette. **Never use purple, pink, violet, or red as a primary brand color.**

- **Backgrounds**: Pure White (`#FFFFFF`), Off-White/Slate (`#F8FAFC`).
- **Text**: Deep Slate (`#0F172A`) for primary text, Slate (`#64748B`) for secondary text.
- **Primary Brand**: Teal (`#0F766E`) and Emerald (`#059669`).
- **Accents**: Restrained Blue (`#2563EB`) strictly for actionable links and focused states.
- **Errors/Warnings**: Muted Red (`#EF4444`) used *sparingly* only for destructive actions or critical clinical alerts.

## UI & UX Principles
- **Predictability**: Standardized placement of navigation, search, and primary actions.
- **Scannability**: High contrast between headings and body text.
- **Frictionless Entry**: Health data entry should require minimal typing; use sliders, toggles, and smart defaults.
- **Progressive Disclosure**: Hide complex settings or advanced AI features until the user requests them.

## Typography System
- **Font**: Inter, Roboto, or Outfit (sans-serif, highly legible).
- **Scale**:
  - `h1`: 36px (Semibold)
  - `h2`: 24px (Semibold)
  - `h3`: 18px (Medium)
  - `body`: 16px (Regular)
  - `small`: 14px (Regular)
  - `micro`: 12px (Medium, usually uppercase for labels)

## Spacing Scale
- Use a strict 4px/8px grid system (`spacing-1` to `spacing-16` in Tailwind).
- Dashboard widgets must have exactly `24px` (`p-6`) internal padding.
- Section gaps must be `32px` (`gap-8`) or `48px` (`gap-12`).

## Icon & Illustration Guidelines
- **Icons**: Lucide React or similar minimal line-icon sets. 1.5px stroke width.
- **Illustrations**: Strictly related to healthcare, wellness, medical professionals, preventive care, or AI diagnostics. 
- **NO Generic Assets**: Never use abstract, corporate "tech" vectors. Only use meaningful clinical/wellness imagery.

## State Guidelines
- **Empty States**: Must include a muted healthcare-related icon, a clear title ("No appointments found"), and a primary CTA ("Book Appointment").
- **Loading States**: Use skeletal loaders matching the shape of the incoming content. Avoid generic spinners for page-level loading.
- **Error States**: Calm, non-alarmist phrasing. Always provide a recovery action (e.g., "Retry connection").
- **Success States**: Subtle toast notifications at the bottom right. Emerald green checkmark.

## Accessibility (WCAG)
- **Contrast**: All text must meet WCAG AA contrast ratios (4.5:1).
- **Focus States**: Every interactive element must have a visible `:focus-visible` ring (Restrained Blue, 2px offset).
- **Screen Readers**: `aria-labels` on all icon-only buttons. Semantic HTML (`<main>`, `<nav>`, `<aside>`).

## Responsive & Motion Principles
- **Mobile-First**: Dashboards collapse into off-canvas sidebars on mobile. Data tables become stacked cards.
- **Motion**: Strictly Framer Motion for *subtle* interactions.
  - Page transitions: Fade in (`duration: 0.2s`).
  - Accordions/Dropdowns: Slide down (`duration: 0.15s`).
  - **No bouncy, erratic, or long animations.**

## Dashboard Consistency Rules
- **Layout**: Fixed sidebar (left), Top header (search & profile), Scrollable main content area.
- **Cards**: All dashboard cards must have a 1px border (`border-slate-200`), pure white background, and `rounded-xl`.
- **Actions**: Primary actions are top-right. Filters are top-left.
