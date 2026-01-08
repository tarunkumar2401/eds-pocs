/**
 * Teaser Block
 * Supports two design variants:
 * - Background: Text overlay on background image (default)
 * - Side-by-side: Image and text side by side
 *
 * Variants:
 * - teaser - Image as background with text overlay (default)
 * - teaser (image-left) - Image on left side with text on right
 * - teaser (image-right) - Image on right side with text on left
 *
 * Expected structure:
 * Row 1: Image
 * Row 2: Text content (includes preTitle, title, description)
 * Row 3: Link (optional CTA)
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Extract content from rows
  const imageRow = rows[0];
  const textRow = rows[1];
  const linkRow = rows[2];

  // Get image element
  const picture = imageRow?.querySelector('picture');
  const img = picture?.querySelector('img');

  if (!img) {
    // eslint-disable-next-line no-console
    console.warn('Teaser block: No image found');
    return;
  }

  // Get pretitle, title and description content
  const [preTitle, title, ...remainingText] = Array.from(textRow.firstElementChild.children);
  const description = remainingText.map(child => child.outerHTML).join('');

  // Get link if exists
  const link = linkRow?.querySelector('a');

  // Clear block content
  block.innerHTML = '';

  // Check if side-by-side variant (default is background)
  const isImageLeft = block.classList.contains('image-left');
  const isImageRight = block.classList.contains('image-right');
  const isSideBySide = isImageLeft || isImageRight;

  if (isSideBySide) {
    // Side-by-side design
    block.classList.add('teaser-sidebyside');

    if (isImageRight) {
      block.classList.add('image-right');
    }

    // Create image container
    const imageDiv = document.createElement('div');
    imageDiv.className = 'teaser-image';
    imageDiv.appendChild(picture);

    // Create text container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'teaser-content';

    // Pre-title
    if (preTitle) {
      const preTitleElement = document.createElement('div');
      preTitleElement.className = 'teaser-pretitle';
      preTitleElement.innerHTML = preTitle.outerHTML;
      contentDiv.appendChild(preTitleElement);
    }
    // Title (bold)
    const titleElement = document.createElement('div');
    titleElement.className = 'teaser-title';
    titleElement.innerHTML = title.outerHTML || '';
    contentDiv.appendChild(titleElement);

    // Description/subtitle
    if (description) {
      const descElement = document.createElement('div');
      descElement.className = 'teaser-description';
      descElement.innerHTML = description;
      contentDiv.appendChild(descElement);
    }

    if (link) {
      link.className = 'teaser-cta button primary';
      contentDiv.appendChild(link);
    }

    // Append in correct order based on image position
    if (isImageRight) {
      block.appendChild(contentDiv);
      block.appendChild(imageDiv);
    } else {
      block.appendChild(imageDiv);
      block.appendChild(contentDiv);
    }
  } else {
    // Background design (default)
    block.classList.add('teaser-background');

  //   // Create background container
    const backgroundDiv = document.createElement('div');
    backgroundDiv.className = 'teaser-background-image';
    backgroundDiv.style.backgroundImage = `url('${img.src}')`;

    // Transfer text position classes from block to block for CSS targeting
    ['text-left', 'text-right', 'text-center', 'text-top', 'text-bottom', 'text-middle'].forEach((posClass) => {
      if (block.classList.contains(posClass)) {
        block.classList.add(posClass);
      }
    });

    // Create content overlay
    const contentDiv = document.createElement('div');
    contentDiv.className = 'teaser-content';

    // Pre-title
    if (preTitle) {
      const preTitleElement = document.createElement('div');
      preTitleElement.className = 'teaser-pretitle';
      preTitleElement.innerHTML = preTitle.outerHTML;
      contentDiv.appendChild(preTitleElement);
    }

    // Title (bold)
    const titleElement = document.createElement('div');
    titleElement.className = 'teaser-title';
    titleElement.innerHTML = title.outerHTML || '';
    contentDiv.appendChild(titleElement);

    // Description/subtitle
    if (description) {
      const descElement = document.createElement('div');
      descElement.className = 'teaser-description';
      descElement.innerHTML = description;
      contentDiv.appendChild(descElement);
    }

    if (link) {
      link.className = 'teaser-cta button primary';
      contentDiv.appendChild(link);
    }

    block.appendChild(contentDiv);
    block.appendChild(backgroundDiv);
  }
}
