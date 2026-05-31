/* ============================================================
   PRODUIT.JS
   Page détail produit.
   - Galerie : thumbnails à gauche, grande image à droite (Amazon)
   - Variantes visuelles : changement d'images + description au clic
   - Variantes simples : changement de prix seulement
   Dépend de : products.js (window.PRODUCTS), main.js
   ============================================================ */


/* === getCategoryLabel — définie localement pour fiabilité === */
function getCategoryLabel(cat) {
  const labels = { fleurs: "Fleurs" };
  return labels[cat] || cat;
}
document.addEventListener('DOMContentLoaded', () => {
  const id      = new URLSearchParams(window.location.search).get('id');
  const product = window.PRODUCTS?.[id];

  if (!id || !product) {
    document.body.innerHTML = `
      <div style="text-align:center;padding:8rem 2rem;font-family:sans-serif;">
        <p style="font-size:1.2rem;color:#5a5a5a;">Produit introuvable.</p>
        <a href="boutique.html" style="color:#2C5F2E;text-decoration:underline;margin-top:1rem;display:inline-block;">
          ← Retour à la boutique
        </a>
      </div>`;
    return;
  }

  renderProductPage(id, product);
  updateCartCount();
});


/* ============================================================
   ÉTAT LOCAL
   ============================================================ */
let currentProductId = null;
let galleryImages    = [];   // images actuellement affichées
let galleryIndex     = 0;
let selectedVariants = {};   // { type: value }
let currentQty       = 1;


/* ============================================================
   RENDER PRINCIPAL
   ============================================================ */

function renderProductPage(id, product) {
  currentProductId = id;

  document.title = `${product.name} — O'Pays des Merveilles`;
  const bcName = document.getElementById('breadcrumb-name');
  if (bcName) bcName.textContent = product.name;

  setText('product-name',        product.name);
  setText('product-description', product.description);
  setText('tab-details-text',    product.tabs?.details   || '—');
  setText('tab-materiaux-text',  product.tabs?.materiaux || '—');
  setText('tab-entretien-text',  product.tabs?.entretien || '—');

  // Stock
  const stockNote = document.getElementById('stock-note');
  if (stockNote) {
    const map = {
      'in-stock': ['✅ En stock — expédition sous 2–3 jours', 'var(--vert-moyen)'],
      'low':      ['⚡ Stock limité — commandez vite !',       'var(--orange-terre)'],
    };
    const [html, color] = map[product.stock] || ['⏳ Sur commande — délai 1–3 semaines', 'var(--texte-leger)'];
    stockNote.innerHTML    = html;
    stockNote.style.color  = color;
  }

  // Tags
  const tagsRow = document.getElementById('product-tags-row');
  if (tagsRow) {
    tagsRow.innerHTML = `<span class="tag">${getCategoryLabel(product.category)}</span>`;
    if (product.badge) {
      const cls = product.badgeColor === 'orange' ? 'tag tag-orange' : 'tag';
      tagsRow.innerHTML += ` <span class="${cls}">${product.badge}</span>`;
    }
  }

  // Highlights
  const hl = document.getElementById('product-highlights');
  if (hl && product.highlights?.length) {
    hl.innerHTML = product.highlights
      .map(h => `<div class="highlight-item"><span>${h}</span></div>`)
      .join('');
  }

  // Galerie initiale (images par défaut du produit)
  loadGalleryImages(product.images || [], product.icon || '🌿');

  // Variantes
  selectedVariants = {};
  renderVariants(id, product);

  // Prix initial (après avoir pré-sélectionné les variantes)
  refreshPrice(id);

  // Quantité
  currentQty = 1;
  const qtyDisplay = document.getElementById('qty-display');
  if (qtyDisplay) qtyDisplay.textContent = '1';

  // Produits similaires
  renderRelated(id, product);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}


/* ============================================================
   GALERIE — style Amazon
   thumbnails verticaux à gauche, grande image à droite
   ============================================================ */

