/**
 * Scroll Animations Module
 * Handles Intersection Observer API for scroll-triggered animations with Animate CSS
 * 
 * Re-triggers animations every time elements enter viewport
 * Removes animation classes when elements leave viewport so they're ready to re-trigger
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
  }

  /**
   * Initialize scroll animations for all elements with Animate CSS classes
   */
  init() {
    // Observe all elements with animate__animated class (Animate CSS)
    const allAnimatedElements = document.querySelectorAll('.animate__animated');
    
    allAnimatedElements.forEach((el) => {
      this.observer.observe(el);
    });
  }

  /**
   * Handle intersection observer callback
   * Re-triggers animations when elements enter/leave viewport
   */
  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Element is entering viewport - re-trigger animation
        // Get all Animate CSS animation classes (e.g., animate__slideInUp, animate__zoomIn)
        const animationClasses = Array.from(entry.target.classList).filter(
          (cls) => cls.startsWith('animate__') && cls !== 'animate__animated'
        );

        if (animationClasses.length > 0) {
          // Remove animation classes to reset
          animationClasses.forEach((cls) => entry.target.classList.remove(cls));
          
          // Trigger reflow to restart animation
          void entry.target.offsetWidth;
          
          // Re-add animation classes
          animationClasses.forEach((cls) => entry.target.classList.add(cls));
        }
      } else {
        // Element is leaving viewport - remove animation classes
        // so they're ready to re-trigger when element re-enters
        const animationClasses = Array.from(entry.target.classList).filter(
          (cls) => cls.startsWith('animate__') && cls !== 'animate__animated'
        );
        
        animationClasses.forEach((cls) => entry.target.classList.remove(cls));
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
