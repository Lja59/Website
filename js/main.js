/* ============================================================
   O'PAYS DES MERVEILLES — main.js
   Partagé par toutes les pages.
   Dépendances : products.js chargé avant ce fichier.
   ============================================================ */

/* ============================================================
   UTILITAIRE SÉCURITÉ — échappe les chaînes avant injection innerHTML
   ============================================================ */
function escHtml(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(String(str)));
  return d.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {

  const cursor   = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches ||
    'ontouchstart' in window;

  if (isTouchDevice) {
    cursor?.remove();
    follower?.remove();
  }
  else if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let fX = 0, fY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.transform =
        `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    (function animateFollower() {
      fX += (mouseX - fX) * 0.1;
      fY += (mouseY - fY) * 0.1;

      follower.style.transform =
        `translate(${fX}px, ${fY}px) translate(-50%,-50%)`;

      requestAnimationFrame(animateFollower);
    })();

    document.querySelectorAll(
      'a, button, .product-card, .shop-card, .related-card'
    ).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.background = 'var(--vert-moyen)';
        follower.style.opacity = '0.2';
      });

      el.addEventListener('mouseleave', () => {
        cursor.style.background = 'var(--orange-terre)';
        follower.style.opacity = '0.6';
      });
    });
  }

  // === NAV SCROLL ===
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  });

  // === REVEAL SCROLL ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Exposer l'observer pour les éléments injectés dynamiquement (ex: boutique.js)
  window.revealObserver = observer;

  // === LIEN ACTIF NAV ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  // === COMPTEUR PANIER ===
  updateCartCount();
});


/* ============================================================
   PANIER — clé unique = "id|variantKey"
   Exemple : "p2|couleur:terracotta" ou "p1|taille:medium"
   Produit sans variante sélectionnée : "p1|"
   ============================================================ */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('opays_cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('opays_cart', JSON.stringify(cart));
  updateCartCount();
}

/**
 * Construit une clé unique pour un item panier.
 * variants = objet { type: value, ... } ex: { couleur: 'terracotta', taille: 'medium' }
 */
function buildCartKey(productId, variants) {
  if (!variants || Object.keys(variants).length === 0) return `${productId}|`;
  const varStr = Object.entries(variants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join(',');
  return `${productId}|${varStr}`;
}

/**
 * Calcule le prix final en tenant compte des majorations de variantes.
 */
function computePrice(productId, selectedVariants) {
  const product = window.PRODUCTS?.[productId];
  if (!product) return 0;
  let price = product.price;
  if (product.variants && selectedVariants) {
    product.variants.forEach(varGroup => {
      const selectedVal = selectedVariants[varGroup.type];
      if (selectedVal) {
        const opt = varGroup.options.find(o => o.value === selectedVal);
        if (opt?.priceExtra) price += opt.priceExtra;
      }
    });
  }
  return price;
}

/**
 * Formate l'affichage des variantes sélectionnées pour le panier.
 */
function formatVariantLabel(productId, selectedVariants) {
  if (!selectedVariants || Object.keys(selectedVariants).length === 0) return '';
  const product = window.PRODUCTS?.[productId];
  if (!product?.variants) return '';
  return product.variants
    .filter(g => selectedVariants[g.type])
    .map(g => {
      const opt = g.options.find(o => o.value === selectedVariants[g.type]);
      return `${g.label} : ${opt?.label || selectedVariants[g.type]}`;
    })
    .join(' · ');
}

/**
 * Ajoute ou incrémente un article dans le panier.
 * @param {string} productId  ex: "p2"
 * @param {object} variants   ex: { couleur: 'terracotta' }
 * @param {number} qty        quantité à ajouter (défaut 1)
 */
function addToCart(productId, variants, qty = 1) {
  const product = window.PRODUCTS?.[productId];
  if (!product) return;

  const key   = buildCartKey(productId, variants);
  const price = computePrice(productId, variants);
  const cart  = getCart();
  const existing = cart.find(i => i.key === key);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      key,
      productId,
      name:    product.name,
      icon:    product.icon,
      price,
      variants: variants || {},
      variantLabel: formatVariantLabel(productId, variants),
      qty,
    });
  }

  saveCart(cart);
  showToast(`"${product.name}" ajouté au panier 🌿`);
  updateCartCount();
}

function updateCartCount() {
  const cart  = getCart();
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent    = total;
    el.style.display  = total > 0 ? 'flex' : 'none';
  });
}


/* ============================================================
   PANIER LATÉRAL (commun boutique + produit)
   ============================================================ */

function toggleCart(e) {
  e?.preventDefault();
  const sidebar = document.getElementById('cart-sidebar');
  if (!sidebar) return;
  sidebar.classList.contains('open') ? closeCart() : openCart();
}

function openCart() {
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartSidebar();
}

function closeCart() {
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartSidebar() {
  const cart      = getCart();
  const container = document.getElementById('cart-items');
  const footer    = document.getElementById('cart-footer');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Votre panier est vide.</p>
        <p style="margin-top:.5rem;font-size:.8rem;">Explorez la boutique pour trouver votre bonheur !</p>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <div class="cart-item-icon">${item.icon || '🌿'}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${escHtml(item.name)}</div>
        ${item.variantLabel ? `<div class="cart-item-variant">${escHtml(item.variantLabel)}</div>` : ''}
        <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} €</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="sidebarChangeQty('${item.key}', -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="sidebarChangeQty('${item.key}', +1)">+</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalEl = document.getElementById('cart-total-price');
  if (totalEl) totalEl.textContent = total.toFixed(2) + ' €';
}

function sidebarChangeQty(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
  saveCart(cart);
  renderCartSidebar();
}


/* ============================================================
   ENVOI PAR MAIL
   ============================================================ */

function sendOrderByMail() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Votre panier est vide 🛒');
    return;
  }

  const to      = 'contact@opaysdesmerveilles.fr'; // ← votre adresse e-mail
  const subject = encodeURIComponent("Demande de commande — O'Pays des Merveilles");
  const total   = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const lines = cart.map(item => {
    const variant = item.variantLabel ? ` (${item.variantLabel})` : '';
    return `• ${item.name}${variant} × ${item.qty} = ${(item.price * item.qty).toFixed(2)} €`;
  }).join('\n');

  const body = encodeURIComponent(
`Bonjour,

Je souhaite commander les articles suivants :

${lines}

──────────────────────────
Total estimé : ${total.toFixed(2)} €
──────────────────────────

Mes coordonnées :
Prénom / Nom : 
Adresse de livraison complète : 
Code postal / Ville : 
Téléphone (optionnel) : 

Message complémentaire :
(Personnalisation, date souhaitée, instructions spéciales...)


Merci !`
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}


/* ============================================================
   TOAST
   ============================================================ */

function showToast(message) {
  document.querySelector('.toast')?.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position:    'fixed',
    bottom:      '2rem',
    left:        '50%',
    transform:   'translateX(-50%) translateY(20px)',
    background:  'var(--vert-fonce)',
    color:       'white',
    padding:     '0.9rem 2rem',
    borderRadius:'3rem',
    fontFamily:  'var(--font-corps)',
    fontSize:    '0.9rem',
    zIndex:      '9999',
    boxShadow:   '0 8px 30px rgba(0,0,0,0.2)',
    opacity:     '0',
    transition:  'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
    whiteSpace:  'nowrap',
    maxWidth:    '90vw',
    pointerEvents:'none',
  });
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}
