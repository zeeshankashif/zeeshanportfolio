import React, { useState, useEffect } from 'react';
import './App.css';
import { useRepeatableIntersect } from './hooks/useRepeatableIntersect';
const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  // { id: 'grading', label: 'Grading'}, 
  { id: 'about', label: 'About' },
  ];

const EXPERIENCE = [
  { label: 'Web Development ( newbie )', value: 20, years: '2+ months' },
  { label: 'AI Integration', value: 98, years: 'Advanced level' },
  { label: 'UI/UX Design', value: 70, years: 'Intermediate level' },
  { label: 'Error Handling', value: 88, years: 'Advanced level' },
  { label: 'Github & Vercel', value: 85, years: 'Advanced level' },
  { label: 'Lightroom', value: 93, years: 'Expert level' },
];

const WORK_ITEMS = [
  { title: 'Project engineering', detail: 'I prefer to use AI for time efficiency' },
  { title: 'Design systems', detail: 'I can easily translate my thoughts into a "prompt".' },
  { title: 'Collaboration', detail: 'Sure !'},
];

const PROJECTS = [
  {
    name: 'MIZU',
    tag: 'Skincare · Landing',
    blurb: 'Glow from within — shop, journal, and everyday magic.',
    href: 'https://zeeshankashif.github.io/mizu/',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Clock',
      tag: 'Live Clock · UI',
      blurb: 'Analogue and Digital time with smooth transitions.',
      href: 'https://zeeshankashif.github.io/clocked/',
      image:
      'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=1200&q=80',
    },
  ];
   const COLOR_GRADING = [
    { 
      id: 1, 
      title: 'Orange Cat', 
      before: 'flying.jpg', 
      after: 'flyingcg.jpg' 
    },
   
    { 
      id: 2, 
      title: 'Cats', 
      before: 'cats.jpg', 
      after: 'catscg.jpg' 
    },
    { 
    id: 9, 
    title: 'Alcedo Atthis', 
    before: 'bard.jpg', 
    after: 'bardcg.jpg' 
   },
    { 
      id: 4, 
      title: 'BMW M4 G82', 
      before: 'm4.jpg', 
      after: 'm4cg.jpg' 
    },
     { 
      id: 5, 
      title: 'Porsche 911 GT3 RS', 
     before: 'gt3rs.jpg', 
      after: 'gt3rscg.jpg' 
     },
     { 
      id: 6, 
      title: '911 vs 296', 
      before: 'ferr.jpg', 
      after: 'ferrcg.jpg' 
     },
     { 
      id: 7, 
      title: 'Nature', 
     before: 'fiz.jpg', 
      after: 'fizcg.jpg' 
     },
      { 
      id: 8, 
      title: 'Yellow Warbler', 
      before: 'bird.jpg', 
      after: 'birdcg.jpg' 
     },
     { 
     id: 11, 
     title: 'BMW M4 GT3 EVO', 
    before: 'm4gt.jpg', 
     after: 'm4gt3.jpg' 
   },
      { 
      id: 10, 
      title: 'Roxy Dino', 
      before: 'rexy.jpg', 
      after: 'rexycg.jpg' 
     },

    { 
      id: 3, 
      title: 'Home', 
      before: 'home.jpg', 
      after: 'hoomcg.jpg' 
    },
    
     
     
];


