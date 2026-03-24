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

    const updateSlider = () => {
      slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
      dots.forEach((dot, index) => {
        if (index === this.currentSlide) {
          dot.classList.add('bg-primary-600');
          dot.classList.remove('bg-neutral-300');
        } else {
          dot.classList.remove('bg-primary-600');
          dot.classList.add('bg-neutral-300');
        }
      });
    };

    prevBtn?.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide - 1 + dots.length) % dots.length;
      updateSlider();
    });

    nextBtn?.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide + 1) % dots.length;
      updateSlider();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.currentSlide = index;
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
      element.textContent = current;

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
    const faqItems = document.querySelectorAll('[data-faq-item]');

    faqItems.forEach((item) => {
      const header = item.querySelector('[data-faq-header]');
      if (!header) return;

      header.addEventListener('click', () => {
        this.toggleFAQItem(item, faqItems);
      });

      // Keyboard support
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleFAQItem(item, faqItems);
        }
      });
    });
  }

  /**
   * Toggle FAQ item expanded state
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

    let ticking = false;

    const updatePhoneAnimation = () => {
      const heroSection = document.querySelector('section:first-of-type');
      if (!heroSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const heroTop = heroRect.top;
      const heroHeight = heroRect.height;

      // Calculate scroll progress: 0 when hero is fully visible, 1 when scrolled past
      let progress = Math.max(0, -heroTop / (heroHeight * 0.5));
      progress = Math.min(1, progress);

      // Apply pinch effect: phones move inward and rotate
      const translateX = progress * 40; // Move inward
      const rotateZ = progress * 12; // Rotate inward
      const scaleY = 1 - progress * 0.15; // Slight vertical squeeze

      leftPhone.style.transform = `translateX(${translateX}px) rotateZ(${rotateZ}deg) scaleY(${scaleY})`;
      rightPhone.style.transform = `translateX(-${translateX}px) rotateZ(-${rotateZ}deg) scaleY(${scaleY})`;

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
