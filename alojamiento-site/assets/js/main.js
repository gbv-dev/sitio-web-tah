// Main JavaScript for site-wide functionality

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll to #contacto
  const contactLinks = document.querySelectorAll('a[href="#contacto"]');
  contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Lazy loading images
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Add fade-in animation to sections on scroll
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Console welcome message
  console.log('%c🏨 Alojamiento Site', 'font-size: 20px; font-weight: bold; color: #2563eb;');
  console.log('%cSitio generado con HTML + Tailwind CDN + Vanilla JS', 'font-size: 12px; color: #6b7280;');
  console.log('%cPara editar contenido, modifica data/site.json', 'font-size: 12px; color: #6b7280;');
  
  // Log any missing images
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      if (!this.dataset.errorLogged) {
        console.warn(`⚠️  WARN Missing image -> using placeholder at: ${this.src}`);
        this.dataset.errorLogged = 'true';
      }
    });
  });
});

// Handle external links (open in new tab)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.href && !link.href.startsWith(window.location.origin) && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:') && !link.href.startsWith('#')) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
});

// Back to top functionality (optional)
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Could add back-to-top button here if needed
  // Example: show button when scrolled > 300px
});

// Performance monitoring (optional, for development)
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;
      
      console.log('%c⚡ Performance Metrics', 'font-weight: bold; color: #10b981;');
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`Server Response Time: ${connectTime}ms`);
      console.log(`DOM Render Time: ${renderTime}ms`);
    }, 0);
  });
}

// Accessibility: Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Saltar al contenido principal';
skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2';
skipLink.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;';
skipLink.addEventListener('focus', function() {
  this.style.cssText = 'position: absolute; top: 0; left: 0; z-index: 9999; background: #2563eb; color: white; padding: 0.5rem 1rem;';
});
skipLink.addEventListener('blur', function() {
  this.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Module Carousels functionality
(async function() {
  try {
    const response = await fetch('data/site.json');
    const data = await response.json();
    
    // Initialize carousels for each module
    const modules = ['location', 'amenities', 'around'];
    const moduleStates = {};
    
    modules.forEach(moduleName => {
      const moduleData = data.sections[moduleName];
      if (!moduleData || !moduleData.images) return;
      
      const carousel = document.getElementById(`${moduleName}-carousel`);
      const indicators = document.getElementById(`${moduleName}-indicators`);
      
      if (!carousel || !indicators) return;
      
      // Initialize state
      moduleStates[moduleName] = { currentIndex: 0 };
      
      // Create slides
      moduleData.images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `absolute inset-0 transition-opacity duration-500 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
        slide.innerHTML = `<img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover">`;
        carousel.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('button');
        indicator.className = `w-2 h-2 rounded-full transition-all ${index === 0 ? 'bg-white scale-125' : 'bg-white/50'}`;
        indicator.addEventListener('click', () => goToSlide(moduleName, index));
        indicators.appendChild(indicator);
      });
      
      // Navigation functions
      function goToSlide(module, index) {
        const state = moduleStates[module];
        const moduleCarousel = document.getElementById(`${module}-carousel`);
        const moduleIndicators = document.getElementById(`${module}-indicators`);
        
        const slides = moduleCarousel.querySelectorAll('div');
        const dots = moduleIndicators.querySelectorAll('button');
        
        // Hide current
        slides[state.currentIndex].classList.remove('opacity-100');
        slides[state.currentIndex].classList.add('opacity-0');
        dots[state.currentIndex].classList.remove('bg-white', 'scale-125');
        dots[state.currentIndex].classList.add('bg-white/50');
        
        // Show new
        state.currentIndex = (index + slides.length) % slides.length;
        slides[state.currentIndex].classList.remove('opacity-0');
        slides[state.currentIndex].classList.add('opacity-100');
        dots[state.currentIndex].classList.remove('bg-white/50');
        dots[state.currentIndex].classList.add('bg-white', 'scale-125');
      }
      
      // Button event listeners
      const prevBtn = document.querySelector(`.module-prev[data-module="${moduleName}"]`);
      const nextBtn = document.querySelector(`.module-next[data-module="${moduleName}"]`);
      
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          goToSlide(moduleName, moduleStates[moduleName].currentIndex - 1);
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          goToSlide(moduleName, moduleStates[moduleName].currentIndex + 1);
        });
      }
      
      // Update text content
      document.getElementById(`${moduleName}-title`).textContent = moduleData.title;
      document.getElementById(`${moduleName}-text`).textContent = moduleData.text;
    });
    
  } catch (error) {
    console.error('Error loading module carousels:', error);
  }
})();
