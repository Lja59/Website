function handleContact(e) {
      e.preventDefault();
      const form   = e.target;
      const name   = form.querySelector('[name="name"]')?.value   || form.querySelector('input[type="text"]')?.value  || '';
      const email  = form.querySelector('[name="email"]')?.value  || form.querySelector('input[type="email"]')?.value || '';
      const msg    = form.querySelector('[name="message"]')?.value || form.querySelector('textarea')?.value            || '';
      const to     = 'contact@opaysdesmerveilles.fr';
      const subj   = encodeURIComponent('Message depuis le site — O\'Pays des Merveilles');
      const body   = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\nMessage :\n${msg}`);
      window.location.href = `mailto:${to}?subject=${subj}&body=${body}`;
      showToast('Ouverture de votre messagerie… 🌿');
      form.reset();
    }

    function toggleFaq(btn) {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const arrow = btn.querySelector('.faq-arrow');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-answer').style.maxHeight = null;
        el.querySelector('.faq-arrow').textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        arrow.textContent = '−';
      }
    }
window.handleContact = handleContact;
window.toggleFaq = toggleFaq;
