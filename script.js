// Slider (services seulement)
const container = document.querySelector('.slider-container');
if (container) {
  const slides = Array.from(container.querySelectorAll('.slide'));
  let index = 0;

  // Cache positions au init
  const slidePositions = slides.map(slide => ({
    left: slide.offsetLeft,
    width: slide.clientWidth
  }));

  function goTo(i) {
    index = Math.max(0, Math.min(i, slides.length - 1));
    slides[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  // Boutons seulement si existent
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

  // Scroll synchro optimisée
  function updateIndexFromScroll() {
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    slidePositions.forEach((pos, i) => {
      const dist = Math.abs(center - (pos.left + pos.width / 2));
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    index = closest;
  }
  container.addEventListener('scroll', () => window.requestAnimationFrame(updateIndexFromScroll));
}


// FAQ (toutes pages avec FAQ)
document.querySelectorAll('.faq-question').forEach(q => {
  const answer = q.nextElementSibling;
  q.addEventListener('click', () => {
    const isActive = answer.classList.contains('active');
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
    if (!isActive) answer.classList.add('active');
  });
});

// Année (toutes pages)
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
