const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  if (glow && event.pointerType === 'mouse') {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
}, { passive: true });

// Portfolio category filters
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-grid .project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  portfolioCards.forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

// Accessible image preview and Binal Babariya gallery
const lightbox = document.querySelector('.portfolio-lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
const prevButton = lightbox?.querySelector('.gallery-prev');
const nextButton = lightbox?.querySelector('.gallery-next');

const binalGallery = [
  'binal 11.jpg',
  'binal 13.jpg',
  'binal 14.jpg',
  'binal 15.jpg',
  'binal 17 poster.jpg',
  'binal 18.jpg',
  'binal 19.jpg',
  'binal 27.jpg',
  'binal mauva_story.jpg',
  'binal story.jpg',
  'BINAL BABARIYA 2.jpg',
  'BINAL BABARIYA.jpg'
];

let galleryIndex = 0;
let isBinalGallery = false;

function showBinalImage() {
  const filename = binalGallery[galleryIndex];
  lightboxImage.src = encodeURI(filename);
  lightboxImage.alt = 'Binal Babariya portfolio image';
  lightboxCaption.textContent =
    `Binal Babariya — ${galleryIndex + 1} / ${binalGallery.length}`;
}

document.querySelectorAll('.portfolio-image').forEach(button => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;

    isBinalGallery = button.dataset.title.includes('Binal Babariya');

    if (isBinalGallery) {
      galleryIndex = 0;
      showBinalImage();
      prevButton.hidden = false;
      nextButton.hidden = false;
    } else {
      lightboxImage.src = button.dataset.full;
      lightboxImage.alt = button.querySelector('img')?.alt || '';
      lightboxCaption.textContent = button.dataset.title || '';
      prevButton.hidden = true;
      nextButton.hidden = true;
    }

    lightbox.showModal();
  });
});

prevButton?.addEventListener('click', () => {
  if (!isBinalGallery) return;
  galleryIndex = (galleryIndex - 1 + binalGallery.length) % binalGallery.length;
  showBinalImage();
});

nextButton?.addEventListener('click', () => {
  if (!isBinalGallery) return;
  galleryIndex = (galleryIndex + 1) % binalGallery.length;
  showBinalImage();
});

lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => {
  lightbox.close();
});

lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
