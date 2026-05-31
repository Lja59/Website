/* ============================================================
   BOUTIQUE.JS
   Génère les cartes depuis PRODUCTS (products.js).
   Gère les filtres, le tri, et délègue le panier à main.js.
   ============================================================ */


/* === getCategoryLabel — définie localement pour fiabilité === */
function getCategoryLabel(cat) {
  const labels = { fleurs: 'Fleurs' };
  return labels[cat] || cat;
}
document.addEventListener('DOMContentLoaded', () => {
  renderShopGrid();
});


/* ============================================================
   GÉNÉRATION DE LA GRILLE
   ============================================================ */

function renderShopGrid() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  // Attendre que PRODUCTS soit disponible (sécurité)
  const products = window.PRODUCTS;
  if (!products || Object.keys(products).length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--texte-leger);padding:4rem;">
      Aucun produit disponible pour le moment.
    </p>`;
    return;
  }

  grid.innerHTML = Object.entries(products)
    .map(([id, product]) => buildCard(id, product))
    .join('');

  // Enregistrer les nouvelles cartes dans l'observer reveal
  if (window.revealObserver) {
    grid.querySelectorAll('.reveal').forEach(el => window.revealObserver.observe(el));
  } else {
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // Cartes cliquables → page produit
  grid.querySelectorAll('.shop-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button, a')) return;
      window.location.href = `produit.html?id=${card.dataset.id}`;
    });
  });

  // Wishlist
  grid.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    });
  });

  // Rétablir l'état panier depuis localStorage
  Object.keys(products).forEach(id => updateCardQtyUI(id));

  // Mettre à jour le compteur affiché
  const countEl = document.getElementById('count');
  if (countEl) countEl.textContent = Object.keys(products).length;
}

function buildCard(id, product) {
  const hasVariants = product.variants && product.variants.length > 0;

  const firstImage = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0] : null;

  const imgHtml = firstImage
    ? `<img src="${firstImage}" alt="${product.name}"
           style="width:100%;height:100%;object-fit:cover;display:block;"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
       <div class="product-img-placeholder" style="display:none;width:100%;height:100%;
            background:linear-gradient(135deg,var(--vert-pale),var(--vert-menthe));
            align-items:center;justify-content:center;font-size:3rem;">
         ${product.icon || '🌿'}
       </div>`
    : `<div class="product-img-placeholder" style="width:100%;height:100%;
           background:linear-gradient(135deg,var(--vert-pale),var(--vert-menthe));
           display:flex;align-items:center;justify-content:center;font-size:3rem;">
         ${product.icon || '🌿'}
       </div>`;

  const badgeStyle = product.badgeColor ? `style="background:${product.badgeColor};"` : '';
  const badgeHtml = product.badge ? `<span class="product-badge" ${badgeStyle}>${product.badge}</span>` : '';

  const stockClass = product.stock === 'in-stock' ? 'in-stock' : '';
  const stockLabel = product.stock === 'in-stock' ? 'En stock'
                   : product.stock === 'low'      ? 'Stock limité'
                   : 'Sur commande';

  const actionBtn = hasVariants
    ? `<a href="produit.html?id=${id}" class="btn-card-options" onclick="event.stopPropagation()">
        Choisir les options →
       </a>`
    : `<div class="quantity-control" data-id="${id}">
        <button class="qty-btn add-mode" onclick="event.stopPropagation(); quickAddToCart('${id}')">+</button>
       </div>`;

  const variantHint = hasVariants
    ? `<div class="product-variants-hint">${product.variants.map(v => v.label).join(' · ')}</div>`
    : '';

  return `
    <article class="product-card shop-card reveal"
             data-id="${id}"
             data-category="${product.category}"
             data-price="${product.price}">
      <div class="product-img-wrap">
        ${imgHtml}
        ${badgeHtml}
        <button class="wishlist-btn" title="Coup de cœur" onclick="event.stopPropagation()">♡</button>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <span class="tag">${getCategoryLabel(product.category)}</span>
          <span class="product-stock ${stockClass}">${stockLabel}</span>
        </div>
        <h3>${product.name}</h3>
        <p class="product-desc">${product.description.substring(0, 75)}…</p>
        ${variantHint}
        <div class="product-footer">
          <div class="product-price">${product.price} €</div>
          ${actionBtn}
        </div>
      </div>
    </article>`;
}


/* ============================================================
   AJOUT RAPIDE (produits SANS variante)
   ============================================================ */

function quickAddToCart(productId) {
  const product = window.PRODUCTS?.[productId];
  if (!product) return;
  if (product.variants && product.variants.length > 0) {
    window.location.href = `produit.html?id=${productId}`;
    return;
  }
  addToCart(productId, {});
  updateCardQtyUI(productId);
  openCart();
}

function updateCardQtyUI(id) {
  const product     = window.PRODUCTS?.[id];
  const hasVariants = product?.variants?.length > 0;
  if (hasVariants) return;

  const cart      = getCart();
  const cartItems = cart.filter(i => i.productId === id);
  const totalQty  = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const container = document.querySelector(`.quantity-control[data-id="${id}"]`);
  if (!container) return;

  if (totalQty === 0) {
    container.innerHTML = `
      <button class="qty-btn add-mode" onclick="event.stopPropagation(); quickAddToCart('${id}')">+</button>`;
  } else {
    container.innerHTML = `
      <button class="qty-btn active-mode" onclick="event.stopPropagation(); directChangeQty('${id}', -1)">−</button>
      <span class="qty-num">${totalQty}</span>
      <button class="qty-btn active-mode" onclick="event.stopPropagation(); directChangeQty('${id}', +1)">+</button>`;
  }
}

function directChangeQty(id, delta) {
  const cart = getCart();
  const key  = buildCartKey(id, {});
  const item = cart.find(i => i.key === key);

  if (!item && delta > 0) {
    addToCart(id, {});
  } else if (item) {
    item.qty += delta;
    if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
    saveCart(cart);
    if (delta > 0) showToast(`"${window.PRODUCTS[id]?.name}" ajouté au panier 🌿`);
  }
  updateCardQtyUI(id);
}


/* ============================================================
   FILTRES
   ============================================================ */

function filterProducts(category, btn) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  let count = 0;
  document.querySelectorAll('.shop-card').forEach(card => {
    const match = category === 'tous' || card.dataset.category === category;
    card.classList.toggle('hidden', !match);
    if (match) count++;
  });
  document.getElementById('count').textContent = count;
}


/* ============================================================
   TRI
   ============================================================ */

function sortProducts(value) {
  const grid  = document.getElementById('products-grid');
  const cards = Array.from(grid.querySelectorAll('.shop-card'));
  cards.sort((a, b) => {
    const pa = parseFloat(a.dataset.price);
    const pb = parseFloat(b.dataset.price);
    if (value === 'prix-asc')  return pa - pb;
    if (value === 'prix-desc') return pb - pa;
    return 0;
  });
  cards.forEach(card => grid.appendChild(card));
}

