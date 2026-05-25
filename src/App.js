import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useRepeatableIntersect } from './hooks/useRepeatableIntersect';
// Framer Motion hooks for physics-based dreamy lens movement and state transitions
import { motion, useMotionValue, useSpring } from 'framer-motion';

// --- Helper outside the App component ---
const preloadImages = (imageArray) => {
  imageArray.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'grading', label: 'Grading'}, 
  { id: 'about', label: 'About' },
];

const EXPERIENCE = [
  { label: 'Web Development ( newbie )', value: 20, years: '3+ months' },
  { label: 'WordPress', value: 82, years: 'Intermediate level' },
  { label: 'AI Integration', value: 85, years: 'Advanced level' },
  { label: 'UI/UX Design', value: 80, years: 'Intermediate level' },
  { label: 'Github & Vercel', value: 85, years: 'Advanced level' },
  { label: 'Adobe Lightroom', value: 90, years: 'Expert level' },
];

const WORK_ITEMS = [
  { title: 'Project Engineering', detail: 'I utilize AI to optimize production timelines and enhance output quality. A standard approach for high-level professional work in 2026.' },
  { title: 'Design Systems', detail: 'By leveraging advanced prompting techniques, I can rapidly iterate on complex designs, ensuring a more efficient workflow without compromising on quality.' },
  { title: 'Collaboration', detail: 'Sure ! Let me give you the chance to unlock your full potential by collaborating with me. I promise you wont regret it.'},
];

const PROJECTS = [
  {
   name: 'Real Estate',
   tag: 'desktop mode in progress',
   blurb: 'Minimal and Clean',
   href: 'https://realestatezexan.vercel.app/',
   image:'https://images.pexels.com/photos/13772063/pexels-photo-13772063.jpeg?_gl=1*18uvzqs*_ga*MTA2NTI2Mjk4My4xNzc4Nzc4ODk0*_ga_8JE65Q40S6*czE3Nzg3Nzg4OTQkbzEkZzEkdDE3Nzg3NzkyMjEkajQ3JGwwJGgw',
 },
 {
   name: 'Toasty',
   tag: 'AI Cooking',
   blurb: 'AI Powered Cooking App.',
   href: 'https://toasty-zexan.vercel.app/',
   image:
   'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Sneaky',
    tag: 'E-Commerce Website',
    blurb: 'Cool and Stylish',
    href: 'https://sneaky-zexan.vercel.app/',
    image:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8fDA%3D',
    },
  {
      name: 'Pixify AI',
      tag: 'AI Image Editor',
      blurb: 'Powered by ZEXAN',
      href: 'https://pixify-zexan.vercel.app/',
      image:
      'https://plus.unsplash.com/premium_photo-1675876811959-ae0358cbf0e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8UHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      name: 'Watchout',
      tag: 'Luxury Watch Landing Page',
      blurb: 'Made by ZEXAN',
      href: 'https://watchout-zexan.vercel.app/',
      image:
      'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2F0Y2h8ZW58MHx8MHx8fDA%3D',
    },
    {
      name: 'Quantum Synthesis',
      tag: 'High End Neon Landing Page',
      blurb: 'Smooth and Fluid',
      href: 'https://quantumsynthesis-zexan.vercel.app/',
      image:
      'https://plus.unsplash.com/premium_photo-1733342554594-102b8e2d0623?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHF1YW50dW0lMjBzeW50aGVzaXN8ZW58MHx8MHx8fDA%3D',
    },
    {
      name: 'Motor Works',
      tag: 'Dealership Landing Page',
      blurb: 'Tuned by ZEXAN',
      href: 'https://motorworks-zexan.vercel.app/',
      image:
      'https://images.unsplash.com/photo-1652453456433-70255295395b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGNhciUyMGRlYWxlcnNoaXB8ZW58MHx8MHx8fDA%3D',
   },
     {
      name: 'BMW M4 Competition',
      tag: 'Digital Showroom',
      blurb: 'Tuned by ZEXAN MENCY',
      href: 'https://bmw-zexan.vercel.app/',
      image:
      'https://images.unsplash.com/photo-1744223736100-199d4c2e6fd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEyfHxibXd8ZW58MHx8MHx8fDA%3D',
    },
];

