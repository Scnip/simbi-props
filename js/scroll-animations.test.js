import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import ScrollAnimations from './scroll-animations.js';

describe('ScrollAnimations', () => {
  let scrollAnimations;

  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn((callback) => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      _callback: callback,
    }));

    // Create DOM elements
    document.body.innerHTML = `
      <div data-animate="slide-up" class="card">Card 1</div>
      <div data-animate="slide-up" class="card">Card 2</div>
      <div data-animate="testimonial" class="testimonial">Testimonial 1</div>
      <div data-animate="faq" class="faq">FAQ 1</div>
      <div data-animate="cta" class="cta">CTA</div>
      <div data-animate="hero" class="hero">Hero</div>
    `;

    scrollAnimations = new ScrollAnimations();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    scrollAnimations.destroy();
  });

  it('should initialize with correct observer options', () => {
    expect(scrollAnimations.observerOptions.rootMargin).toBe('0px 0px -100px 0px');
    expect(scrollAnimations.observerOptions.threshold).toBe(0.1);
  });

  it('should add animation classes to feature cards', () => {
    scrollAnimations.init();
    
    const cards = document.querySelectorAll('[data-animate="slide-up"]');
    cards.forEach((card) => {
      expect(card.classList.contains('animate-slide-up')).toBe(true);
      expect(card.classList.contains('will-animate')).toBe(true);
    });
  });

  it('should apply stagger delays to feature cards', () => {
    scrollAnimations.init();
    
    const cards = document.querySelectorAll('[data-animate="slide-up"]');
    cards.forEach((card, index) => {
      expect(card.style.animationDelay).toBe(`${index * 100}ms`);
    });
  });

  it('should add animation classes to testimonial cards', () => {
    scrollAnimations.init();
    
    const testimonials = document.querySelectorAll('[data-animate="testimonial"]');
    testimonials.forEach((testimonial) => {
      expect(testimonial.classList.contains('animate-slide-up')).toBe(true);
    });
  });

  it('should add animation classes to FAQ items', () => {
    scrollAnimations.init();
    
    const faqItems = document.querySelectorAll('[data-animate="faq"]');
    faqItems.forEach((item) => {
      expect(item.classList.contains('animate-slide-up')).toBe(true);
    });
  });

  it('should add scale-up animation to CTA section', () => {
    scrollAnimations.init();
    
    const ctaSection = document.querySelector('[data-animate="cta"]');
    expect(ctaSection.classList.contains('animate-scale-up')).toBe(true);
  });

  it('should add fade-in animation to hero elements', () => {
    scrollAnimations.init();
    
    const heroElements = document.querySelectorAll('[data-animate="hero"]');
    heroElements.forEach((el) => {
      expect(el.classList.contains('animate-fade-in')).toBe(true);
    });
  });

  it('should add animate-in class when element intersects', () => {
    scrollAnimations.init();
    
    const card = document.querySelector('[data-animate="slide-up"]');
    const observer = global.IntersectionObserver.mock.results[0].value;
    
    // Simulate intersection
    observer._callback([{ isIntersecting: true, target: card }]);
    
    expect(card.classList.contains('animate-in')).toBe(true);
  });

  it('should track animated elements in map', () => {
    scrollAnimations.init();
    
    expect(scrollAnimations.animatedElements.size).toBeGreaterThan(0);
  });

  it('should destroy observer on cleanup', () => {
    scrollAnimations.init();
    const observer = global.IntersectionObserver.mock.results[0].value;
    
    scrollAnimations.destroy();
    
    expect(observer.disconnect).toHaveBeenCalled();
    expect(scrollAnimations.animatedElements.size).toBe(0);
  });
});
