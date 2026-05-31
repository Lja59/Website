
/* =============================================================
   MENU MOBILE — hamburger, overlay, fermeture
   ============================================================= */
(function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay   = document.getElementById('mobileMenuOverlay');
  const panel     = overlay?.querySelector('.mobile-menu-panel');
  const closeBtn  = overlay?.querySelector('.mobile-menu-close');
  if (!hamburger || !overlay) return;

  // Marquer le lien actif dans le menu mobile
  const mobileLinks = overlay.querySelectorAll('.mobile-menu-nav a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  mobileLinks.forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  function openMenu() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  // Clic sur l'overlay (hors panel) → fermer
  overlay.addEventListener('click', (e) => {
    if (!panel?.contains(e.target)) closeMenu();
  });

  // Touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
  });

  // Sync compteur panier dans le menu mobile
  function syncMobileCartCount() {
    const mainCount  = document.querySelector('.nav-links .cart-count');
    const mobileCount = overlay.querySelector('.mobile-cart-count');
    if (mainCount && mobileCount) {
      mobileCount.textContent = mainCount.textContent;
      mobileCount.style.display = mainCount.style.display;
    }
  }

  // Observer les mutations du badge principal pour refléter dans le menu mobile
  const mainBadge = document.querySelector('.nav-links .cart-count');
  if (mainBadge && window.MutationObserver) {
    new MutationObserver(syncMobileCartCount).observe(mainBadge, {
      childList: true, characterData: true, subtree: true, attributes: true
    });
  }
  syncMobileCartCount();
})();