const COLOR_GRADING = [
  { id: 1, title: 'Orange Cat', before: 'flying.webp', after: 'flyingcg.webp' },
  { id: 2, title: 'Cats', before: 'cats.webp', after: 'catscg.jpg' },
  { id: 3, title: 'Alcedo Atthis', before: 'bard.webp', after: 'bbbbrd.jpg' },
  { id: 4, title: 'BMW M4 G82', before: 'm4.webp', after: 'bbwcg.webp' },
  { id: 5, title: 'Porsche 911 GT3 RS', before: 'gt3rs.webp', after: 'gt3rscg.jpg' },
  { id: 6, title: 'BMW WRT RACING', before: 'BMWC.webp', after: 'BMW.webp' },
  { id: 7, title: '911 vs 296', before: 'ferr.webp', after: 'pf.webp' },
  { id: 8, title: 'BMW M4 GT3 EVO', before: 'm4gt.webp', after: 'aas.webp' },
  { id: 9, title: 'Roxy Dino', before: 'rexy.webp', after: 'rexycg.webp' },
  { id: 10, title: 'Nature', before: 'fiz.webp', after: 'fizcg.jpg' },
  { id: 11, title: 'Yellow Warbler', before: 'bird.webp', after: 'birdcg.webp' },
  { id: 12, title: 'Home', before: 'home (2).webp', after: 'hoomcg10.webp' },
];

function scrollToId(id) {
  if (id === 'home' || id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function LiquidBackdrop() {
  return (
    <div className="liquid-backdrop" aria-hidden="true">
      <div className="liquid-streak liquid-streak--a liquid-streak--on" />
      <div className="liquid-streak liquid-streak--b liquid-streak--on" />
      <div className="liquid-veil" />
    </div>
  );
}

function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="nav-shell">
      <nav className="nav glass-panel" aria-label="Primary">
        <a className="nav-brand" href="#home" onClick={(e) => { e.preventDefault(); scrollToId('home'); }}>
          ZEXAN
        </a>
        <ul className="nav-links">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id); }}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="nav-theme-toggle pill pill--ghost"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </nav>
    </header>
  );
}

