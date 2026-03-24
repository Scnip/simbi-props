/**
 * Mobile Menu Module
 * Handles mobile navigation toggle functionality
 */

class MobileMenu {
  constructor() {
    this.hamburgerBtn = document.querySelector('[data-mobile-menu-toggle]');
    this.mobileMenu = document.querySelector('[data-mobile-menu]');
    this.navLinks = document.querySelectorAll('[data-nav-link]');
    this.isOpen = false;
  }

  /**
   * Initialize mobile menu event listeners
   */
  init() {
    if (!this.hamburgerBtn || !this.mobileMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }

    // Toggle menu on hamburger click
    this.hamburgerBtn.addEventListener('click', () => this.toggle());

    // Close menu when a link is clicked
    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => this.close());
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        !this.mobileMenu.contains(e.target) &&
        !this.hamburgerBtn.contains(e.target)
      ) {
        this.close();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  /**
   * Toggle menu open/closed state
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open mobile menu
   */
  open() {
    this.isOpen = true;
    this.mobileMenu.classList.add('active');
    this.hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close mobile menu
   */
  close() {
    this.isOpen = false;
    this.mobileMenu.classList.remove('active');
    this.hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /**
   * Get current menu state
   */
  getState() {
    return this.isOpen;
  }
}

// Export for use in main.js
export default MobileMenu;
