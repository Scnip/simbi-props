import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import MobileMenu from './mobile-menu.js';

describe('MobileMenu', () => {
  let mobileMenu;
  let hamburgerBtn;
  let mobileMenuEl;
  let navLink;

  beforeEach(() => {
    // Create DOM elements
    document.body.innerHTML = `
      <button data-mobile-menu-toggle aria-expanded="false">Menu</button>
      <div data-mobile-menu>
        <a href="#features" data-nav-link>Features</a>
        <a href="#testimonials" data-nav-link>Testimonials</a>
      </div>
    `;

    hamburgerBtn = document.querySelector('[data-mobile-menu-toggle]');
    mobileMenuEl = document.querySelector('[data-mobile-menu]');
    navLink = document.querySelector('[data-nav-link]');

    mobileMenu = new MobileMenu();
    mobileMenu.init();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should initialize with menu closed', () => {
    expect(mobileMenu.getState()).toBe(false);
    expect(mobileMenuEl.classList.contains('active')).toBe(false);
  });

  it('should open menu on hamburger click', () => {
    hamburgerBtn.click();
    expect(mobileMenu.getState()).toBe(true);
    expect(mobileMenuEl.classList.contains('active')).toBe(true);
    expect(hamburgerBtn.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close menu on hamburger click when open', () => {
    hamburgerBtn.click();
    expect(mobileMenu.getState()).toBe(true);
    
    hamburgerBtn.click();
    expect(mobileMenu.getState()).toBe(false);
    expect(mobileMenuEl.classList.contains('active')).toBe(false);
    expect(hamburgerBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('should close menu when navigation link is clicked', () => {
    hamburgerBtn.click();
    expect(mobileMenu.getState()).toBe(true);
    
    navLink.click();
    expect(mobileMenu.getState()).toBe(false);
    expect(mobileMenuEl.classList.contains('active')).toBe(false);
  });

  it('should close menu on escape key', () => {
    hamburgerBtn.click();
    expect(mobileMenu.getState()).toBe(true);
    
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    
    expect(mobileMenu.getState()).toBe(false);
  });

  it('should close menu when clicking outside', () => {
    hamburgerBtn.click();
    expect(mobileMenu.getState()).toBe(true);
    
    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    outsideElement.click();
    
    expect(mobileMenu.getState()).toBe(false);
  });

  it('should prevent body scroll when menu is open', () => {
    hamburgerBtn.click();
    expect(document.body.style.overflow).toBe('hidden');
    
    hamburgerBtn.click();
    expect(document.body.style.overflow).toBe('');
  });
});
