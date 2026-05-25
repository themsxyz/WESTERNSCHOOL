# Western School & College Website Editing Guide

## 1. Change Body Color, Dark Mode, Light Mode, Font, Icon Size

Edit this file:

```text
assets/css/base/wsc-root.css
```

Use this file for:

- body background color
- light mode colors
- dark mode colors
- root variables
- Bangla/English font
- font sizes
- icon size
- icon style

## 2. Change Navbar and Sidebar Design

Edit this file:

```text
assets/css/side-nav/wsc-side-nav.css
```

Use this file for:

- navbar size, position, color
- sidebar width, color, spacing
- sidebar dropdown design
- sidebar collapsed design
- navbar logo/title layout

## 3. Change Buttons, Search Bar, Popup, Login CSS

Edit this file:

```text
assets/css/components/wsc-components.css
```

Use this file for:

- buttons
- icon buttons
- search bar
- search result popup
- tools popup
- login popup
- toast popup

## 4. Change Responsive / Mobile / Desktop CSS

Edit this file:

```text
assets/css/responsive/wsc-responsive.css
```

Use this file for:

- mobile navbar
- mobile sidebar
- desktop friendly layout
- tablet layout

## 5. Change Shortcode Classes

Edit this file:

```text
assets/css/shortcode/wsc-shortcode.css
```

Use this file for:

- color shortcodes
- font size shortcodes
- padding shortcodes
- card shortcodes
- grid shortcodes

## 6. Change All Page Links, Sidebar Menu, Tools Links, Logo URL

Edit this file:

```text
assets/js/wsc-config.js
```

Use this file for:

- school name
- logo URL
- helpline number
- Drive folder URL
- Apps Script Web App URL
- sidebar menu groups
- all HTML page names and links
- navbar tools links
- tool logo URLs

## 7. Change Navbar / Sidebar HTML Structure

Edit this file:

```text
assets/js/wsc-layout.js
```

Use this file for:

- navbar HTML structure
- sidebar HTML structure
- layout wrapper
- where search bar appears
- where icon buttons appear

## 8. Change Search Logic

Edit this file:

```text
assets/js/wsc-search.js
```

Use this file for:

- local page search
- Google Drive search
- search result design logic

## 9. Change Password / Login / Dark Mode Logic

Edit this file:

```text
assets/js/wsc-password.js
```

Default demo login:

```text
Username: Admin
Password: admin123
```

## 10. HTML Pages

All HTML files are blank and only load shared CSS/JS.

Each file contains:

```html
<main data-wsc-page-content></main>
```

You can later add page-specific content inside this tag.