function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          ZK
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
        {/* <a className="nav-cta pill" href="#projects" onClick={(e) => { e.preventDefault(); scrollToId('projects'); }}>
          View work
        </a> */}
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
              <span className="mini-stat__num">2+ months</span>
              <span className="mini-stat__cap">of being a Developer</span>
            </div>
            <div className={`mini-stat ${active ? 'mini-stat--in' : ''}`} style={{ '--d': '80ms' }}>
              <span className="mini-stat__num">20+ years</span>
              <span className="mini-stat__cap">of Age</span>
            </div>
            <div className={`mini-stat ${active ? 'mini-stat--in' : ''}`} style={{ '--d': '160ms' }}>
              <span className="mini-stat__num">75.66%</span>
              <span className="mini-stat__cap">Overall Skills</span>
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
        <h2 className="section-title">Assignments</h2>
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

  // Sync with the "Grade All" button
  useEffect(() => {
    setShowAfter(forceShowAfter);
  }, [forceShowAfter]);

  return (
    <article 
      className={`grading-card glass-panel lift ${active ? 'lift--in' : ''}`} 
      style={{ '--i': `${index * 120}ms` }}
      onClick={() => setShowAfter(!showAfter)}
    >
      <div className="photo-card-body">
        <img 
          src={showAfter ? item.after : item.before} 
          alt={item.title} 
        />
        <div className="button-container">
          <button className="pill pill--solid" style={{ fontSize: '0.8rem', padding: '6px 27px' }}>
            {showAfter ? 'After' : 'Before'}
          </button>
        </div>

        <div className="photo-overlay">
          <div className="overlay-content">
             <h3>{item.title}</h3>
             <span className="status-tag">{showAfter ? 'Graded' : 'Raw'}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// --- MAIN SECTION ---
function GradingSection() {
  // Assuming useRepeatableIntersect is defined elsewhere in your project
  const [ref, active] = useRepeatableIntersect(0.15, '0px 0px -8% 0px', true);
  const [globalShowAfter, setGlobalShowAfter] = useState(false);

  const toggleAll = () => setGlobalShowAfter(!globalShowAfter);

  return (
    <section id="grading" className="section" ref={ref}>
      <div className={`section-inner reveal ${active ? 'reveal--in' : ''}`}>
        <p className="eyebrow">Side Skills</p>
        <h2 className="section-title">Color Grading</h2>
          <p className="section-lead">Tap or click on the photos to toggle between RAW and GRADED shots independently. Wait for the graded photos to load on " AFTER MODE " ( View in Dark Mode )</p>
        
        {/* TOP BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '25px', marginTop: '-9px' }}>
          <button className="pill pill--solid" onClick={toggleAll}>
            {globalShowAfter ? 'RAW THEM ALL' : 'GRADE THEM ALL'}
          </button>
        </div>
        
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

        {/* BOTTOM BUTTON */}
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
  return (
    <section id="about" className="section section--footer" ref={ref}>
      <div className={`section-inner reveal ${active ? 'reveal--in' : ''}`}>
        <p className="eyebrow">About</p>
        <h2 className="section-title">Zeeshan Kashif</h2>
        <p className="about-text">
          I love everything that goes FAST & BOOM 
        </p>
        <div className="about-actions">
          <a className="pill pill--solid" href="mailto:zeeshankashif.100m@gmail.com">Email Me</a>
           <a className="pill pill--solid" href="https://github.com/zeeshankashif">Github</a>
          
          {/* NEW CV BUTTON */}
          <a 
            className="pill pill--ghost" 
            href="cv.jpg" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View CV
          </a>

          <a className="pill pill--ghost" href="#home" onClick={(e) => { e.preventDefault(); scrollToId('home'); }}>Back to top</a>
        </div>
      </div>
      <footer className="site-footer">
        <span>©{new Date().getFullYear()} Zeeshan Kashif | Verified ✔</span>
      </footer>
    </section>
  );
}
function App() {
  const [theme, setTheme] = useState('light');
  const [heroRef, heroActive] = useRepeatableIntersect(0.08, '0px', true);

  

  return (
    <div className="page" data-theme={theme}>
      <LiquidBackdrop />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))}
      />

      <main>
        <section id="home" className="hero" ref={heroRef}>
          <div className={`hero-inner reveal ${heroActive ? 'reveal--in' : ''}`}>
            <div className="hero-visual">
              <div className="photo-wrap">
                <img
                  className="hero-photo"
                  src={`${process.env.PUBLIC_URL}/zeezee.jpg`}
                  alt="Zeeshan Kashif"
                  width={340}
                  height={340}
                />
              </div>
            </div>
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">Portfolio</p>
              <h1 className="hero-title">
                Zeeshan Kashif
              </h1>
              <p className="hero-sub">
                  "THE" Web Developer you were looking for ... 
              
              </p>
              <div className="hero-ctas">
                <button type="button" className="pill pill--solid" onClick={() => scrollToId('experience')}>
                  See experience
                </button>
                <button type="button" className="pill pill--solid" onClick={() => scrollToId('projects')}>
                  Browse projects
                </button>
                <a 
                 className="pill pill--ghost" 
                 href="cv.jpg" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                 View CV
                </a>
                <a 
                 className="pill pill--ghost" 
                 href="https://github.com/zeeshankashif" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
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
        <AboutSection />
      </main>
    </div>
  );
}

export default App;
