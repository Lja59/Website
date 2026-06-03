/* ============================================================
   MOBILE-MENU.JS — O'Pays des Merveilles
   Gère l'ouverture/fermeture du menu mobile.
   Dépendance : components.js (injecte #mobileMenuOverlay).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay   = document.getElementById('mobileMenuOverlay');
  const closeBtn  = overlay?.querySelector('.mobile-menu-close');
  const panel     = overlay?.querySelector('.mobile-menu-panel');

  if (!hamburger || !overlay) return;

  /* --- Ouvrir --- */
  hamburger.addEventListener('click', openMobileMenu);

  /* --- Fermer via bouton × --- */
  closeBtn?.addEventListener('click', closeMobileMenu);

  /* --- Fermer via clic sur l'overlay (hors panel) --- */
  overlay.addEventListener('click', e => {
    if (!panel?.contains(e.target)) closeMobileMenu();
  });

  /* --- Fermer via Escape --- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });
});

function openMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay   = document.getElementById('mobileMenuOverlay');
  if (!overlay) return;

  hamburger?.classList.add('open');
  hamburger?.setAttribute('aria-expanded', 'true');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay   = document.getElementById('mobileMenuOverlay');
  if (!overlay) return;

  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

window.closeMobileMenu = closeMobileMenu;
