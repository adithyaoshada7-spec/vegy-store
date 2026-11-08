/**
 * Ranketha Organics Foods - Interactive Client Script
 * Handles sliders, mobile menu, cart interactions, live search & notifications
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Initialize Bootstrap Carousels if available
  if (typeof bootstrap !== 'undefined') {
    const heroCarousel = document.getElementById('homeHeroWeb');
    if (heroCarousel) {
      new bootstrap.Carousel(heroCarousel, {
        interval: 5000,
        ride: 'carousel',
        wrap: true
      });
    }

    const reviewsCarousel = document.getElementById('reviewsCarousel');
    if (reviewsCarousel) {
      new bootstrap.Carousel(reviewsCarousel, {
        interval: 6000,
        ride: 'carousel',
        wrap: true
      });
    }
  }

  // 2. Category Dropdown Toggle
  const categoryBtn = document.querySelector('.category-btn');
  const categoryDropdown = document.querySelector('.category-dropdown, .categories-menu, .category-menu-root .dropdown-menu');
  if (categoryBtn) {
    categoryBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const parent = categoryBtn.closest('.category-menu-root') || categoryBtn.parentElement;
      const dropdown = parent.querySelector('.category-dropdown, ul, .dropdown-menu');
      if (dropdown) {
        const isShown = dropdown.style.display === 'block';
        dropdown.style.display = isShown ? 'none' : 'block';
      }
    });

    document.addEventListener('click', function (e) {
      if (categoryDropdown && !categoryBtn.contains(e.target)) {
        categoryDropdown.style.display = 'none';
      }
    });
  }

  // 3. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-menu-btn, .mobile-toggle, .btn-mobile-menu');
  const mobileSidebar = document.querySelector('.mobile-sidebar, #mobileSidebar, .mobile-menu-container');
  if (mobileToggle && mobileSidebar) {
    mobileToggle.addEventListener('click', function () {
      mobileSidebar.classList.toggle('show');
      mobileSidebar.classList.toggle('active');
    });
  }

  // 4. Cart Simulation
  let cartCount = 0;
  const cartBadge = document.querySelector('.cart-badge, .cart-count, .header-cart-count, .badge-cart');
  const cartButtons = document.querySelectorAll('.add-to-cart-btn, .btn-add-cart, button[title*="Cart"], .product-cart-btn');

  function updateCartBadge() {
    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = 'inline-block';
    }
  }

  function showToast(message) {
    let toast = document.getElementById('ranketha-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ranketha-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #2d5e1e;
        color: #ffffff;
        padding: 14px 24px;
        border-radius: 8px;
        font-family: inherit;
        font-size: 15px;
        font-weight: 500;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="bx bx-check-circle" style="font-size: 20px; color: #a4e66b;"></i> <span>${message}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 3000);
  }

  cartButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      cartCount++;
      updateCartBadge();
      const productCard = btn.closest('.product-card, .card, [data-v-]');
      let productName = 'Item';
      if (productCard) {
        const titleEl = productCard.querySelector('.product-title, .product-name, h4, h5, h6');
        if (titleEl) productName = titleEl.textContent.trim();
      }
      showToast(`${productName} added to cart!`);
    });
  });

  // Cart icon click opens offcanvas if bootstrap is loaded
  const cartIconLink = document.querySelector('.header-cart, .cart-icon-wrapper, [data-bs-target="#cartSidebar"]');
  if (cartIconLink) {
    cartIconLink.addEventListener('click', function (e) {
      e.preventDefault();
      const cartOffcanvasEl = document.getElementById('cartSidebar');
      if (cartOffcanvasEl && typeof bootstrap !== 'undefined') {
        const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartOffcanvasEl);
        offcanvas.show();
      }
    });
  }

  // 5. Live Search Filter on Shop Page
  const searchInput = document.querySelector('input[type="search"], .search-input, input[placeholder*="Search"]');
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const query = e.target.value.toLowerCase().trim();
      const productItems = document.querySelectorAll('.product-card, .shop-product-item, .col-lg-3, .col-md-4');
      if (productItems.length > 0 && window.location.pathname.includes('shop')) {
        productItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          if (!query || text.includes(query)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      }
    });

    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!window.location.pathname.includes('shop') && query) {
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // 6. Contact Form Simulation
  const contactForm = document.querySelector('form.contact-form, form[action*="contact"]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Thank you! Your message has been sent to Ranketha Organics Foods.');
      contactForm.reset();
    });
  }

  // 7. Newsletter Simulation
  const newsletterForm = document.querySelector('.newsletter-form, form[action*="subscribe"]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Thank you for subscribing to Ranketha Organics Foods!');
      newsletterForm.reset();
    });
  }
});
