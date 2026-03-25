/**
 * Scroll Animations Module
 * Handles Intersection Observer API for scroll-triggered animations
 */

class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1,
    };
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.observerOptions
    );
    this.animatedElements = new Map();
  }

  /**
   * Initialize scroll animations for all elements with animation classes
   */
  init() {
    // Observe feature cards
    const featureCards = document.querySelectorAll('[data-animate="slide-up"]');
    featureCards.forEach((card, index) => {
      card.classList.add('animate-slide-up', 'will-animate');
      card.style.animationDelay = `${index * 100}ms`;
      this.observer.observe(card);
      this.animatedElements.set(card, 'slide-up');
    });

    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('[data-animate="testimonial"]');
    testimonialCards.forEach((card, index) => {
      card.classList.add('animate-slide-up', 'will-animate');
      card.style.animationDelay = `${index * 100}ms`;
      this.observer.observe(card);
      this.animatedElements.set(card, 'testimonial');
    });

    // Observe FAQ items
    const faqItems = document.querySelectorAll('[data-animate="faq"]');
    faqItems.forEach((item, index) => {
      item.classList.add('animate-slide-up', 'will-animate');
      item.style.animationDelay = `${index * 100}ms`;
      this.observer.observe(item);
      this.animatedElements.set(item, 'faq');
    });

    // Observe stat items
    const statItems = document.querySelectorAll('[data-animate="stat"]');
    statItems.forEach((item, index) => {
      item.classList.add('animate-fade-in', 'will-animate');
      item.style.animationDelay = `${index * 100}ms`;
      this.observer.observe(item);
      this.animatedElements.set(item, 'stat');
    });

    // Observe CTA section
    const ctaSection = document.querySelector('[data-animate="cta"]');
    if (ctaSection) {
      ctaSection.classList.add('animate-scale-up', 'will-animate');
      this.observer.observe(ctaSection);
      this.animatedElements.set(ctaSection, 'cta');
    }

    // Observe hero section elements
    const heroElements = document.querySelectorAll('[data-animate="hero"]');
    heroElements.forEach((el) => {
      el.classList.add('animate-fade-in', 'will-animate');
      this.observer.observe(el);
      this.animatedElements.set(el, 'hero');
    });

    // Observe generic slide-up animations
    const slideUpElements = document.querySelectorAll('[data-animate="slide-up"]:not([data-animate="slide-up"][class*="animate-"])');
    slideUpElements.forEach((el, index) => {
      if (!el.classList.contains('animate-slide-up')) {
        el.classList.add('animate-slide-up', 'will-animate');
        el.style.animationDelay = `${index * 100}ms`;
        this.observer.observe(el);
        this.animatedElements.set(el, 'slide-up');
      }
    });

    // Observe scale-up animations
    const scaleUpElements = document.querySelectorAll('[data-animate="scale-up"]');
    scaleUpElements.forEach((el) => {
      el.classList.add('animate-scale-up', 'will-animate');
      this.observer.observe(el);
      this.animatedElements.set(el, 'scale-up');
    });
  }

  /**
   * Handle intersection observer callback
   */
  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Element is entering viewport - add animate-in class to trigger animation
        entry.target.classList.add('animate-in');
      }
    });
  }

  /**
   * Destroy observer and clean up
   */
  destroy() {
    this.observer.disconnect();
    this.animatedElements.clear();
  }
}

// Export for use in main.js
export default ScrollAnimations;
