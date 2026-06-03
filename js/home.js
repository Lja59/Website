/* ============================================================
   HOME.JS — O'Pays des Merveilles
   Page d'accueil uniquement.
   Dépendances : products.js → components.js → main.js → home.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  initTicker();
});

/* ============================================================
   SECTION COUP DE CŒUR (produits featured)
   ============================================================ */
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid || !window.PRODUCTS) return;

  const featured = Object.entries(window.PRODUCTS)
    .filter(([, p]) => p.featured === true)
    .slice(0, 3);

  if (featured.length === 0) {
    grid.style.display = 'none';
    return;
  }

  grid.innerHTML = featured.map(([id, p]) => {
    const thumb = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;

    const imgHtml = thumb
      ? `<img src="${thumb}" alt="${escHtml(p.name)}"
             style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;"
             onerror="this.style.display='none';this.nextSibling.style.display='flex';" />
         <div style="display:none;width:100%;height:100%;align-items:center;
              justify-content:center;font-size:3rem;background:linear-gradient(135deg,var(--vert-pale),var(--vert-menthe));">
           ${p.icon || '🌿'}
         </div>`
      : `<div style="width:100%;height:100%;display:flex;align-items:center;
              justify-content:center;font-size:3rem;background:linear-gradient(135deg,var(--vert-pale),var(--vert-menthe));">
           ${p.icon || '🌿'}
         </div>`;

    const badgeStyle = p.badgeColor ? `style="background:${p.badgeColor};"` : '';
    const badgeHtml  = p.badge ? `<span class="product-badge" ${badgeStyle}>${escHtml(p.badge)}</span>` : '';
    const catLabel   = getCategoryLabel(p.category);
    const tagClass   = p.category === 'bijou' ? 'tag tag-orange' : 'tag';

    return `
      <a href="produit.html?id=${id}" class="product-card featured-card reveal"
         style="display:block; text-decoration:none; color:inherit;">
        <div class="product-img-wrap">
          ${imgHtml}
          ${badgeHtml}
        </div>
        <div class="product-info">
          <span class="${tagClass}">${catLabel}</span>
          <h3>${escHtml(p.name)}</h3>
          <div class="product-price">${p.price} €</div>
        </div>
      </a>`;
  }).join('');

  /* Déclencher les animations reveal */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('#featured-grid .reveal').forEach(el => {
        el.classList.add('visible');
      });
    });
  });
}

/* ============================================================
   NEWSLETTER
   ============================================================ */
function handleNewsletter(e) {
  e.preventDefault();
  showToast('Merci ! Vous êtes maintenant inscrit·e 🌿');
  e.target.reset();
}
window.handleNewsletter = handleNewsletter;

/* ============================================================
   BANDEAU DÉFILANT (ticker)
   ============================================================ */
function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  const items = [
    'Fait main avec amour ✦',
    'Des Mains en Or ✦',
    'Pièces uniques ✦',
    'Artisanat français ✦',
  ];

  while (track.scrollWidth < window.innerWidth * 2) {
    items.forEach(text => {
      const span     = document.createElement('span');
      span.className = 'ticker-item';
      span.textContent = text;
      track.appendChild(span);
    });
  }

  let position = 0;
  const speed  = 0.25;

  function animate() {
    position -= speed;
    track.style.transform = `translateX(${position}px)`;
    const first = track.firstElementChild;
    if (first && -position >= first.offsetWidth) {
      position += first.offsetWidth;
      track.appendChild(first);
    }
    requestAnimationFrame(animate);
  }

  animate();
}
