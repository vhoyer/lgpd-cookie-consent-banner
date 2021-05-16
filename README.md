# LGPD Cookie Consent Banner

Pre-made web component for a cookie consent banner, no checkbox no nothing, just a warning "If you continue navigating you agree to the use of cookies".

## Using it on your project

I made this with CDN use in mind, for you to just, load this at the end of the
file and use the component elsewhere on the page.

```html
<!-- Import the component (this auto loads the component) -->
<script src="https://cdn.jsdelivr.net/gh/vhoyer/lgpd-cookie-consent-banner/dist/index.js"></script>

<!-- Use the component -->
<lgpd-cookie-consent-banner></lgpd-cookie-consent-banner>
```

## Customizing

### Css Variables

All css variables are described here and the values here are the default values used if they are not declared.

```css
/* the variables you can use are the following */
:root {
    --banner-margin: 1rem;
    --banner-color-primary: #2c7644;
    --banner-color-primary-hover: #111111;
    --banner-z-index: 9999;
}
```
