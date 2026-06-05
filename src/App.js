import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useRepeatableIntersect } from './hooks/useRepeatableIntersect';
import { useMotionValue, useSpring } from 'framer-motion';

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
  { title: 'Collaboration', detail: "Sure ! Let me give you the chance to unlock your full potential by collaborating with me. I promise you won't regret it." },
];

const PROJECTS = [
  { name: 'Real Estate', tag: 'Modern', blurb: 'Minimal and Clean', href: 'https://realestatezexan.vercel.app/', image:'real.avif', },
  { name: 'Toasty', tag: 'AI Cooking', blurb: 'AI Powered Cooking App.', href: 'https://toasty-zexan.vercel.app/', image: 'toasty.avif', },
  { name: 'Sneaky', tag: 'E-Commerce Website', blurb: 'Cool and Stylish', href: 'https://sneaky-zexan.vercel.app/', image: 'sneaky.avif', },
  { name: 'Pixify AI', tag: 'AI Image Editor', blurb: 'Powered by ZEXAN', href: 'https://pixify-zexan.vercel.app/', image: 'pixify.avif', },
  { name: 'Watchout', tag: 'Luxury Watch', blurb: 'Made by ZEXAN', href: 'https://watchout-zexan.vercel.app/', image: 'watch.avif', },
  { name: 'Quantum Synthesis', tag: 'High End Neon', blurb: 'Smooth and Fluid', href: 'https://quantumsynthesis-zexan.vercel.app/', image: 'quantum.avif', },
  { name: 'Motor Works', tag: 'Dealership', blurb: 'Tuned by ZEXAN', href: 'https://motorworks-zexan.vercel.app/', image: 'mw.avif', },
  { name: 'BMW M4', tag: 'Digital Showroom', blurb: 'Tuned by ZEXAN MENCY', href: 'https://bmw-zexan.vercel.app/', image: 'bmw.avif', },
];

const MOTION = [
  { name: 'SERIES 01', tag:'', blurb: '3D MOTION SCROLLING', href: 'https://series01-zexan.vercel.app/', image:'011.avif', backgroundPosition: 'center',backgroundSize: '150%',backgroundRepeat: 'no-repeat' },
  { name: 'MODEL X5', tag: '', blurb: '3D HARDWARE BLUEPRINT', href: 'https://modelx5-zexan.vercel.app/', image: 'model.avif', backgroundPosition: 'center 100%'},
  { name: 'LIQUID INK', tag: '', blurb: '3D INK TRANSITION', href: 'https://liquidink-zexan.vercel.app/', image: 'image.avif', backgroundPosition: 'center 0%'},
  { name: 'GLASS FRACTURE', tag: '', blurb: '3D SHATTER', href: 'https://glassfracture-zexan.vercel.app/', image: '112.avif', backgroundPosition: 'center 14%' },
];

