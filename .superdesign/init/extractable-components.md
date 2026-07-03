# Extractable Layout Components

The following components are shared layouts or global visual elements that can be extracted into reusable `<sd-component>` instances.

## 1. Navbar
- **File Path**: [Navbar.jsx](file:///e:/BIGA/frontend/src/components/Navbar.jsx)
- **Props**:
  - `search` (string, defaultValue: `""`)
  - `setSearch` (function)
- **State Dependencies**:
  - Uses `AuthContext` to determine if a user is logged in and their role (`customer` vs `shopkeeper`).
- **Description**: Main header and navigation bar rendering links dynamically based on user role.
