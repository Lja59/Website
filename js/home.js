function renderFeatured() {
      const grid = document.getElementById('featured-grid');
      if (!grid || !window.PRODUCTS) return;

      const featured = Object.entries(window.PRODUCTS)
        .filter(([, p]) => p.featured === true)
        .slice(0, 3); // maximum 3 cartes sur l'accueil

      if (featured.length === 0) {
        grid.style.display = 'none';
        return;
      }

      grid.innerHTML = featured.map(([id, p]) => {
        const thumb = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;

        const imgHtml = thumb
          ? `<img src="${thumb}" alt="${p.name}"
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
        const badgeHtml = p.badge ? `<span class="product-badge" ${badgeStyle}>${p.badge}</span>` : '';

        const categoryLabels = { fleurs : "Fleurs" };
        const catLabel = categoryLabels[p.category] || p.category;
        const tagClass = p.category === 'bijou' ? 'tag tag-orange' : 'tag';

        return `
          <a href="produit.html?id=${id}" class="product-card featured-card reveal"
             style="display:block; text-decoration:none; color:inherit;">
            <div class="product-img-wrap">
              ${imgHtml}
              ${badgeHtml}
            </div>
            <div class="product-info">
              <span class="${tagClass}">${catLabel}</span>
              <h3>${p.name}</h3>
              <div class="product-price">${p.price} €</div>
            </div>
          </a>`;
      }).join('');

      // Activer les animations reveal sur les nouvelles cartes
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.querySelectorAll('#featured-grid .reveal').forEach(el => {
            el.classList.add('visible');
          });
        });
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderFeatured();
    });

function handleNewsletter(e) {
    e.preventDefault();
    showToast('Merci ! Vous êtes maintenant inscrit·e 🌿');
    e.target.reset();
}

function initTicker() {
  const track = document.getElementById("tickerTrack");

  if (!track) return;

  const items = [
    "Fait main avec amour ✦",
    "Des Mains en Or ✦",
    "Pièces uniques ✦",
    "Artisanat français ✦"
  ];

  // Remplissage initial
  while (track.scrollWidth < window.innerWidth * 2) {
    items.forEach(text => {
      const span = document.createElement("span");
      span.className = "ticker-item";
      span.textContent = text;
      track.appendChild(span);
    });
  }

  let position = 0;
  const speed = 0.25; // pixels/frame

  function animate() {
    position -= speed;
    track.style.transform = `translateX(${position}px)`;

    const first = track.firstElementChild;

    if (first) {
      const firstWidth = first.offsetWidth;

      if (-position >= firstWidth) {
        position += firstWidth;
        track.appendChild(first);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

document.addEventListener("DOMContentLoaded", () => {
  initTicker();
});