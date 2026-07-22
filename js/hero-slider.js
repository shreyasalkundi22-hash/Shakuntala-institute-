/* ==========================================================================
   Full-Screen Hero Slider Engine - Arrow Buttons, Keyboard, Swipe, Mouse Drag & Auto-play
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const sliderSection = document.querySelector('.hero-slider-section');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-dot');
  const prevBtn = document.querySelector('.slider-arrow-prev');
  const nextBtn = document.querySelector('.slider-arrow-next');
  const counterCurrent = document.getElementById('slideCounterCurrent');

  if (!sliderSection || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;
  const autoPlayInterval = 5000; // 5 seconds

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    if (counterCurrent) {
      counterCurrent.innerText = `0${index + 1}`;
    }

    currentIndex = index;
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, autoPlayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Arrow Button Listeners (Left ← and Right →)
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startAutoplay();
    });
  }

  // Dot Navigation Listeners
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      startAutoplay();
    });
  });

  // Keyboard Navigation (Left / Right Arrow Keys)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoplay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoplay();
    }
  });

  // Pause on Mouse Hover / Touch Interaction
  sliderSection.addEventListener('mouseenter', stopAutoplay);
  sliderSection.addEventListener('mouseleave', startAutoplay);

  // Mobile Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  sliderSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoplay();
    }
  }

  // Desktop Mouse Drag
  let isDragging = false;
  let dragStartX = 0;

  sliderSection.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
  });

  sliderSection.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoplay();
    }
  });

  sliderSection.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  // Initialize Slider
  goToSlide(0);
  startAutoplay();
});
