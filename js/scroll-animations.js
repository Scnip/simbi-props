/**
 * Scroll Animations Module
 * Handles Intersection Observer API for scroll-triggered animations
 * 
 * Usage:
 * - data-animate="slide-up" - Slide up from bottom
 * - data-animate="slide-down" - Slide down from top
 * - data-animate="slide-left" - Slide left from right
 * - data-animate="slide-right" - Slide right from left
 * - data-animate="scale-up" - Scale up from center
 * - data-animate="fade-in" - Fade in
 * - data-animate="random" - Random direction animation
 */

class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.observerOptions
    );
    this.animationTypes = ['slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale-up', 'fade-in'];
  }

  /**
   * Get random animation type
   */
  getRandomAnimation() {
    return this.animationTypes[Math.floor(Math.random() * this.animationTypes.length)];
  }

  /**
   * Initialize scroll animations for all elements with animation classes
   */
  init() {
    // Observe all elements with data-animate attribute
    const allAnimatedElements = document.querySelectorAll('[data-animate]');
    
    allAnimatedElements.forEach((el) => {
      let animationType = el.getAttribute('data-animate');
      
      // If random, pick a random animation
      if (animationType === 'random') {
        animationType = this.getRandomAnimation();
      }
      
      // Map animation types to CSS classes
      const animationMap = {
        'slide-up': 'animate-slide-up',
        'slide-down': 'animate-slide-down',
        'slide-left': 'animate-slide-left',
        'slide-right': 'animate-slide-right',
        'scale-up': 'animate-scale-up',
        'fade-in': 'animate-fade-in',
      };
      
      const animationClass = animationMap[animationType] || 'animate-slide-up';
      
      // Add animation class
      el.classList.add(animationClass);
      
      // Observe element
      this.observer.observe(el);
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
  }
}

// Export for use in main.js
export default ScrollAnimations;
