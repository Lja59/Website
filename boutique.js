/* ===========================
   BOUTIQUE — boutique.js
   Filtres, tri, panier latéral
   =========================== */

// === FILTRES CATÉGORIES ===
function filterProducts(category, btn) {
  // Mettre à jour les chips actifs
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.shop-card');
  let count = 0;

  cards.forEach(card => {
    const cat = card.dataset.category;
    const match = category === 'tous' || cat === category;
    card.classList.toggle('hidden', !match);
    if (match) count++;
  });

  document.getElementById('count').textContent = count;
}

// === TRI ===
function sortProducts(value) {
  const grid = document.getElementById('products-grid');
  const cards = Array.from(grid.querySelectorAll('.shop-card'));

  cards.sort((a, b) => {
    const pa = parseFloat(a.dataset.price);
    const pb = parseFloat(b.dataset.price);
    if (value === 'prix-asc') return pa - pb;
    if (value === 'prix-desc') return pb - pa;
    return 0;
  });

  cards.forEach(card => grid.appendChild(card));
}

// === PANIER LATÉRAL ===
function toggleCart(e) {
  e?.preventDefault();
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  const isOpen = sidebar.classList.contains('open');

  if (isOpen) {
    closeCart();
  } else {
    openCart();
  }
}

function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Votre panier est vide.</p>
        <p style="margin-top:0.5rem; font-size:0.8rem;">Ajoutez vos créations préférées !</p>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';

  const icons = ['🌿', '✨', '🧵', '🎁', '💛', '🌸', '🍂', '🕯️'];
  
  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-icon">${icons[index % icons.length]}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} €</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cart-total-price').textContent = total.toFixed(2) + ' €';
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    const idx = cart.indexOf(item);
    cart.splice(idx, 1);
  }

  saveCart(cart);
  renderCart();
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) return;
  showToast('Fonctionnalité de paiement à intégrer 🚧');
}

// Wishlist
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  });
});

// Ouvrir panier depuis nav
document.querySelectorAll('[onclick="toggleCart(event)"]').forEach(el => {
  el.addEventListener('click', toggleCart);
});