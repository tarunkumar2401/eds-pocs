export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const message = rows[0].children[0]?.innerHTML || '';

  block.innerHTML = `
    <div class="c-alert-banner" role="alert">
      <div class="c-alert-banner__wrapper l-container--fullwidth">
        <div class="c-alert-banner__wrapper__container">
          
          <div class="c-alert-banner__wrapper__container__text is-rtf">
            <p style="text-align:center;">${message}</p>
          </div>

          <div class="c-alert-banner__wrapper__container__close"
               role="button"
               tabindex="0"
               aria-label="Close Alert">
          </div>

        </div>
      </div>
    </div>
  `;

  const closeBtn = block.querySelector(
    '.c-alert-banner__wrapper__container__close',
  );

  closeBtn.addEventListener('click', () => {
    block.style.display = 'none';
  });

  closeBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      block.style.display = 'none';
    }
  });
}
