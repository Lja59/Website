/* ============================================================
   COMPONENTS.JS — O'Pays des Merveilles
   Injecte Nav, Footer et Menu Mobile dans chaque page.
   ➜ Zéro duplication HTML entre les pages.

   UTILISATION :
   Appeler initComponents() après DOMContentLoaded,
   ou inclure ce fichier : il s'auto-initialise.
   ============================================================ */

/* ---- CONFIGURATION CENTRALE -------------------------------- */
const SITE = {
  name:       "O'Pays des Merveilles",
  tagline:    "Des Mains en Or",
  email:      "contact@opaysdesmerveilles.fr",
  url:        "https://opaysdesmerveilles.fr",
  instagram:  "https://www.instagram.com/o__pays_des_merveilles?igsh=MXg1M3dvbzJwbmDmYg==",
  facebook:   "https://www.facebook.com/people/OPays_des_Merveilles/100092210655851/#",
  vinted:     "https://www.vinted.fr/member/288520000-newdyy",
  logo:       "../image/identity/logo.jpg",
  year:       new Date().getFullYear(),
};

/* ---- UTILITAIRE : page courante ---------------------------- */
function currentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

/* ---- NAVIGATION -------------------------------------------- */
function renderNav() {
  const page = currentPage();

  /* Lien panier — sur boutique.html et produit.html : ouvre le sidebar */
  const cartHref    = (page === 'boutique.html' || page === 'produit.html')
    ? '#'
    : 'boutique.html';
  const cartOnClick = (page === 'boutique.html' || page === 'produit.html')
    ? ' onclick="toggleCart(event)"'
    : '';

  const links = [
    { href: 'index.html',    label: 'Accueil'   },
    { href: 'boutique.html', label: 'Boutique'  },
    { href: 'about.html',    label: 'À propos'  },
  ];

  const liItems = links.map(l => `
    <li><a href="${l.href}"${l.href === page ? ' class="active"' : ''}>${l.label}</a></li>
  `).join('');

  const nav = document.createElement('nav');
  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <img src="${SITE.logo}" alt="${SITE.name}" />
      <div class="nav-logo-text">O'Pays des<br>Merveilles</div>
    </a>
    <ul class="nav-links">
      ${liItems}
      <li>
        <a href="${cartHref}" class="nav-cta"${cartOnClick}>
          Panier <span class="cart-count">0</span>
        </a>
      </li>
    </ul>
    <button class="nav-hamburger" aria-label="Ouvrir le menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  `;
  document.body.prepend(nav);
}

/* ---- FOOTER ------------------------------------------------ */
function renderFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="${SITE.logo}" alt="${SITE.name}" />
        <div class="nav-logo-text footer-brand-name">${SITE.name}</div>
        <p>Des créations artisanales faites main, avec passion et authenticité. Chaque pièce est unique, comme vous.</p>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="index.html">Accueil</a></li>
          <li><a href="boutique.html">Boutique</a></li>
          <li><a href="about.html">À propos</a></li>
          <li><a href="about.html#contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Infos</h4>
        <ul>
          <li><a href="livraison.html">Livraison & retours</a></li>
          <li><a href="mentions-legales.html">Mentions légales</a></li>
          <li><a href="cgv.html">CGV</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${SITE.year} ${SITE.name} — ${SITE.tagline}</span>
      <span>Fait avec ❤️ en France</span>
    </div>
  `;

  /* Insérer avant les scripts (avant le dernier <script>) */
  const scripts = document.querySelectorAll('body > script');
  if (scripts.length > 0) {
    document.body.insertBefore(footer, scripts[0]);
  } else {
    document.body.appendChild(footer);
  }
}

/* ---- MENU MOBILE ------------------------------------------ */
function renderMobileMenu() {
  const page = currentPage();

  const cartOnClick = (page === 'boutique.html' || page === 'produit.html')
    ? `onclick="if(typeof toggleCart==='function'){toggleCart(event);closeMobileMenu();}"`
    : '';
  const cartHref = (page === 'boutique.html' || page === 'produit.html')
    ? '#'
    : 'boutique.html';

  const overlay = document.createElement('div');
  overlay.className    = 'mobile-menu-overlay';
  overlay.id           = 'mobileMenuOverlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="mobile-menu-panel">
      <button class="mobile-menu-close" aria-label="Fermer le menu">&times;</button>
      <nav class="mobile-menu-nav">
        <a href="index.html">Accueil</a>
        <a href="boutique.html">Boutique</a>
        <a href="about.html">À propos</a>
        <a href="about.html#contact">Contact</a>
      </nav>
      <a href="${cartHref}" class="mobile-menu-cta" ${cartOnClick}>
        Panier <span class="cart-count mobile-cart-count">0</span>
      </a>
    </div>
  `;
  document.body.appendChild(overlay);
}

/* ---- PANIER LATÉRAL HTML (boutique + produit) ------------- */
function renderCartSidebarHtml() {
  const page = currentPage();
  if (page !== 'boutique.html' && page !== 'produit.html') return;

  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id        = 'cart-overlay';
  overlay.setAttribute('onclick', 'closeCart()');

  const sidebar = document.createElement('aside');
  sidebar.className = 'cart-sidebar';
  sidebar.id        = 'cart-sidebar';
  sidebar.innerHTML = `
    <div class="cart-header">
      <h2>🛒 Mon panier</h2>
      <button class="cart-close" onclick="closeCart()">✕</button>
    </div>
    <div class="cart-items" id="cart-items"></div>
    <div class="cart-footer" id="cart-footer" style="display:none;">
      <div class="cart-total">
        <span>Total estimé</span>
        <strong id="cart-total-price">0 €</strong>
      </div>
      <button class="btn btn-orange" style="width:100%; justify-content:center;" onclick="sendOrderByMail()">
        ✉️ Envoyer ma demande de commande
      </button>
      <p class="cart-note">
        Votre messagerie s'ouvrira avec le détail de votre commande déjà rédigé, prêt à envoyer.
      </p>
    </div>
  `;

  document.body.insertBefore(overlay, document.querySelector('footer'));
  document.body.insertBefore(sidebar, document.querySelector('footer'));
}

/* ---- POINT D'ENTRÉE --------------------------------------- */
function initComponents() {
  renderNav();
  renderFooter();
  renderMobileMenu();
  renderCartSidebarHtml();
}

document.addEventListener('DOMContentLoaded', initComponents);