function loadGalleryImages(images, iconFallback) {
  galleryIndex  = 0;
  galleryImages = Array.isArray(images) && images.length > 0 ? images : [];

  const mainImg     = document.getElementById('gallery-img');
  const placeholder = document.getElementById('gallery-placeholder');
  const iconEl      = document.getElementById('gallery-icon');
  const thumbsCol   = document.getElementById('gallery-thumbs');

  if (iconEl) iconEl.textContent = iconFallback || '🌿';

  if (galleryImages.length === 0) {
    if (mainImg)     { mainImg.style.display = 'none'; }
    if (placeholder) { placeholder.style.display = 'flex'; }
    if (thumbsCol)   { thumbsCol.innerHTML = ''; }
    hideArrows();
    return;
  }

  // Charger la première image
  showMainImage(0, iconFallback);

  // Générer les thumbnails
  if (thumbsCol) {
    thumbsCol.innerHTML = galleryImages.map((src, i) => `
      <button class="gallery-thumb${i === 0 ? ' active' : ''}"
              onclick="showMainImage(${i})"
              aria-label="Photo ${i + 1}">
        <img src="${src}" alt="Photo ${i + 1}" loading="lazy"
             onerror="this.parentElement.innerHTML='<span style=font-size:1.4rem>${iconFallback || '🌿'}</span>'" />
      </button>
    `).join('');
  }

  // Flèches : seulement si > 1 image
  document.querySelectorAll('.gallery-arrow').forEach(a => {
    a.style.display = galleryImages.length > 1 ? 'flex' : 'none';
  });
}

