# Design System Specification - BIG A Society Marketplace

This document outlines the design system, styling guidelines, and theme tokens for the BIG A Society Marketplace application.

## Core Design Tokens

### Colors
- **Page Background**: `#f4f6fb` (soft grayish blue)
- **Primary Text**: `#1f2937` (dark slate gray)
- **Secondary/Muted Text**: `#4b5563` (cool gray)
- **Primary Brand / Action**: `#2563eb` (royal blue)
- **Secondary Brand / Action**: `#e5e7eb` (cool gray light)
- **Card Background**: `#ffffff` (pure white)
- **Navbar Background**: `#0f172a` (deep dark blue/slate)
- **Border/Divider**: `#d1d5db` (light gray)

### Typography
- **Font Family**: Arial, sans-serif
- **Heading 1**: 28px, Bold
- **Heading 2**: 24px, Bold
- **Heading 3**: 20px, Bold
- **Body Text**: 16px, Normal
- **Subtext / Captions**: 14px, Normal

### Spacing & Grid
- **Page Padding**: `16px`
- **Max Width**: `1200px` (centered via `margin: 0 auto`)
- **Grid Layout**: CSS Grid with auto-fill and minmax columns (`minmax(240px, 1fr)`) with `14px` gap.
- **Form Row Spacing**: `10px`
- **Button / Input Padding**: `10px 14px` (buttons), `10px` (inputs)

### Borders & Shadows
- **Card Border Radius**: `12px`
- **Button Border Radius**: `8px`
- **Input Border Radius**: `8px`
- **Navbar Border Radius**: `10px`
- **Card Shadow**: `0 2px 12px rgba(15, 23, 42, 0.08)`
- **Auth Card Overlay**: Background linear gradient `135deg, rgba(15, 23, 42, 0.78), rgba(30, 41, 59, 0.6)` with backdrop blur filter of `4px`.

## Layout Structure
- **Auth Flow Layout**: Centered layout using a full screen background image with linear-gradient overlay and blurred card component.
- **App Layout**: Global `Navbar` at the top of page, followed by main content wrapped in a `.page` container.

## Reusable Components & Classes

- `.btn` - Standard primary button.
- `.btn.secondary` - Standard secondary button.
- `.ghost-btn` - Text button with low visual weight.
- `.card` - White rounded card frame with soft shadow.
- `.form` - Layout grid for forms.
- `.grid` - Responsive product grid layout.
- `.product-card` - Specific card wrapper for products featuring product image (`160px` height, cover fit) and price/ratings/actions.
