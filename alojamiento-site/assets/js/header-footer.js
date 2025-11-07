// Header and Footer injection and data population
(async function() {
  try {
    // Load site data
    const dataResponse = await fetch('data/site.json');
    const siteData = await dataResponse.json();
    
    // Load and inject header
    const headerResponse = await fetch('partials/header.html');
    const headerHTML = await headerResponse.text();
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = headerHTML;
      populateHeader(siteData);
    }
    
    // Load and inject footer
    const footerResponse = await fetch('partials/footer.html');
    const footerHTML = await footerResponse.text();
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = footerHTML;
      populateFooter(siteData);
    }
    
    // Set up navigation highlighting
    highlightActiveNav();
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Load and populate modules on index page
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
      populateModules(siteData);
    }
    
  } catch (error) {
    console.error('Error loading header/footer:', error);
  }
})();

// Populate header with site data
function populateHeader(data) {
  // Brand name
  const brandElements = document.querySelectorAll('#header-brand');
  brandElements.forEach(el => {
    if (el) el.textContent = data.brand;
  });
  
  // Booking links
  const bookingLinks = document.querySelectorAll('#header-booking-link, #header-booking-link-mobile');
  bookingLinks.forEach(link => {
    if (link) link.href = data.contact.bookingLink;
  });
}

// Populate footer with site data
function populateFooter(data) {
  // Brand name
  const brandElements = document.querySelectorAll('#footer-brand, #footer-brand-copy');
  brandElements.forEach(el => {
    if (el) el.textContent = data.brand;
  });
  
  // Contact information
  const addressEl = document.getElementById('footer-address');
  if (addressEl) addressEl.textContent = data.contact.address;
  
  const emailEl = document.getElementById('footer-email');
  if (emailEl) {
    emailEl.textContent = data.contact.email;
    emailEl.href = `mailto:${data.contact.email}`;
  }
  
  const phoneEl = document.getElementById('footer-phone');
  if (phoneEl) {
    phoneEl.textContent = data.contact.phone;
    phoneEl.href = `tel:${data.contact.phone.replace(/\s/g, '')}`;
  }
  
  // Booking link
  const bookingLink = document.getElementById('footer-booking-link');
  if (bookingLink) bookingLink.href = data.contact.bookingLink;
  
  // Footer location image
  const footerLocationImage = document.getElementById('footer-location-image');
  if (footerLocationImage && data.footer.locationImage) {
    footerLocationImage.src = data.footer.locationImage.src;
    footerLocationImage.alt = data.footer.locationImage.alt;
    
    // Log if image doesn't exist
    footerLocationImage.onerror = function() {
      console.warn(`⚠️  WARN Missing image -> using placeholder at: ${data.footer.locationImage.src}`);
    };
  }
}

// Populate modules on index page
function populateModules(data) {
  if (!data.sections) return;
  
  // Location module
  const locationTitle = document.getElementById('location-title');
  const locationText = document.getElementById('location-text');
  const locationImage = document.getElementById('location-image');
  
  if (locationTitle) locationTitle.textContent = data.sections.location.title;
  if (locationText) locationText.textContent = data.sections.location.text;
  if (locationImage) {
    locationImage.src = data.sections.location.image;
    locationImage.alt = data.sections.location.alt;
    locationImage.onerror = function() {
      console.warn(`⚠️  WARN Missing image -> using placeholder at: ${data.sections.location.image}`);
    };
  }
  
  // Amenities module
  const amenitiesTitle = document.getElementById('amenities-title');
  const amenitiesText = document.getElementById('amenities-text');
  const amenitiesImage = document.getElementById('amenities-image');
  
  if (amenitiesTitle) amenitiesTitle.textContent = data.sections.amenities.title;
  if (amenitiesText) amenitiesText.textContent = data.sections.amenities.text;
  if (amenitiesImage) {
    amenitiesImage.src = data.sections.amenities.image;
    amenitiesImage.alt = data.sections.amenities.alt;
    amenitiesImage.onerror = function() {
      console.warn(`⚠️  WARN Missing image -> using placeholder at: ${data.sections.amenities.image}`);
    };
  }
  
  // Around module
  const aroundTitle = document.getElementById('around-title');
  const aroundText = document.getElementById('around-text');
  const aroundImage = document.getElementById('around-image');
  
  if (aroundTitle) aroundTitle.textContent = data.sections.around.title;
  if (aroundText) aroundText.textContent = data.sections.around.text;
  if (aroundImage) {
    aroundImage.src = data.sections.around.image;
    aroundImage.alt = data.sections.around.alt;
    aroundImage.onerror = function() {
      console.warn(`⚠️  WARN Missing image -> using placeholder at: ${data.sections.around.image}`);
    };
  }
  
  // Update hero title
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    heroTitle.textContent = `Bienvenido a ${data.brand}`;
  }
}

// Highlight active navigation link
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage && (currentPage.includes(linkPage) || (currentPage === '' && linkPage === 'index'))) {
      link.classList.add('active');
    }
  });
}

// Setup mobile menu toggle
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('show');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.setAttribute('aria-label', 'Cerrar menú');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
      }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }
}
