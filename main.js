// =========================================================
// Everything Starts With 1 — shared site behavior
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initSearch();
  initSongWidget();
  initFormHandlers();
});

/* ---------- Mobile nav ---------- */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
}

/* ---------- Site search ----------
   Lightweight client-side search across a small hand-authored
   index of pages/sections. No backend required — fine for an
   ~8 page site. Update SITE_INDEX below when pages/content change. */
const SITE_INDEX = [
  { title: 'Home', url: 'index.html', desc: "ESW1's mission and Tyler's story at a glance." },
  { title: "Tyler's Story", url: 'tylers-story.html', desc: "Tyler's life, his autism, bullycide, and the family's advocacy since." },
  { title: 'Book a Speaking Event', url: 'book-a-speaking-event.html', desc: 'Invite Tina to speak at your school, district, or organization.' },
  { title: 'Resources', url: 'resources.html', desc: 'Guides for parents, students, and educators (updating soon).' },
  { title: 'Media', url: 'media.html', desc: 'The Bully documentary, press appearances, and photos.' },
  { title: 'Speaking Portfolio', url: 'blog.html', desc: "A running record of Tina's talks and appearances." },
  { title: 'Donate', url: 'donate.html', desc: 'Support the mission of Everything Starts With 1.' },
  { title: 'Contact', url: 'contact.html', desc: 'Get in touch with ESW1.' },
  { title: '988 Suicide & Crisis Lifeline', url: 'tylers-story.html#help', desc: 'Call or text 988 anytime for support.' },
  { title: 'Bullycide', url: 'tylers-story.html', desc: 'Understanding bullycide and why the term matters.' },
  { title: 'Autism and bullying', url: 'tylers-story.html', desc: "Tyler was high-functioning autistic; how that shaped his story." },
  { title: "Where We've Been", url: 'book-a-speaking-event.html#where-weve-been', desc: 'Media appearances, schools, conferences, and film festivals ESW1 has been part of.' },
  { title: 'The ESW1 Solution', url: 'index.html', desc: 'ESW1 Assembly, ESW1 Project, and ESW1 Guides.' },
  { title: 'Press Coverage', url: 'media.html', desc: 'Ellen, 20/20, GLAAD Gala, and other press coverage of ESW1.' },
  { title: 'TIPS Prevention Platform', url: 'resources.html', desc: 'A confidential reporting tool for schools, from Awareity.' },
  { title: 'Child Helplines', url: 'resources.html', desc: '121help.me and the North American Alliance of Child Helplines.' },
];

function initSearch() {
  const toggle = document.querySelector('.search-toggle');
  const panel = document.querySelector('.search-panel');
  const input = document.querySelector('.search-input');
  const results = document.querySelector('.search-results');
  if (!toggle || !panel || !input || !results) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      input.focus();
      renderResults('');
    }
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== toggle) {
      panel.classList.remove('open');
    }
  });

  input.addEventListener('input', () => renderResults(input.value));

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    const matches = q === ''
      ? SITE_INDEX
      : SITE_INDEX.filter(item =>
          item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q));

    if (matches.length === 0) {
      results.innerHTML = '<div class="search-empty">No matches. Try “Tyler,” “speaking,” or “988.”</div>';
      return;
    }
    results.innerHTML = matches.map(m => `
      <a href="${m.url}">
        <div class="result-title">${m.title}</div>
        <div class="result-desc">${m.desc}</div>
      </a>
    `).join('');
  }
}

/* ---------- Tribute song widget ----------
   NOTE: "Don't Laugh at Me" (Mark Wills) is commercially licensed
   music — we link out to an official streaming source rather than
   hosting/serving the audio file ourselves. True autoplay-with-sound
   isn't possible in modern browsers, so this starts playback on the
   visitor's first interaction with the page (click/scroll/keypress),
   which reads as automatic in practice. Swap SONG_URL for the
   official/approved link once Tina confirms it. */
const SONG_URL = 'https://www.youtube.com/watch?v=FVjbo8dW9c8'; // Mark Wills — "Don't Laugh At Me" (Official Music Video)

function initSongWidget() {
  const widgets = document.querySelectorAll('[data-song-widget]');
  if (!widgets.length) return;

  let hasTriggered = false;
  const triggerAutoOpen = () => {
    if (hasTriggered) return;
    hasTriggered = true;
    widgets.forEach(w => w.classList.add('is-ready'));
    document.removeEventListener('click', triggerAutoOpen);
    document.removeEventListener('scroll', triggerAutoOpen);
    document.removeEventListener('keydown', triggerAutoOpen);
  };
  document.addEventListener('click', triggerAutoOpen, { once: true });
  document.addEventListener('scroll', triggerAutoOpen, { once: true, passive: true });
  document.addEventListener('keydown', triggerAutoOpen, { once: true });

  widgets.forEach(widget => {
    const btn = widget.querySelector('.song-play');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.open(SONG_URL, '_blank', 'noopener');
    });
  });
}

/* ---------- Form handlers ----------
   These forms currently point at a placeholder Formspree-style
   endpoint. Before launch, replace ENDPOINT with Tina's real form
   backend (see README.md — "Connecting the forms"). Until then,
   submissions show a friendly confirmation but are NOT delivered
   anywhere. */
function initFormHandlers() {
  document.querySelectorAll('form[data-esw1-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successBox = form.parentElement.querySelector('.form-success');
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  });
}
