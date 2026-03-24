# Quick Start Guide - Simbi Props Landing Page

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The site opens at `http://localhost:3000`

### 3. View the Site
- Hero section with CTAs
- 6 feature cards with animations
- 4 testimonials
- 6 FAQ items (accordion)
- CTA section
- Footer with links

## Key Features to Try

### Mobile Menu
- Click hamburger icon on mobile (< 768px)
- Menu slides in from top
- Click a link to navigate
- Press Escape to close

### Scroll Animations
- Scroll down the page
- Watch cards slide up and fade in
- Staggered animations on each card
- Smooth 60fps performance

### FAQ Accordion
- Click any FAQ question
- Answer expands smoothly
- Only one item open at a time
- Arrow icon rotates

### Responsive Design
- Resize browser window
- Layout adapts at 768px and 1024px
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

## Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#YOUR_COLOR',
  },
}
```

### Update Content
Edit `index.html`:
- Headlines: `<h1>`, `<h2>`, `<h3>`
- Descriptions: `<p>` tags
- Buttons: `<button>` tags

### Add Images
1. Create `assets/images/` folder
2. Add your images
3. Update `src` attributes in `index.html`

## Testing

### Run All Tests
```bash
npm test
```

### Run Specific Tests
```bash
npm test -- mobile-menu.test.js
npm test -- scroll-animations.test.js
npm test -- properties.test.js
```

### Watch Mode
```bash
npm test -- --watch
```

## Build for Production

```bash
npm run build
```

Output in `dist/` folder - ready to deploy!

## File Structure

```
├── index.html              # Main page
├── css/
│   ├── tailwind.css       # Tailwind styles
│   └── animations.css     # Custom animations
├── js/
│   ├── main.js            # Entry point
│   ├── scroll-animations.js
│   ├── mobile-menu.js
│   └── *.test.js          # Tests
├── tailwind.config.js     # Tailwind config
├── package.json           # Dependencies
└── README.md              # Full documentation
```

## Common Tasks

### Add a New Feature Card
1. Copy a card div in `index.html`
2. Update title and description
3. Change emoji icon
4. Animations apply automatically!

### Change Font Size
Edit `tailwind.config.js`:
```javascript
fontSize: {
  '5xl': ['48px', { lineHeight: '1.2' }],
}
```

### Add New Section
1. Add HTML in `index.html`
2. Add `data-animate="slide-up"` attribute
3. Add CSS classes
4. Done! Animations work automatically

## Troubleshooting

**Animations not working?**
- Check browser console for errors
- Verify `data-animate` attributes
- Restart dev server: `npm run dev`

**Mobile menu not showing?**
- Check viewport is < 768px
- Verify hamburger button exists
- Check browser console

**Tests failing?**
- Run `npm install` again
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

## Next Steps

1. ✅ Install and run locally
2. ✅ Customize colors and content
3. ✅ Add your images
4. ✅ Run tests to verify
5. ✅ Build for production
6. ✅ Deploy to hosting

## Resources

- **README.md** - Full documentation
- **IMPLEMENTATION.md** - Technical details
- **index.html** - HTML structure
- **tailwind.config.js** - Configuration

## Support

Check the README.md for detailed documentation and troubleshooting.
