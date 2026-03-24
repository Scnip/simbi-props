# Simbi Props - Modern Property Management Landing Page

A high-performance, responsive landing page for Simbi Props built with HTML5, Tailwind CSS, and vanilla JavaScript. Features scroll-triggered animations, stacked card layouts, and a polished user experience.

## Features

- ✨ **Scroll-Triggered Animations** - Smooth, performant animations using Intersection Observer API
- 📱 **Fully Responsive** - Mobile-first design that works on all devices (320px to 4K)
- 🎨 **Modern Design** - Purple-themed color palette with professional typography
- ⚡ **High Performance** - 60fps animations, optimized for fast loading
- 🔒 **Accessible** - Semantic HTML, keyboard navigation, focus states
- 🧪 **Well-Tested** - Unit tests and property-based tests for reliability

## Project Structure

```
simbi-props-landing/
├── index.html                 # Main HTML file
├── css/
│   ├── tailwind.css          # Tailwind configuration
│   └── animations.css        # Custom animations
├── js/
│   ├── main.js               # Entry point
│   ├── scroll-animations.js  # Intersection Observer implementation
│   ├── mobile-menu.js        # Mobile navigation
│   ├── mobile-menu.test.js   # Mobile menu tests
│   ├── scroll-animations.test.js  # Animation tests
│   └── properties.test.js    # Property-based tests
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite build configuration
├── vitest.config.js          # Vitest configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd simbi-props-landing
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will open at `http://localhost:3000`

## Development

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Run Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm test:ui

# Run tests in watch mode
npm test -- --watch
```

## Sections

### 1. Navigation Header
- Fixed/sticky header with logo
- Responsive navigation links
- Mobile hamburger menu
- Smooth scroll to sections

### 2. Hero Section
- Compelling headline and subheading
- Primary and secondary CTAs
- Gradient background
- Responsive typography

### 3. Features Section
- 6 feature cards with icons
- Stacked offset layout
- Scroll-triggered animations
- Hover effects

### 4. Testimonials Section
- 4 testimonial cards
- User avatars and ratings
- Responsive grid layout
- Staggered animations

### 5. FAQ Section
- 6 frequently asked questions
- Accordion functionality
- Smooth expand/collapse
- Keyboard accessible

### 6. CTA Section
- Call-to-action with headline
- Primary and secondary buttons
- High-contrast background
- Scale-up animation

### 7. Footer
- Company information
- Link columns
- Social media icons
- Responsive layout

## Technical Details

### Animations

All animations use GPU-accelerated properties (`transform` and `opacity`) for 60fps performance:

- **Slide-Up**: Elements slide up with fade-in effect
- **Fade-In**: Simple opacity transition
- **Scale-Up**: Elements scale up with fade-in

Animations are triggered by the Intersection Observer API when elements enter the viewport.

### Responsive Breakpoints

- **Mobile**: 320px - 767px (1 column layouts)
- **Tablet**: 768px - 1023px (2 column layouts)
- **Desktop**: 1024px+ (3 column layouts)

### Color Palette

- **Primary Purple**: #7C3AED
- **Dark Purple**: #5B21B6
- **Light Purple**: #EDE9FE
- **Neutral Colors**: Gray scale from #FAFAFA to #111827

### Performance Targets

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    600: '#7C3AED', // Change primary color
  },
}
```

### Typography

Modify font sizes and weights in `tailwind.config.js`:

```javascript
fontSize: {
  '5xl': ['48px', { lineHeight: '1.2' }],
}
```

### Content

Edit `index.html` to update:
- Headlines and descriptions
- Feature cards
- Testimonials
- FAQ items
- Footer links

### Images

Replace placeholder images in the `assets/images/` directory with your own. Update image paths in `index.html`.

## Testing

### Unit Tests

Test specific functionality:
- Mobile menu toggle
- FAQ accordion behavior
- Navigation structure

### Property-Based Tests

Validate universal properties:
- Navigation contains all required links
- Feature cards have correct layout
- Responsive design works at all breakpoints
- Colors use defined palette
- Spacing is consistent

## Performance Optimization

- Lazy loading for below-fold images
- CSS minification and tree-shaking
- JavaScript minification
- Efficient Intersection Observer usage
- GPU-accelerated animations

## Accessibility

- Semantic HTML structure
- ARIA labels and attributes
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast compliance
- Reduced motion support

## License

This project is provided as-is for use with Simbi Props.

## Support

For issues or questions, please contact the development team.
