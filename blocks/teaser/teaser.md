# Teaser Block Documentation

## Overview
The Teaser block is a modular component designed for the AEM Edge Delivery Services project. It displays a visually engaging section, typically used to highlight key content, promotions, or calls to action on a webpage.

## Location
- Block folder: `/blocks/teaser/`
- Main files:
  - `teaser.js`: Handles block functionality and decoration
  - `teaser.css`: Provides block-specific styling

## Features
- Modular and self-contained
- Mobile-first responsive design
- Semantic HTML structure
- Accessibility support
- Lazy-loaded images for performance
- Theming via CSS custom properties

## Usage
To use the Teaser block:
1. Author content in DA.live using a table structure for the block.
2. Reference the block in your document; it will auto-load based on HTML structure.
3. Customize content, images, and links as needed.

## Authoring Guide

Follow these steps to author a Teaser block in DA.live:

1. **Insert a Table for the Block**
  - Create a table in your DA.live document where you want the teaser to appear.
  - The first row should define the block type, e.g., `teaser`.

2. **Add Content**
  - Use table rows to add headings, descriptive text, images, and call-to-action links.
  - Example table structure:

    | teaser |         |         |
    |--------|---------|---------|
    | Heading| Image   | CTA     |
    | "New Features" | /path/to/image.jpg | [Learn More](https://example.com) |

3. **Configure Images**
  - Use high-quality images and provide descriptive alt text for accessibility.
  - Images are lazy-loaded for performance.

4. **Add CTAs (Call to Action)**
  - Add one or more links as buttons to drive user engagement.
  - Use clear, action-oriented text for CTAs.

5. **Preview and Test**
  - Preview the block in DA.live to ensure layout and content are correct.
  - Check for mobile responsiveness and accessibility.

6. **Advanced Customization**
  - Add additional rows for secondary text, icons, or video embeds as needed.
  - Use semantic HTML and keep content concise.

### Tips
* Keep teaser content short and visually engaging.
* Use CSS custom properties for theming if needed.
* Ensure all images and links are relevant to the teaser's purpose.
* Test the block in different browsers and devices.

## Block Structure
- The block is decorated using the default export function in `teaser.js`:
  ```js
  export default function decorate(block) { ... }
  ```
- Styling is scoped to `.teaser` classes in `teaser.css`.

## Best Practices
- Use semantic elements (e.g., `<section>`, `<h2>`, `<img>`, `<a>`)
- Add alt text for images
- Ensure sufficient color contrast
- Test for keyboard navigation
- Avoid direct DOM manipulation outside the block

## Helper Functions Used
- `decorateBlock(block)`
- `loadBlock(block)`
- `decorateButtons(element)`
- `decorateIcons(element)`
- `createOptimizedPicture(src, alt, eager)`

## Accessibility
- ARIA attributes for enhanced screen reader support
- Keyboard navigation enabled
- Responsive layout for all devices

## Customization
- Update `teaser.css` for block-specific styles
- Use CSS custom properties for theming
- Edit `teaser.js` to extend or modify block behavior

## Example
```html
<section class="teaser">
  <h2>Discover Our Latest Features</h2>
  <img src="/path/to/image.jpg" alt="Feature preview" loading="lazy">
  <a href="/learn-more" class="teaser-cta">Learn More</a>
</section>
```

## Testing Checklist
- Mobile responsiveness
- Cross-browser compatibility
- Lighthouse scores (Performance, Accessibility, SEO)
- Keyboard and screen reader support

## Related Files
- Global styles: `/styles/styles.css`
- Helper scripts: `/scripts/scripts.js`, `/scripts/aem.js`

---
For further details, refer to the [project instructions](../../.github/copilot-instructions.md).
