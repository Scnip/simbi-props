/**
 * Main Application Entry Point
 * Initializes all modules and features
 */

import ScrollAnimations from './scroll-animations.js';
import MobileMenu from './mobile-menu.js';

class App {
  constructor() {
    this.scrollAnimations = null;
    this.mobileMenu = null;
    this.currentSlide = 0;
  }

  /**
   * Initialize the application
   */
  init() {
    this.initScrollAnimations();
    this.initMobileMenu();
    this.initFAQAccordion();
    this.initSmoothScroll();
    this.initBenefitsSlider();
    this.initAnimatedCounters();
    this.initParallaxElements();
  }

  /**
   * Initialize scroll animations
   */
  initScrollAnimations() {
    this.scrollAnimations = new ScrollAnimations();
    this.scrollAnimations.init();
  }

  /**
   * Initialize mobile menu
   */
  initMobileMenu() {
    this.mobileMenu = new MobileMenu();
    this.mobileMenu.init();
  }

  /**
   * Initialize benefits slider/carousel
   */
  initBenefitsSlider() {
    const slider = document.querySelector('[data-benefits-slider]');
    if (!slider) return;

    const prevBtn = document.querySelector('[data-slider-prev]');
    const nextBtn = document.querySelector('[data-slider-next]');
    const dots = document.querySelectorAll('[data-slider-dot]');
    const totalSlides = 3;
    let currentSlide = 0;

    const updateSlider = () => {
      const slideWidth = 100 / 3;
      const offset = (currentSlide % totalSlides) * slideWidth;
      slider.style.transform = `translateX(-${offset}%)`;
      
      const activeDot = currentSlide % totalSlides;
      dots.forEach((dot, index) => {
        if (index === activeDot) {
          dot.classList.add('bg-primary-600');
          dot.classList.remove('bg-neutral-300');
        } else {
          dot.classList.remove('bg-primary-600');
          dot.classList.add('bg-neutral-300');
        }
      });
    };

    nextBtn?.addEventListener('click', () => {
      currentSlide++;
      updateSlider();
    });

    prevBtn?.addEventListener('click', () => {
      currentSlide--;
      updateSlider();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
      });
    });
  }

  /**
   * Initialize animated counters for stats section
   */
  initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const target = parseInt(entry.target.getAttribute('data-counter'));
          this.animateCounter(entry.target, target);
          entry.target.classList.add('counted');
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
  }

  /**
   * Animate counter from 0 to target value
   */
  animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = Date.now();

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (target - start) * progress);
      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }

  /**
   * Initialize FAQ accordion functionality
   */
  initFAQAccordion() {
    // Support both old and new FAQ structures
    const oldFaqItems = document.querySelectorAll('[data-faq-item]');
    const newFaqItems = document.querySelectorAll('.single-faq-wrap-2');

    // Handle old FAQ structure
    oldFaqItems.forEach((item) => {
      const header = item.querySelector('[data-faq-header]');
      if (!header) return;

      header.addEventListener('click', () => {
        this.toggleFAQItem(item, oldFaqItems);
      });

      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleFAQItem(item, oldFaqItems);
        }
      });
    });

    // Handle new FAQ structure
    newFaqItems.forEach((item) => {
      const header = item.querySelector('.faq-question-wrap-2');
      if (!header) return;

      header.addEventListener('click', () => {
        this.toggleNewFAQItem(item, newFaqItems);
      });

      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleNewFAQItem(item, newFaqItems);
        }
      });
    });
  }

  /**
   * Toggle FAQ item expanded state (old structure)
   */
  toggleFAQItem(item, allItems) {
    const isExpanded = item.classList.contains('expanded');

    // Close all items
    allItems.forEach((i) => {
      i.classList.remove('expanded');
    });

    // Open clicked item if it wasn't expanded
    if (!isExpanded) {
      item.classList.add('expanded');
    }
  }

  /**
   * Toggle FAQ item expanded state (new structure)
   */
  toggleNewFAQItem(item, allItems) {
    const isExpanded = item.classList.contains('expanded');

    // Close all items
    allItems.forEach((i) => {
      i.classList.remove('expanded');
    });

    // Open clicked item if it wasn't expanded
    if (!isExpanded) {
      item.classList.add('expanded');
    }
  }

  /**
   * Initialize smooth scroll for navigation links
   */
  initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * Initialize parallax effect for floating elements
   */
  initParallaxElements() {
    const parallaxElements = document.querySelectorAll('[data-parallax-element]');
    if (parallaxElements.length === 0) return;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 10;
        const x = mouseX * speed;
        const y = mouseY * speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    });

    // Scroll-triggered close animation for phone images
    this.initScrollCloseAnimation();
  }

  /**
   * Initialize scroll-linked pinch animation for phone images
   */
  initScrollCloseAnimation() {
    const leftPhone = document.querySelector('[data-scroll-close-image="left"]');
    const rightPhone = document.querySelector('[data-scroll-close-image="right"]');
    
    if (!leftPhone || !rightPhone) return;

    // Set transform-origin to top center so phones pivot from top
    leftPhone.style.transformOrigin = 'top center';
    rightPhone.style.transformOrigin = 'top center';

    let ticking = false;

    const updatePhoneAnimation = () => {
      const heroSection = document.querySelector('section:first-of-type');
      if (!heroSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const heroBottom = heroRect.bottom;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress based on hero section bottom position
      // 0 when hero bottom is at viewport bottom, 1 when hero is fully scrolled past
      let progress = Math.max(0, (viewportHeight - heroBottom) / viewportHeight);
      progress = Math.min(1, progress);

      // Apply pinch effect: phones rotate inward from top, creating bottom lap effect
      // Left phone rotates clockwise (positive), right phone rotates counter-clockwise (negative)
      const rotateZ = progress * 15; // Rotate up to 15 degrees

      leftPhone.style.transform = `rotateZ(${rotateZ}deg)`;
      rightPhone.style.transform = `rotateZ(-${rotateZ}deg)`;

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updatePhoneAnimation);
        ticking = true;
      }
    });

    // Initial call
    updatePhoneAnimation();
  }

  /**
   * Destroy the application
   */
  destroy() {
    if (this.scrollAnimations) {
      this.scrollAnimations.destroy();
    }
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}
