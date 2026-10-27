(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => setTimeout(() => preloader?.classList.add('done'), reducedMotion ? 0 : 950));
  setTimeout(() => preloader?.classList.add('done'), 2600);

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealEls.forEach((el, i) => { el.style.transitionDelay = `${Math.min((i % 3) * 90, 180)}ms`; observer.observe(el); });
  } else revealEls.forEach(el => el.classList.add('visible'));

  const nav = document.querySelector('.nav-wrap');
  const menuButton = document.querySelector('.menu-toggle');
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('.desktop-nav a, .nav-cta').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('menu-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu');
  }));

  const ritualSteps = [...document.querySelectorAll('.ritual-step')];
  ritualSteps.forEach(step => step.addEventListener('click', () => {
    ritualSteps.forEach(item => {
      const active = item === step; item.classList.toggle('active', active);
      item.querySelector('.step-plus').textContent = active ? '−' : '+';
      item.setAttribute('aria-expanded', String(active));
    });
  }));

  const ritualDialog = document.getElementById('ritual-dialog');
  document.getElementById('ritual-open').addEventListener('click', () => ritualDialog.showModal());
  const noteDialog = document.getElementById('note-dialog');
  const notes = {
    morning: { category: 'THE SLOW LIFE · FIELD NOTE Nº 014', title: 'The luxury of an unplanned morning', body: 'There is a particular kind of calm that arrives when the day has not yet made demands of you. No alarms to race, no itinerary to obey. Just the first light moving across a wall, a warm cup held in both hands, and enough time to notice the birds outside. When you travel with Serein, we leave that first hour open on purpose. The most memorable part of a trip is often the thing you never planned.' },
    local: { category: 'LOCAL KNOWLEDGE · FIELD NOTE Nº 013', title: 'Ask the person who lives here', body: 'Skip the perfect list for a moment. Ask the baker where they go on their day off, the host which path they take at sunset, or the shopkeeper what is in season this week. Places become more than scenery when you meet them through the people who know them by heart. We share local recommendations as invitations, never instructions. Follow one if it feels right. Ignore the rest. That is the joy of being somewhere new.' },
    pack: { category: 'TRAVEL LIGHT · FIELD NOTE Nº 012', title: 'A gentler way to get away', body: 'Pack the comfortable shoes. Bring the book you have been meaning to finish. Leave a little room in your bag and a little more room in your plans. A slower trip is not about doing nothing; it is about choosing what matters while you are there. One long walk can be enough. One meal worth lingering over can become the story you tell for years. You do not have to see everything to feel that you have been somewhere.' }
  };
  document.querySelectorAll('[data-note]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); const note = notes[link.dataset.note]; if (!note) return;
    document.getElementById('note-category').textContent = note.category;
    document.getElementById('note-title').textContent = note.title;
    document.getElementById('note-body').textContent = note.body;
    noteDialog.showModal();
  }));
  document.querySelectorAll('.dialog-close').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog').close()));
  [ritualDialog, noteDialog].forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  }));
  document.querySelectorAll('.dialog-cta, .note-cta').forEach(link => link.addEventListener('click', () => link.closest('dialog').close()));

  const form = document.getElementById('inquiry-form');
  form.addEventListener('submit', event => {
    event.preventDefault(); const feedback = document.getElementById('form-feedback');
    if (!form.reportValidity()) return;
    const data = new FormData(form); const name = String(data.get('name')).trim();
    feedback.textContent = `Thank you, ${name}. Your idea of a getaway is a lovely place to start. This demo is not connected to a booking inbox yet.`;
    form.reset();
  });

  const signature = document.querySelector('.signature');
  if ('IntersectionObserver' in window) {
    const signatureObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      signature.classList.toggle('in-view', entry.isIntersecting);
    }), { threshold: 0.15 }); signatureObserver.observe(signature);
  }
})();