function ExperienceSection() {
  const [ref, active] = useRepeatableIntersect(0.18, '0px 0px -8% 0px', true);
  return (
    <section id="experience" className="section section--tight" ref={ref}>
      <div className={`section-inner reveal ${active ? 'reveal--in' : ''}`}>
        <p className="eyebrow">Experience</p>
        <h2 className="section-title">Skills in Motion</h2>
        <div className="chart-card glass-panel">
          <div className="bar-chart" role="list">
            {EXPERIENCE.map((row) => (
              <div className="bar-row" key={row.label} role="listitem">
                <div className="bar-meta">
                  <span className="bar-label">{row.label}</span>
                  <span className="bar-years">{row.years}</span>
                </div>
                <div className="bar-track" aria-hidden="true">
                  <div
                    className={`bar-fill ${active ? 'bar-fill--grow' : ''}`}
                    style={{ '--target': `${row.value}%` }}
                  />
                </div>
                <span className="bar-value">{row.value}%</span>
              </div>
            ))}
          </div>
          <div className="mini-stats" aria-label="Highlights">
            <div className={`mini-stat ${active ? 'mini-stat--in' : ''}`} style={{ '--d': '0ms' }}>
              <span className="mini-stat__num">3+ months</span>
              <span className="mini-stat__cap">of being a Developer</span>
            </div>
            <div className={`mini-stat ${active ? 'mini-stat--in' : ''}`} style={{ '--d': '80ms' }}>
              <span className="mini-stat__num">20+ years</span>
              <span className="mini-stat__cap">of Age</span>
            </div>
            <div className={`mini-stat ${active ? 'mini-stat--in' : ''}`} style={{ '--d': '160ms' }}>
              <span className="mini-stat__num">90%</span>
              <span className="mini-stat__cap">Effectiveness</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  const [ref, active] = useRepeatableIntersect(0.15, '0px 0px -8% 0px', true);
  return (
    <section id="work" className="section" ref={ref}>
      <div className={`section-inner reveal ${active ? 'reveal--in' : ''}`}>
        <p className="eyebrow">Work</p>
        <h2 className="section-title">How I build</h2>
        <div className="card-grid">
          {WORK_ITEMS.map((item, i) => (
            <article
              key={item.title}
              className={`work-card glass-panel lift ${active ? 'lift--in' : ''}`}
              style={{ '--i': `${i * 70}ms` }}
            >
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, active] = useRepeatableIntersect(0.12, '0px 0px -8% 0px', true);
  return (
    <section id="projects" className="section" ref={ref}>
      <div className={`section-inner reveal ${active ? 'reveal--in' : ''}`}>
        <p className="eyebrow">Projects</p>
        <h2 className="section-title">Platforms</h2>
        <p className="section-leadd">Better Experience on Desktop</p>
        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <a
              key={p.name}
              className={`project-block lift ${active ? 'lift--in' : ''}`}
              style={{ '--i': `${i * 90}ms` }}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="project-block__media"
                style={{ backgroundImage: `url(${p.image})` }}
                aria-hidden="true"
              />
              <div className="project-block__scrim" aria-hidden="true" />
              <div className="project-block__body">
                <span className="project-block__tag">{p.tag}</span>
                <h3 className="project-block__title">{p.name}</h3>
                <p className="project-block__text">{p.blurb}</p>
                <span className="project-block__cta">Visit site →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ColorGradeCard({ item, index, active, forceShowAfter }) {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    setShowAfter(forceShowAfter);
  }, [forceShowAfter]);

  return (
    <article 
      className={`grading-card glass-panel lift ${active ? 'lift--in' : ''}`} 
      style={{ '--i': `${index * 120}ms` }}
      onClick={() => setShowAfter(!showAfter)}
    >
      <div 
        className="photo-card-body" 
        style={{ 
          overflow: 'hidden', 
          position: 'relative', 
          transform: 'translateZ(0)', 
          WebkitMaskImage: '-webkit-radial-gradient(white, black)' 
        }}
      >
        <img 
          src={showAfter ? item.after : item.before} 
          alt={item.title} 
          style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
        />
        <div className="button-container">
          <button className="button-before" style={{ fontSize: '0.8rem', padding: '6px 20px' }}>
            {showAfter ? 'GRADED' : 'RAW'}
          </button>
        </div>
        <div className="photo-overlay">
          <div className="overlay-content">
             <h3>{item.title}</h3>
             <span className="status-tag">{showAfter ? 'AFTER' : 'BEFORE'}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function GradingSection() {
  const [ref, active] = useRepeatableIntersect(0.15, '0px 0px -8% 0px', true);
  const [globalShowAfter, setGlobalShowAfter] = useState(false);
  const toggleAll = () => setGlobalShowAfter(!globalShowAfter);

  return (
    <section id="grading" className="section" ref={ref}>
      <div className={`section-inner reveal ${active ? 'reveal--in' : ''}`}>
        <p className="eyebrow">here i've showcased my side skill</p>
        <div className="flex items-center gap-3">
          <h2 className="section-title">Color Grading</h2>
          <video autoPlay loop muted playsInline className="video-element">
            <source src="video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="section-lead">Tap or click on the photos to toggle between RAW and GRADED shots independently.</p>
        <p className="section-note">Note : The Color-Graded previews may take a moment to load on "GRADED MODE".</p>
        <p className="section-notes">Tip : View in Dark Mode for a better comparison of the Graded Images.</p>
        <p className="section-notes">Software Used : Adobe Lightroom <span className="lr-logo">Lr</span></p>

        <div className="card-grid">
          {COLOR_GRADING.map((item, i) => (
            <ColorGradeCard 
              key={item.id} 
              item={item} 
              index={i} 
              active={active} 
              forceShowAfter={globalShowAfter} 
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'left', marginTop: '20px' , marginBottom: '-50px'}}>
          <button className="pill pill--solid" onClick={toggleAll}>
            {globalShowAfter ? 'RAW THEM ALL' : 'GRADE THEM ALL'}
          </button>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [heroRef, heroActive] = useRepeatableIntersect(0.08, '0px', true);
  const [installPrompt, setInstallPrompt] = useState(null);

  // --- COGNITIVE ENGINE HOVER & PHYSICS CONTROLS ---
  const maskContainerRef = useRef(null);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft snappy spring settings to keep the dreamy lens focused around the cursor tightly
  const springConfig = { damping: 35, stiffness: 140, mass: 1.0 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Track size through a spring to stop the sudden "tak" snap on leave
  const maskSizeValue = useMotionValue(0);
  const smoothSize = useSpring(maskSizeValue, { damping: 30, stiffness: 120 });

  const [dreamyMask, setDreamyMask] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const imagesToPreload = [
        ...COLOR_GRADING.map(item => item.after),
        ...PROJECTS.map(p => p.image),
      ];
      preloadImages(imagesToPreload);
    }, 3000);

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => {
      document.body.removeAttribute('data-theme');
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  // Update hover size with physics injection
  useEffect(() => {
    maskSizeValue.set(isHeroHovered ? 260 : 0);
  }, [isHeroHovered, maskSizeValue]);

  // Sync animation spring values to update the gradient template mapping seamlessly
  useEffect(() => {
    const updateHeroMask = () => {
      const size = smoothSize.get();
      const featherStart = size * 0.40; 
      const maskString = `radial-gradient(circle ${size}px at ${smoothX.get()}px ${smoothY.get()}px, black ${featherStart}px, transparent 100%)`;
      setDreamyMask(maskString);
    };

    const unsubX = smoothX.on("change", updateHeroMask);
    const unsubY = smoothY.on("change", updateHeroMask);
    const unsubSize = smoothSize.on("change", updateHeroMask);
    updateHeroMask();

    return () => {
      unsubX();
      unsubY();
      unsubSize();
    };
  }, [smoothX, smoothY, smoothSize]);

  const handleHeroMouseMove = (e) => {
    const container = maskContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <div className="page" data-theme={theme}>
      <LiquidBackdrop />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      />

      <main>
        {installPrompt && (
          <div className="install-banner mobile-only-install">
            <span>Install App for a better experience !</span>
            <div className="banner-btns">
              <button onClick={handleInstallClick} className="pill pill--ghost">
                Install
              </button>
              <button onClick={() => setInstallPrompt(null)} className="close-btn">✕</button>
            </div>
          </div>
        )}

        {/* ================= RE-ENGINEERED HERO SECTION ================= */}
        <section id="home" className="hero" ref={heroRef}>
          <div className={`hero-inner reveal ${heroActive ? 'reveal--in' : ''}`}>
            
            {/* INTERACTION BOUNDARY */}
            <div 
              ref={maskContainerRef}
              onMouseMove={handleHeroMouseMove}
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
              className="hero-visual"
              style={{ position: 'relative' }}
            >
              {/* FIXED CENTER ALIGNMENT: Removed frame translations so container balances perfectly with typography line heights */}
              <div 
                style={{ 
                  width: '500px', 
                  height: '500px', 
                  borderRadius: '50%', 
                  overflow: 'hidden', 
                  position: 'relative',
                  boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5)'
                }}
              >
                {/* 1ST BOTTOM LAYER: Authentic, full-color portrait with hair adjusted down 15% */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    opacity: 1, 
                    transition: 'opacity 0.4s ease'
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                    src={`${process.env.PUBLIC_URL}/zeezee.jpg`}
                    alt="Zeeshan Kashif Genuine"
                  />
                </div>

                {/* OVERLAY LAYER: F1 Driver Reveal Overlay with spring-interpolated mask coordinates on exit */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    maskImage: dreamyMask,
                    WebkitMaskImage: dreamyMask,
                    filter: isHeroHovered ? "blur(0px) contrast(100%)" : "blur(20px)",
                    transition: 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                    src={`${process.env.PUBLIC_URL}/zexan.png`}
                    alt="ZEXAN Brand Reveal Overlay"
                  />
                </div>

                {/* REVEAL ACCENT BOUNDARY RING */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    borderRadius: '50%', 
                    border: '1px solid rgba(255,255,255,0.12)', 
                    pointerEvents: 'none',
                    opacity: isHeroHovered ? 1 : 0.4,
                    transition: 'opacity 0.5s ease'
                  }} 
                />
              </div>
            </div>
            
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">Portfolio</p>
              <h1 className="hero-title">Zeeshan Kashif</h1>
              <p className="hero-sub">"THE" Web Developer you were looking for ...</p>
              
              <div className="hero-ctas">
                <button type="button" className="pill pill--solid" onClick={() => scrollToId('experience')}>
                  Experience
                </button>
                <button type="button" className="pill pill--solid" onClick={() => scrollToId('projects')}>
                  Projects
                </button>
                <a 
                  className="pill pill--ghost" 
                  href="cv.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View CV
                </a>
                <a 
                  className="pill pill--ghost" 
                  href="https://github.com/zeeshankashif" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </div>
            </div>
          </div>
        </section>

        <ExperienceSection />
        <WorkSection />
        <ProjectsSection />
        <GradingSection />
        <div className="section-divider" aria-hidden="true" />
        <AboutSection />
      </main>
    </div>
  );
}

function AboutSection() {
  const [ref, active] = useRepeatableIntersect(0.2, '0px 0px -8% 0px', true);
  return (
    <section id="about" className="section section--footer" ref={ref}>
      <div className={`section-inner reveal ${active ? 'reveal--in' : ''}`}>
        <p className="eyebrow">About</p>
        <h2 className="section-title">Zeeshan Kashif</h2>
        <p className="about-text">I love everything that goes FAST & BOOM</p>
        <div className="about-actions">
          <a className="pill pill--solid" href="mailto:zeeshankashif.100m@gmail.com">Email Me</a>
          <a className="pill pill--solid" href="https://github.com/zeeshankashif">Github</a>
          <a className="pill pill--ghost" href="cv.jpg" target="_blank" rel="noopener noreferrer">View CV</a>
          <a className="pill pill--ghost" href="#home" onClick={(e) => { e.preventDefault(); scrollToId('home'); }}>Back to top</a>
        </div>
      </div>
      <footer className="site-footer">
        <span>©{new Date().getFullYear()} <span className="brand-font">ZEXAN </span></span>
        <span> - Verified ✔</span> 
      </footer>
    </section>
  );
}

export default App;