# 🚀 Anubhav Poddar — Developer Portfolio

A premium, futuristic developer portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

---

## 📁 Project Structure

```
anubhav-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx          # Sticky nav, active highlight, mobile menu, theme toggle
│   │   ├── Hero/
│   │   │   └── Hero.jsx            # Particle canvas, typing animation, CTA buttons
│   │   ├── About/
│   │   │   └── About.jsx           # Bio, interest cards, quick facts
│   │   ├── Skills/
│   │   │   └── Skills.jsx          # Animated skill bars, tech icon cloud
│   │   ├── Projects/
│   │   │   └── Projects.jsx        # Project cards with hover effects
│   │   ├── Experience/
│   │   │   └── Experience.jsx      # Alternating vertical timeline
│   │   ├── Achievements/
│   │   │   └── Achievements.jsx    # Achievement cards + stats banner
│   │   ├── Contact/
│   │   │   └── Contact.jsx         # Contact form + info cards
│   │   └── common/
│   │       ├── Loader.jsx          # Animated loading screen
│   │       ├── CustomCursor.jsx    # Smooth custom cursor with lag ring
│   │       ├── SectionWrapper.jsx  # Reusable section + header component
│   │       └── Footer.jsx          # Footer with social links
│   ├── App.jsx                     # Root component, theme state, loader gate
│   ├── main.jsx                    # React DOM entry point
│   └── index.css                   # Global styles, Tailwind layers, utilities
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Color | `#00FF94` (Neon Green) |
| Accent Color | `#00C2FF` (Electric Blue) |
| Background | `#030712` (Deep Black) |
| Display Font | Syne (Google Fonts) |
| Mono Font | JetBrains Mono |
| Body Font | Outfit |

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Particle canvas background | ✅ |
| Typing animation (multi-title) | ✅ |
| Custom cursor with lag ring | ✅ |
| Animated loading screen | ✅ |
| Dark / Light theme toggle | ✅ |
| Sticky navbar + active highlight | ✅ |
| Mobile responsive menu | ✅ |
| Scroll-triggered animations | ✅ |
| Glassmorphism cards | ✅ |
| Animated skill bars | ✅ |
| Alternating timeline | ✅ |
| Project cards with hover glow | ✅ |
| Contact form (frontend) | ✅ |
| Noise texture overlay | ✅ |
| Grid background pattern | ✅ |

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

**Option A – Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```
Follow the prompts. Vercel auto-detects Vite. 🎉

**Option B – GitHub + Vercel Dashboard**
1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Framework: **Vite** (auto-detected)
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**

### Deploy to Netlify

```bash
npm run build
```

Then drag & drop the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

**Or via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

---

## 🔧 Customization

### Update personal info
- **Hero:** Edit `src/components/Hero/Hero.jsx` — name, titles, stats
- **About:** Edit `src/components/About/About.jsx` — bio paragraphs
- **Skills:** Edit `src/components/Skills/Skills.jsx` — `SKILL_CATEGORIES` array
- **Projects:** Edit `src/components/Projects/Projects.jsx` — `PROJECTS` array
- **Experience:** Edit `src/components/Experience/Experience.jsx` — `EXPERIENCES` array
- **Achievements:** Edit `src/components/Achievements/Achievements.jsx` — `ACHIEVEMENTS` array
- **Contact:** Edit `src/components/Contact/Contact.jsx` — `CONTACT_INFO` array

### Change color theme
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#00FF94',   // change this
  accent: '#00C2FF',    // change this
}
```

### Connect contact form to backend
In `Contact.jsx`, replace the `setTimeout` mock with a real fetch:
```js
const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
```

Or use [EmailJS](https://www.emailjs.com/) for a free email service:
```bash
npm install @emailjs/browser
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| react + react-dom | UI framework |
| framer-motion | Animations & transitions |
| react-icons | Icon library (Fi icons) |
| react-intersection-observer | Scroll-triggered animations |
| tailwindcss | Utility-first CSS |
| vite | Fast build tool |

---

Built by Anubhav Poddar