function showMainImage(index) {
  if (index < 0 || index >= galleryImages.length) return;
  galleryIndex = index;

  const src         = galleryImages[index];
  const mainImg     = document.getElementById('gallery-img');
  const placeholder = document.getElementById('gallery-placeholder');
  if (!mainImg) return;

  mainImg.style.opacity = '0';

  const tmp = new Image();
  tmp.onload = () => {
    mainImg.src     = src;
    mainImg.style.display  = 'block';
    if (placeholder) placeholder.style.display = 'none';
    requestAnimationFrame(() => { mainImg.style.opacity = '1'; });
  };
  tmp.onerror = () => {
    mainImg.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  };
  tmp.src = src;

  // Sync thumbnails
  document.querySelectorAll('.gallery-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

function galleryNav(delta) {
  const next = (galleryIndex + delta + galleryImages.length) % galleryImages.length;
  showMainImage(next);
}

function hideArrows() {
  document.querySelectorAll('.gallery-arrow').forEach(a => a.style.display = 'none');
}


/* ============================================================
   VARIANTES
   ============================================================ */

function renderVariants(productId, product) {
  document.querySelectorAll('.variant-section-dynamic').forEach(el => el.remove());
  if (!product.variants?.length) return;

  const insertBefore = document.querySelector('.add-to-cart-row');
  const panel        = document.querySelector('.product-info-panel');
  if (!insertBefore || !panel) return;

  product.variants.forEach(varGroup => {
    const firstAvail = varGroup.options.find(o => !o.unavailable);
    if (firstAvail) {
      selectedVariants[varGroup.type] = firstAvail.value;
    }

    const isSwatch = varGroup.options.some(o => o.color || Array.isArray(o.colors));
    const section  = document.createElement('div');
    section.className = 'variant-section variant-section-dynamic';

    const optionsHtml = varGroup.options.map(opt => {
      const isActive    = opt.value === firstAvail?.value;
      const isUnavail   = !!opt.unavailable;
      const extra       = opt.priceExtra ? ` +${opt.priceExtra}€` : '';
      const activeClass = isActive  ? ' active'      : '';
      const uClass      = isUnavail ? ' unavailable' : '';

      if (isSwatch) {
        let background = opt.color || "#ccc";

        if (opt.colors?.length === 2) {
          background = `linear-gradient(
            to right,
            ${opt.colors[0]} 50%,
            ${opt.colors[1]} 50%
          )`;
        }

        return `<button
          class="swatch${activeClass}${uClass}"
          style="background:${background};"
          title="${opt.label}"
          data-type="${varGroup.type}"
          data-value="${opt.value}"
          data-label="${opt.label}"
          onclick="selectVariant('${varGroup.type}', '${opt.value}', '${opt.label}', this)"
          ${isUnavail ? 'disabled' : ''}
        ></button>`;
      } else {
        return `<button
          class="size-option${activeClass}${uClass}"
          data-type="${varGroup.type}"
          data-value="${opt.value}"
          data-label="${opt.label}"
          onclick="selectVariant('${varGroup.type}', '${opt.value}', '${opt.label}${extra}', this)"
          ${isUnavail ? 'disabled' : ''}
        >${opt.label}${extra}</button>`;
      }
    }).join('');

    section.innerHTML = `
      <div class="variant-label">
        ${varGroup.label} :
        <strong id="variant-selected-${varGroup.type}">
          ${firstAvail?.label || '—'}
        </strong>
      </div>
      <div class="${isSwatch ? 'variant-swatches' : 'variant-sizes'}">
        ${optionsHtml}
      </div>`;

    panel.insertBefore(section, insertBefore);
  });

  // Appliquer la première sélection (images + description)
  applyVisualVariant(productId, product);
}

/**
 * Quand une option est sélectionnée :
 * 1. Met à jour selectedVariants
 * 2. Si c'est une variante visuelle (visual:true), change les images et la description
 * 3. Met à jour le prix
 */
function selectVariant(type, value, label, btn) {
  if (btn.disabled || btn.classList.contains('unavailable')) return;

  selectedVariants[type] = value;

  // MAJ boutons du groupe
  btn.closest('.variant-swatches, .variant-sizes')
     ?.querySelectorAll('button')
     .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // MAJ label affiché
  const labelEl = document.getElementById(`variant-selected-${type}`);
  if (labelEl) labelEl.textContent = label;

  // MAJ visuels si variante visuelle
  const product = window.PRODUCTS?.[currentProductId];
  if (product) applyVisualVariant(currentProductId, product);

  // MAJ prix
  refreshPrice(currentProductId);
}

/**
 * Cherche la première variante marquée visual:true et dont une option est sélectionnée,
 * puis met à jour la galerie et la description avec les données de cette option.
 */
function applyVisualVariant(productId, product) {
  if (!product.variants) return;

  // Parcourir les groupes de variantes dans l'ordre
  for (const varGroup of product.variants) {
    if (!varGroup.visual) continue;

    const selectedValue = selectedVariants[varGroup.type];
    if (!selectedValue) continue;

    const opt = varGroup.options.find(o => o.value === selectedValue);
    if (!opt) continue;

    // Changer les images si l'option en a
    if (Array.isArray(opt.images) && opt.images.length > 0) {
      loadGalleryImages(opt.images, product.icon || '🌿');
    } else {
      // Pas d'images pour cette option → utiliser celles du produit
      loadGalleryImages(product.images || [], product.icon || '🌿');
    }

    // Changer la description si l'option en a une
    const descEl = document.getElementById('product-description');
    if (descEl) {
      descEl.textContent = opt.description || product.description;
    }

    // On s'arrête à la première variante visuelle trouvée
    // (si plusieurs variantes visuelles, seule la première contrôle les images)
    break;
  }
}

function refreshPrice(productId) {
  const price = computePrice(productId, selectedVariants);
  const el    = document.getElementById('product-price');
  if (el) el.textContent = price.toFixed(2) + ' €';
}


/* ============================================================
   QUANTITÉ
   ============================================================ */

function changeQtyDisplay(delta) {
  currentQty = Math.max(1, currentQty + delta);
  const display = document.getElementById('qty-display');
  if (display) display.textContent = currentQty;
}


/* ============================================================
   AJOUT AU PANIER
   ============================================================ */

function addCurrentToCart() {
  const product = window.PRODUCTS?.[currentProductId];
  if (!product) return;

  // Vérifier toutes les variantes obligatoires
  if (product.variants?.length) {
    for (const varGroup of product.variants) {
      if (!selectedVariants[varGroup.type]) {
        showToast(`Veuillez choisir : ${varGroup.label} 👆`);
        document.getElementById(`variant-selected-${varGroup.type}`)
                ?.closest('.variant-section-dynamic')
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
  }

  addToCart(currentProductId, { ...selectedVariants }, currentQty);
  openCart();
}


/* ============================================================
   ONGLETS
   ============================================================ */

function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(`tab-${tabId}`)?.classList.add('active');
}


/* ============================================================
   PRODUITS SIMILAIRES
   ============================================================ */

function renderRelated(currentId, product) {
  const grid = document.getElementById('related-grid');
  if (!grid || !window.PRODUCTS) return;

  const related = Object.entries(window.PRODUCTS)
    .filter(([id]) => id !== currentId)
    .sort((a, b) => (a[1].category === product.category ? 0 : 1) - (b[1].category === product.category ? 0 : 1))
    .slice(0, 4);

  if (related.length === 0) {
    document.querySelector('.related-products')?.setAttribute('style', 'display:none');
    return;
  }

  grid.innerHTML = related.map(([id, p]) => {
    const thumb = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;
    const imgHtml = thumb
      ? `<img src="${thumb}" alt="${p.name}"
             style="width:100%;height:100%;object-fit:cover;"
             onerror="this.style.display='none';this.nextSibling.style.display='flex';" />
         <span style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:2.5rem;">
           ${p.icon || '🌿'}
         </span>`
      : `<span style="font-size:2.5rem;">${p.icon || '🌿'}</span>`;

    return `
      <a href="produit.html?id=${id}" class="related-card">
        <div class="related-card-img"
             style="background:linear-gradient(135deg,var(--vert-pale),var(--vert-menthe));">
          ${imgHtml}
        </div>
        <div class="related-card-body">
          <span class="tag" style="font-size:.7rem;">${getCategoryLabel(p.category)}</span>
          <h4>${p.name}</h4>
          <div class="price">${p.price} €</div>
        </div>
      </a>`;
  }).join('');
}
