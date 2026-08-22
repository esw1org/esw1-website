// =========================================================
// Everything Starts With 1, shared site behavior
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initSearch();
  initSongAutoplay();
  initFormHandlers();
  initCarousel();
  initPortfolioTimeline();
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
   index of pages/sections. No backend required, fine for an
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

/* ---------- Tribute song, plays quietly in the background ----------
   NOTE: "Don't Laugh at Me" (Mark Wills) is commercially licensed
   music, so instead of hosting the audio file ourselves, we stream it
   from YouTube's own player in a hidden frame, with no visible widget or
   button. Browsers block audio with sound from starting before the
   visitor has interacted with the page at all, so this tries to start
   the moment the page loads, and if the browser blocks that, it starts
   silently on the visitor's very first click, scroll, or key press
   instead (no separate click needed, any normal use of the page
   triggers it). Swap SONG_ID for another official video ID if needed. */
const SONG_ID = 'FVjbo8dW9c8'; // Mark Wills, "Don't Laugh At Me" (Official Music Video)

function initSongAutoplay() {
  if (document.getElementById('esw1-song-frame')) return;

  const frame = document.createElement('iframe');
  frame.id = 'esw1-song-frame';
  frame.style.cssText = 'position:fixed;width:1px;height:1px;left:-9999px;bottom:0;border:0;';
  frame.allow = 'autoplay';
  frame.title = "Tyler's song";
  frame.src = `https://www.youtube.com/embed/${SONG_ID}?autoplay=1&loop=1&playlist=${SONG_ID}&controls=0`;
  document.body.appendChild(frame);

  let started = false;
  const startWithSound = () => {
    if (started) return;
    started = true;
    frame.src = `https://www.youtube.com/embed/${SONG_ID}?autoplay=1&loop=1&playlist=${SONG_ID}&controls=0&mute=0`;
    document.removeEventListener('click', startWithSound);
    document.removeEventListener('scroll', startWithSound);
    document.removeEventListener('keydown', startWithSound);
  };
  document.addEventListener('click', startWithSound, { once: true });
  document.addEventListener('scroll', startWithSound, { once: true, passive: true });
  document.addEventListener('keydown', startWithSound, { once: true });
}

/* ---------- Homepage photo carousel, auto-rotating ---------- */
function initCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  const track = carousel && carousel.querySelector('.carousel-track');
  const dotsWrap = document.querySelector('[data-carousel-dots]');
  if (!carousel || !track) return;
  const items = Array.from(track.children);
  if (items.length < 2) return;

  let index = 0;
  let timer = null;

  items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Show photo ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    index = (i + items.length) % items.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }

  function next() { goTo(index + 1); }

  function start() { timer = setInterval(next, 5000); }
  function stop() { clearInterval(timer); }

  start();
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
}

/* ---------- Speaking Portfolio scroll-stacking timeline ----------
   Each event card sticks near the top of the viewport as you scroll;
   as the next card arrives and starts covering it, the current card
   eases back (scales down, fades slightly) to keep focus on what's
   newest in view. */
function initPortfolioTimeline() {
  const events = Array.from(document.querySelectorAll('.portfolio-event'));
  if (events.length < 2) return;

  events.forEach((el, i) => { el.style.zIndex = i + 1; });

  let ticking = false;
  function update() {
    ticking = false;
    const stickTop = window.innerWidth <= 720 ? 76 : 110;
    events.forEach((el, i) => {
      const next = events[i + 1];
      if (!next) { el.style.transform = ''; el.style.opacity = ''; return; }
      const dist = next.getBoundingClientRect().top - stickTop;
      const progress = 1 - Math.min(Math.max(dist / window.innerHeight, 0), 1);
      el.style.transform = `scale(${1 - progress * 0.08})`;
      el.style.opacity = String(1 - progress * 0.92);
    });
  }
  function onScroll() {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

/* ---------- Form handlers ----------
   These forms currently point at a placeholder Formspree-style
   endpoint. Before launch, replace ENDPOINT with Tina's real form
   backend (see README.md, "Connecting the forms"). Until then,
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
