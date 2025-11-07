// Hero Slider functionality
(async function() {
  try {
    // Load site data
    const response = await fetch('data/site.json');
    const data = await response.json();
    
    const slider = document.getElementById('hero-slider');
    const indicatorsContainer = document.getElementById('slider-indicators');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    
    if (!slider || !data.heroSlides || data.heroSlides.length === 0) {
      console.warn('Slider or slides not found');
      return;
    }
    
    let currentSlide = 0;
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 seconds
    
    // Create slides
    data.heroSlides.forEach((slide, index) => {
      const slideElement = document.createElement('div');
      slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
      slideElement.setAttribute('role', 'tabpanel');
      slideElement.setAttribute('aria-label', `Slide ${index + 1}: ${slide.alt}`);
      slideElement.innerHTML = `
        <img src="${slide.src}" alt="${slide.alt}" class="w-full h-full object-cover">
      `;
      slider.appendChild(slideElement);
      
      // Log if image doesn't exist
      const img = slideElement.querySelector('img');
      img.onerror = function() {
        console.warn(`⚠️  WARN Missing image -> using placeholder at: ${slide.src}`);
      };
    });
    
    // Create indicators
    data.heroSlides.forEach((slide, index) => {
      const indicator = document.createElement('button');
      indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
      indicator.setAttribute('role', 'tab');
      indicator.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
      indicator.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
    
    const slides = slider.querySelectorAll('.slide');
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    
    // Show specific slide
    function goToSlide(n) {
      // Remove active class from all
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => {
        indicator.classList.remove('active');
        indicator.setAttribute('aria-selected', 'false');
      });
      
      // Add active class to current
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      indicators[currentSlide].classList.add('active');
      indicators[currentSlide].setAttribute('aria-selected', 'true');
      
      // Reset autoplay
      resetAutoplay();
    }
    
    // Next slide
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
      goToSlide(currentSlide - 1);
    }
    
    // Autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }
    
    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }
    
    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          prevSlide();
        }
      }
    }
    
    // Pause autoplay on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    
    // Pause autoplay when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
    
    // Start autoplay
    startAutoplay();
    
  } catch (error) {
    console.error('Error initializing slider:', error);
  }
})();
