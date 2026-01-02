# Footer Icon Partials

Icon partials for footer social links:

- `layouts/partials/icons/email.html`
- `layouts/partials/icons/linkedin.html`
- `layouts/partials/icons/twitter.html`
- `layouts/partials/icons/github.html`

Usage (example):

```html
{{ partial "icons/github.html" . }}
```

All icons inherit `currentColor` so footer link classes control their color.
