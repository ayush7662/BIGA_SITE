# Shared UI Components

This project does not use a third-party UI component library (like shadcn/ui, MUI, or Radix). Instead, it uses custom CSS styling defined in [index.css](file:///e:/BIGA/frontend/src/index.css) applied to native HTML elements.

## Primitives and Styling Conventions

The following CSS classes are defined in `index.css` to style standard UI primitives:

### Cards (`.card`)
Used for framing content, product items, and form overlays.
```html
<div class="card">
  <!-- Content -->
</div>
```

### Buttons (`.btn`, `.btn.secondary`, `.ghost-btn`)
Used for primary, secondary, and tertiary actions.
```html
<button class="btn">Primary Action</button>
<button class="btn secondary">Secondary Action</button>
<button class="ghost-btn">Tertiary Action</button>
```

### Form Inputs
Standard styling applies directly to `input` and `select` elements.
```html
<input placeholder="Enter text..." />
<select>
  <option>Option 1</option>
</select>
```

### Grids (`.grid`)
Used for product grids and catalog lists. Responsive auto-filling columns.
```html
<div class="grid">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
</div>
```

### Navbar (`.nav`, `.logo`, `.nav-links`)
Used to wrap page layouts.
```html
<nav class="nav">
  <a class="logo" href="/">B G A Y S H</a>
  <div class="nav-links">
    <!-- Links -->
  </div>
</nav>
```