const COLOR_GRADING = [
  { id: 1, title: 'Orange Cat', before: 'org.avif', after: 'orgs.avif' },
  { id: 2, title: 'Cats', before: 'cat.avif', after: 'cts.avif' },
  { id: 3, title: 'Alcedo Atthis', before: 'bir.avif', after: 'birs.avif' },
  { id: 4, title: 'BMW M4 G82', before: 'm482.avif', after: 'm482s.avif' },
  { id: 5, title: 'Porsche 911 GT3 RS', before: 'pit.avif', after: 'pits.avif' },
  { id: 6, title: 'BMW WRT RACING', before: 'wr.avif', after: 'wrs.avif' },
  { id: 7, title: '911 vs 296', before: '911.avif', after: '911s.avif' },
  { id: 8, title: 'BMW M4 GT3 EVO', before: 'es.avif', after: 'e.avif' },
  { id: 9, title: 'Roxy Dino', before: 'rox.avif', after: 'roxs.avif' },
  { id: 10, title: 'Nature', before: 'nat.avif', after: 'nats.avif' },
  { id: 11, title: 'Yellow Warbler', before: 'yell.avif', after: 'yells.avif' },
  { id: 12, title: 'Home', before: 'hom.avif', after: 'homs.avif' },
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
          className="nav-theme-toggle pill pill--ghosts"
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
  const [ref, active] = useRepeatableIntersect(0.12, '0px 0px -4% 0px', true);
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

function MotionSection() {
  const [ref, active] = useRepeatableIntersect(0.12, '0px 0px -4% 0px', true);
  return (
    <section id="motion" className="section" ref={ref}>
      <div className={`section-inner reveal ${active ? 'reveal--in' : ''}`}>
        <h2 className="section-titles">Motion Animated Webites</h2>
        <div className="motion-grid">
          {MOTION.map((p, i) => (
            <a
              key={p.name}
              className={`motion-block lift ${active ? 'lift--in' : ''}`}
              style={{ '--i': `${i * 90}ms` }}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="motion-block__media"
                style={{ 
                  backgroundImage: `url(${p.image})`,
                  backgroundPosition: p.backgroundPosition || 'center'
                }}
                aria-hidden="true"
              />
              <div className="motion-block__scrim" aria-hidden="true" />
              <div className="motion-block__body">
                {p.tag && <span className="motion-block__tag">{p.tag}</span>}
                <h3 className="motion-block__title">{p.name}</h3>
                <p className="motion-block__text">{p.blurb}</p>
                <span className="motion-block__cta">View 3D Motion Site →</span>
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

  const imageSrc = showAfter 
    ? `${process.env.PUBLIC_URL}/${item.after}` 
    : `${process.env.PUBLIC_URL}/${item.before}`;

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
          src={imageSrc} 
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
  const [sectionRef, sectionActive] = useRepeatableIntersect(0.05, '0px 0px -4% 0px', true);
  const [gridRef, gridActive] = useRepeatableIntersect(0.1, '0px 0px -1% 0px', true);
  
  const [globalShowAfter, setGlobalShowAfter] = useState(false);
  const toggleAll = () => setGlobalShowAfter(!globalShowAfter);

  return (
    <section id="grading" className="section" ref={sectionRef}>
      <div className={`section-inner reveal ${sectionActive ? 'reveal--in' : ''}`}>
        <p className="eyebrow">here i&apos;ve showcased my side skill</p>
        <div className="flex items-center gap-3">
          <h2 className="section-title">Color Grading</h2>
          <video autoPlay loop muted playsInline className="video-element">
            <source src="video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="section-lead">Tap or click on the photos to toggle between RAW and GRADED shots independently.</p>
        <p className="section-note">Note : The Color-Graded previews may take a moment to load on &quot;GRADED MODE&quot;.</p>
        <p className="section-note">Tip : View in Dark Mode for a better comparison of the Graded Images.</p>
        <p className="section-note">Software Used : Adobe Lightroom <span className="lr-logo">Lr</span></p>

        <div 
          ref={gridRef}
          className={`card-grid reveal ${gridActive ? 'reveal--in' : ''}`}
          style={{ marginTop: '30px' }}
        >
          {COLOR_GRADING.map((item, i) => (
            <ColorGradeCard 
              key={item.id} 
              item={item} 
              index={i} 
              active={gridActive} 
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

function AboutSection() {
  const [ref, active] = useRepeatableIntersect(0.2, '0px 0px -8% 0px', true);
  
  // Check if the user arrived via the Freelancer link
  const isFreelancer = typeof window !== 'undefined' && 
    new URLSearchParams(window.location.search).get('source') === 'freelancer';

  return (
    <section id="about" className="section section--footer" ref={ref}>
      <div className={`section-inner reveal ${active ? 'reveal--in' : ''}`}>
        <p className="eyebrow">About</p>
        <h2 className="section-title">
          Zeeshan Kashif 
          <span className="flag-container">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg" 
              alt="PK" 
              className="name-flag"
            />
          </span>
        </h2>
        <p className="about-text">I Love everything that goes FAST & BOOM</p>
        
        {/* Only show these details if the user is NOT from Freelancer */}
        {!isFreelancer && (
          <>
            <p className="about-text">Email : zexan.one@gmail.com</p>
            <p className="about-text">Github/Vercel : @zeeshankashif</p>
          </>
        )}

        <div className="about-actions">
          {isFreelancer ? (
            // Freelancer-safe layout: Links directly to your platform profile
            <a 
              className="pill pill--solid" 
              href="YOUR_FREELANCER_PROFILE_URL_HERE" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Hire Me
            </a>
          ) : (
            // Standard layout for general visitors
            <>
              <a className="pill pill--solid" href="mailto:zexan.one@gmail.com">Email Me</a>
              <a className="pill pill--solid" href="https://github.com/zeeshankashif">Github</a>
            </>
          )}
          
          <a href="https://www.linkedin.com/in/zeeshankashif-linked-in" target="_blank" rel="noopener noreferrer" className="pill pill--ghost">LinkedIn</a>
          <a className="pill pill--ghost" href="cv.avif" target="_blank" rel="noopener noreferrer">View CV</a>
        </div>
      </div>
      <footer className="site-footer">
        <span>©{new Date().getFullYear()} <span className="brand-font">ZEXAN </span></span>
        <span> - Verified ✔</span> 
      </footer>
    </section>
  );
}
function App() {
  const [theme, setTheme] = useState('light');
  const [heroRef, heroActive] = useRepeatableIntersect(0.08, '0px', true);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  const maskContainerRef = useRef(null);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 140, mass: 1.0 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const maskSizeValue = useMotionValue(0);
  const smoothSize = useSpring(maskSizeValue, { damping: 40, stiffness: 120 });

  const [dreamyMask, setDreamyMask] = useState("");

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const publicPath = process.env.PUBLIC_URL || '';

    const coreHeroAssets = [
      `${publicPath}/zeezee.avif`,
      `${publicPath}/zexan.avif`
    ];

    const phaseTwoAssets = [
      ...PROJECTS.map(p => p.image),
      ...COLOR_GRADING.flatMap(item => [
        `${publicPath}/${item.before}`,
        `${publicPath}/${item.after}`
      ])
    ];

    const preloadSingleImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => resolve(); 
      });
    };

    const executeQueueBatches = async (urls, batchSize = 6) => {
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        await Promise.all(batch.map(url => preloadSingleImage(url)));
        
        await new Promise(resolve => {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => resolve());
          } else {
            setTimeout(resolve, 30);
          }
        });
      }
    };

    Promise.all(coreHeroAssets.map(url => preloadSingleImage(url)))
      .then(async () => {
        await executeQueueBatches(phaseTwoAssets, 6); 
      });

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => {
      document.body.removeAttribute('data-theme');
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  useEffect(() => {
    maskSizeValue.set(isHeroHovered ? 260 : 0);
  }, [isHeroHovered, maskSizeValue]);

  useEffect(() => {
    const updateHeroMask = () => {
      const size = smoothSize.get();
      const featherStart = size * 0.40; 
      const maskString = `radial-gradient(circle ${size}px at ${smoothX.get()}px ${smoothY.get()}px, black ${featherStart}px, transparent 100%)`;
      setDreamyMask(maskString);
    };

    const unsubX = smoothX.on("change", updateHeroMask);
    const unsubSize = smoothSize.on("change", updateHeroMask);
    const unsubYReal = smoothY.on("change", updateHeroMask);

    return () => {
      unsubX();
      unsubSize();
      unsubYReal();
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
    <>
      <div className="page" data-theme={theme} style={{ overflowX: 'hidden', width: '100%' }}>
        <LiquidBackdrop />
        <Navbar theme={theme} onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))} />
        <main style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
          <div className={`app-entrance-wrapper ${(heroActive && heroImageLoaded) ? 'entrance-ready' : 'entrance-loading'}`} style={{ width: '100%' }}>
            {installPrompt && (
              <div className="install-banner mobile-only-install">
                <span>Install App for a better experience !</span>
                <div className="banner-btns">
                  <button onClick={handleInstallClick} className="pill pill--ghostt">Install</button>
                  <button onClick={() => setInstallPrompt(null)} className="close-btn">✕</button>
                </div>
              </div>
            )}

            <section id="home" className="hero" ref={heroRef}>
              <div className={`hero-inner reveal ${(heroActive && heroImageLoaded) ? 'reveal--in' : ''}`}>
                <div ref={maskContainerRef} onMouseMove={handleHeroMouseMove} onMouseEnter={() => setIsHeroHovered(true)} onMouseLeave={() => setIsHeroHovered(false)} className="hero-visual" style={{ position: 'relative' }}>
                  <div className="hero-avatar-frame">
                    <div style={{ position: 'absolute', inset: 0, opacity: 1, zIndex: 1, transition: 'opacity 0.7s ease' }}>
                      <img 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} 
                        src={`${process.env.PUBLIC_URL}/zeezee.avif`} 
                        alt="Zeeshan Kashif Genuine" 
                        onLoad={() => setHeroImageLoaded(true)}
                      />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', maskImage: dreamyMask, WebkitMaskImage: dreamyMask, opacity: isHeroHovered ? 1 : 0, filter: isHeroHovered ? "blur(0px) contrast(100%)" : "blur(40px)", transition: 'opacity 0.7s ease, filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                      <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} src={`${process.env.PUBLIC_URL}/zexan.avif`} alt="ZEXAN Brand Reveal Overlay" />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', zIndex: 3, border: '1px solid rgba(255,255,255,0.12)', pointerEvents: 'none', opacity: isHeroHovered ? 1 : 0.4, transition: 'opacity 0.5s ease' }} />
                  </div>
                </div>
                <div className="hero-copy">
                  <p className="eyebrow hero-eyebrow">Portfolio</p>
                  <h1 className="hero-title">Zeeshan Kashif</h1>
                  <p className="hero-sub">&quot;THE&quot; Web Developer you were looking for ...</p>
                  <div className="hero-ctas">
                    <button type="button" className="pill pill--solid" onClick={() => scrollToId('experience')}>Experience</button>
                                        <button type="button" className="pill pill--solid" onClick={() => scrollToId('projects')}>Projects</button>


<a href="https://www.linkedin.com/in/zeeshankashif-linked-in" target="_blank" rel="noopener noreferrer" className="pill pill--ghost">LinkedIn</a> 
<a className="pill pill--ghost" href="cv.avif"target="_blank" rel="noopener noreferrer">View CV</a>
                 
                    {!isMobile && (<p className="pill pill--solidd">HOVER ON THE PHOTO TO ILLUMINATE MY DREAM !</p>)}
                  </div>
                </div>
              </div>
            </section>

            <ExperienceSection />
            <WorkSection />
            <ProjectsSection />
            <MotionSection />
            <GradingSection />
            <div className="section-divider" aria-hidden="true" />
            <AboutSection />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;