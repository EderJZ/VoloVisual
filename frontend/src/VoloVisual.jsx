import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const gold = "#C9A84C";
const goldLight = "#E8C97A";
const goldDim = "rgba(201,168,76,0.15)";
const white = "#F5F2EC";
const gray = "#9A9690";
const dark = "#0A0A0A";
const dark2 = "#111111";
const dark3 = "#181818";

/* ─────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Montserrat:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: ${dark};
    color: ${white};
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
    cursor: none;
    margin: 0; padding: 0;
  }

  a, button { cursor: none; }

  @media (max-width: 900px) {
    body { cursor: auto; }
    a, button { cursor: auto; }
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scanline {
    0%, 100% { opacity: 0.3; transform: translateY(0); }
    50%       { opacity: 0.7; transform: translateY(-2px); }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(0.8); }
    50%       { opacity: 1;   transform: scaleY(1); }
  }
  @keyframes menuSlideDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .anim-fade-up-0 { opacity: 0; animation: fadeUp 1s ease 0.3s forwards; }
  .anim-fade-up-1 { opacity: 0; animation: fadeUp 1s ease 0.5s forwards; }
  .anim-fade-up-2 { opacity: 0; animation: fadeUp 1s ease 0.7s forwards; }
  .anim-fade-up-3 { opacity: 0; animation: fadeUp 1s ease 0.9s forwards; }
  .anim-fade-up-4 { opacity: 0; animation: fadeUp 1s ease 1.1s forwards; }
  .anim-fade-up-5 { opacity: 0; animation: fadeUp 1s ease 1.5s forwards; }

  .hero-scanline {
    position: absolute; left: 0; right: 0; top: 50%;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.3) 70%, transparent 100%);
    animation: scanline 6s ease-in-out infinite;
  }

  .scroll-line-anim { animation: scrollPulse 2s ease-in-out infinite; }

  /* ── Reveal on scroll ── */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  /* ── Servico card hover bar ── */
  .servico-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${gold}, transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  .servico-card:hover::before { transform: scaleX(1); }

  /* ── Section label line ── */
  .section-label-line::before {
    content: '';
    display: block;
    width: 32px; height: 1px;
    background: ${gold};
  }

  /* ── Portfolio hover ── */
  .portfolio-item:hover .port-bg { transform: scale(1.04); }
  .portfolio-item:hover .port-overlay { opacity: 1; }
  .portfolio-item:hover .port-info { transform: translateY(0); opacity: 1; }
  .portfolio-item:hover .port-icon { opacity: 0.1; }

  /* ── Nav link underline ── */
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0; right: 0;
    height: 1px;
    background: ${gold};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .nav-link:hover::after { transform: scaleX(1); }
  .nav-link:hover { color: ${gold} !important; }

  /* ── Processo line ── */
  .processo-steps::before {
    content: '';
    position: absolute;
    top: 32px; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 20%, rgba(201,168,76,0.3) 80%, transparent);
  }

  /* ── Form inputs ── */
  .volo-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(201,168,76,0.2);
    padding: 12px 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.88rem;
    color: ${white};
    outline: none;
    transition: border-color 0.3s;
    font-weight: 300;
    width: 100%;
  }
  .volo-input::placeholder { color: rgba(154,150,144,0.5); }
  .volo-input:focus { border-color: ${gold}; }
  .volo-input option { background: ${dark2}; color: ${white}; }

  /* ── Cursor ── */
  #volo-cursor {
    position: fixed;
    width: 10px; height: 10px;
    background: ${gold};
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    mix-blend-mode: difference;
  }
  #volo-ring {
    position: fixed;
    width: 36px; height: 36px;
    border: 1px solid rgba(201,168,76,0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${dark}; }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); }

  /* ── Mobile menu ── */
  .mobile-menu-open {
    animation: menuSlideDown 0.35s ease forwards;
  }
`;

/* ─────────────────────────────────────────
   RESPONSIVE CSS
───────────────────────────────────────── */
const RESPONSIVE_CSS = `
  /* ── Tablet (≤ 900px) ── */
  @media (max-width: 900px) {
    /* Cursor off */
    #volo-cursor, #volo-ring { display: none !important; }

    /* Section padding */
    section { padding-left: 24px !important; padding-right: 24px !important; padding-top: 90px !important; padding-bottom: 90px !important; }

    /* Navbar */
    nav { padding: 16px 24px !important; }
    .nav-desktop-links { display: none !important; }
    .nav-desktop-cta   { display: none !important; }
    .nav-hamburger     { display: flex !important; }

    /* Hero */
    .hero-content-inner { padding: 0 16px !important; }

    /* Sobre */
    .sobre-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .sobre-badge { right: 0 !important; bottom: -20px !important; }

    /* Serviços */
    .servicos-grid-resp { grid-template-columns: 1fr !important; gap: 2px !important; }

    /* Portfolio — empilha tudo em 1 coluna */
    .portfolio-grid { display: flex !important; flex-direction: column !important; gap: 3px !important; }
    .portfolio-grid > div { min-height: 220px !important; }

    /* Processo */
    .processo-steps { grid-template-columns: 1fr !important; gap: 40px !important; }
    .processo-steps::before { display: none !important; }
    .processo-steps > div { padding: 0 !important; }

    /* Videos */
    .video-grid-resp { grid-template-columns: 1fr !important; gap: 48px !important; }

    /* Contato */
    .contato-grid-resp { grid-template-columns: 1fr !important; gap: 50px !important; }
    .contato-form-row  { grid-template-columns: 1fr !important; }

    /* Footer */
    .footer-grid-resp { grid-template-columns: 1fr !important; gap: 32px !important; }
    .footer-bottom    { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
  }

  /* ── Small mobile (≤ 480px) ── */
  @media (max-width: 480px) {
    section { padding-left: 16px !important; padding-right: 16px !important; padding-top: 72px !important; padding-bottom: 72px !important; }
    nav { padding: 14px 16px !important; }

    /* Hero text scaling */
    .hero-content-inner h1 { font-size: clamp(2.4rem, 12vw, 4rem) !important; }
    .hero-content-inner p  { font-size: 0.82rem !important; }
    .hero-btns { flex-direction: column !important; align-items: center !important; }
    .hero-btns a { width: 100% !important; text-align: center !important; }

    /* Sobre stat badge */
    .sobre-badge { position: static !important; margin-top: 16px !important; display: inline-block !important; }

    /* Serviços card padding */
    .servico-card { padding: 32px 24px !important; }

    /* Processo */
    .processo-steps { grid-template-columns: 1fr !important; }

    /* Formulário botão */
    .contato-submit { width: 100% !important; text-align: center !important; }

    /* Footer socials */
    .footer-bottom { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
  }
`;

/* ─────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────── */
const DroneIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="6" stroke={gold} strokeWidth="1.5"/>
    <line x1="18" y1="24" x2="4" y2="24" stroke={gold} strokeWidth="1.5"/>
    <line x1="30" y1="24" x2="44" y2="24" stroke={gold} strokeWidth="1.5"/>
    <line x1="24" y1="18" x2="24" y2="4" stroke={gold} strokeWidth="1.5"/>
    <line x1="24" y1="30" x2="24" y2="44" stroke={gold} strokeWidth="1.5"/>
    <circle cx="4" cy="24" r="4" stroke={gold} strokeWidth="1.5"/>
    <circle cx="44" cy="24" r="4" stroke={gold} strokeWidth="1.5"/>
    <circle cx="24" cy="4" r="4" stroke={gold} strokeWidth="1.5"/>
    <circle cx="24" cy="44" r="4" stroke={gold} strokeWidth="1.5"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="14" width="32" height="22" rx="1" stroke={gold} strokeWidth="1.5"/>
    <path d="M20 14L24 8L28 14" stroke={gold} strokeWidth="1.5"/>
    <circle cx="24" cy="25" r="6" stroke={gold} strokeWidth="1.5"/>
    <circle cx="24" cy="25" r="2" fill={gold} opacity="0.5"/>
  </svg>
);

const PhotoIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="8" width="36" height="32" rx="1" stroke={gold} strokeWidth="1.5"/>
    <line x1="6" y1="18" x2="42" y2="18" stroke={gold} strokeWidth="0.75"/>
    <rect x="12" y="24" width="10" height="10" stroke={gold} strokeWidth="1"/>
    <line x1="28" y1="26" x2="36" y2="26" stroke={gold} strokeWidth="1"/>
    <line x1="28" y1="30" x2="34" y2="30" stroke={gold} strokeWidth="1"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="16" stroke={gold} strokeWidth="1.5"/>
    <path d="M24 8 Q32 16 32 24 Q32 32 24 40 Q16 32 16 24 Q16 16 24 8Z" stroke={gold} strokeWidth="1"/>
    <line x1="8" y1="24" x2="40" y2="24" stroke={gold} strokeWidth="0.75"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="14" y="6" width="20" height="36" rx="2" stroke={gold} strokeWidth="1.5"/>
    <circle cx="24" cy="36" r="3" stroke={gold} strokeWidth="1"/>
    <line x1="20" y1="12" x2="28" y2="12" stroke={gold} strokeWidth="1"/>
    <line x1="18" y1="18" x2="30" y2="18" stroke={gold} strokeWidth="1"/>
  </svg>
);

const TriangleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M8 36 L24 12 L40 36 Z" stroke={gold} strokeWidth="1.5" fill="none"/>
    <line x1="16" y1="28" x2="32" y2="28" stroke={gold} strokeWidth="1"/>
    <circle cx="24" cy="20" r="3" stroke={gold} strokeWidth="1"/>
  </svg>
);

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

/* Custom Cursor */
function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mx = useRef(0), my = useRef(0);
  const rx = useRef(0), ry = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mx.current = e.clientX; my.current = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);

    function animateRing() {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + "px";
        ringRef.current.style.top = ry.current + "px";
      }
      rafRef.current = requestAnimationFrame(animateRing);
    }
    rafRef.current = requestAnimationFrame(animateRing);

    const grow = (el) => {
      el.addEventListener("mouseenter", () => {
        cursorRef.current && Object.assign(cursorRef.current.style, { width: "16px", height: "16px" });
        ringRef.current && Object.assign(ringRef.current.style, { width: "56px", height: "56px", opacity: "0.7" });
      });
      el.addEventListener("mouseleave", () => {
        cursorRef.current && Object.assign(cursorRef.current.style, { width: "10px", height: "10px" });
        ringRef.current && Object.assign(ringRef.current.style, { width: "36px", height: "36px", opacity: "1" });
      });
    };
    document.querySelectorAll("a, button, .servico-card, .portfolio-item, .depoimento-card").forEach(grow);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div id="volo-cursor" ref={cursorRef} />
      <div id="volo-ring" ref={ringRef} />
    </>
  );
}

/* ── Hamburger Icon ── */
function HamburgerIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
      <line
        x1="3" y1={open ? "12" : "6"} x2="21" y2={open ? "12" : "6"}
        stroke={gold} strokeWidth="1.5"
        style={{ transition: "all 0.3s ease", transformOrigin: "center", transform: open ? "rotate(45deg)" : "none" }}
      />
      <line
        x1="3" y1="12" x2="21" y2="12"
        stroke={gold} strokeWidth="1.5"
        style={{ transition: "all 0.3s ease", opacity: open ? 0 : 1 }}
      />
      <line
        x1="3" y1={open ? "12" : "18"} x2="21" y2={open ? "12" : "18"}
        stroke={gold} strokeWidth="1.5"
        style={{ transition: "all 0.3s ease", transformOrigin: "center", transform: open ? "rotate(-45deg)" : "none" }}
      />
    </svg>
  );
}

/* Navbar */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Bloqueia scroll do body quando menu aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = ["Sobre", "Serviços", "Portfólio", "Processo", "Contato"];
  const getHref = (l) => `#${l.toLowerCase().replace("ó","o").replace("ç","c").replace("í","i")}`;

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "18px 60px" : "28px 60px",
          background: scrolled || menuOpen
            ? "rgba(8,8,8,0.98)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)",
          borderBottom: (scrolled || menuOpen) ? "1px solid rgba(201,168,76,0.12)" : "none",
          backdropFilter: (scrolled || menuOpen) ? "blur(12px)" : "none",
          transition: "padding 0.4s ease, background 0.4s ease",
        }}
      >
        {/* Logo */}
        <a href="#hero" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.1rem", letterSpacing: "0.15em", color: gold, textDecoration: "none", zIndex: 201 }}>
          VOLO <span style={{ color: white }}>VISUAL</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-desktop-links" style={{ display: "flex", gap: 40, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((l) => (
            <li key={l}>
              <a
                href={getHref(l)}
                className="nav-link"
                style={{
                  fontFamily: "'Cinzel', serif", fontSize: "0.68rem", letterSpacing: "0.22em",
                  textTransform: "uppercase", color: gray, textDecoration: "none",
                  position: "relative", transition: "color 0.3s",
                }}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contato"
          className="nav-desktop-cta"
          style={{
            fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: dark, background: gold,
            padding: "10px 22px", textDecoration: "none", transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = goldLight)}
          onMouseLeave={(e) => (e.target.style.background = gold)}
        >
          Orçamento
        </a>

        {/* Hamburger button — visível só no mobile via CSS */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          style={{
            display: "none", // CSS override para mobile
            background: "none", border: "none", padding: 8,
            alignItems: "center", justifyContent: "center",
            zIndex: 201,
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-open"
          style={{
            position: "fixed", inset: 0, zIndex: 190,
            background: "rgba(8,8,8,0.98)",
            backdropFilter: "blur(16px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 0,
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0, textAlign: "center", width: "100%" }}>
            {links.map((l, i) => (
              <li key={l} style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                <a
                  href={getHref(l)}
                  onClick={(e) => { e.preventDefault(); handleNavClick(getHref(l)); }}
                  style={{
                    display: "block", padding: "22px 40px",
                    fontFamily: "'Cinzel', serif", fontSize: "1rem", letterSpacing: "0.3em",
                    textTransform: "uppercase", color: white, textDecoration: "none",
                    transition: "color 0.3s",
                    animationDelay: `${i * 0.06}s`,
                  }}
                  onMouseEnter={(e) => (e.target.style.color = gold)}
                  onMouseLeave={(e) => (e.target.style.color = white)}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          {/* CTA no menu mobile */}
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contato"); }}
            style={{
              marginTop: 40,
              fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.25em",
              textTransform: "uppercase", color: dark, background: gold,
              padding: "16px 48px", textDecoration: "none",
            }}
          >
            Solicitar Orçamento
          </a>
          {/* Contato rápido */}
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>Contato Rápido</p>
            <a href="mailto:contato@volovisual.com" style={{ fontSize: "0.8rem", color: gray, textDecoration: "none", display: "block", marginBottom: 6 }}>contato@volovisual.com</a>
            <a href="tel:+5541999990000" style={{ fontSize: "0.8rem", color: gray, textDecoration: "none" }}>+55 (41) 99999-0000</a>
          </div>
        </div>
      )}
    </>
  );
}

/* Hero */
function Hero() {
  useEffect(() => {
    const hero = document.querySelector(".hero-content-inner");
    const onScroll = () => {
      if (hero) hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* BG */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%), linear-gradient(160deg, #0A0A0A 30%, #111108 70%, #0A0A0A 100%)",
      }} />
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
      }} />
      {/* Scanline */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div className="hero-scanline" />
      </div>

      {/* Content */}
      <div className="hero-content-inner" style={{ position: "relative", textAlign: "center", zIndex: 2, padding: "0 20px", width: "100%" }}>
        <p className="anim-fade-up-0" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.5em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>
          Produções Aéreas · Curitiba, Brasil
        </p>

        <h1 className="anim-fade-up-1" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(2.8rem, 10vw, 7rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "0.05em", marginBottom: 12 }}>
          VOLO <span style={{ color: gold }}>VISUAL</span>
        </h1>

        <p className="anim-fade-up-2" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(0.9rem, 3vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.35em", color: gray, textTransform: "uppercase", marginBottom: 48 }}>
          Cinematografia Aérea
        </p>

        <p className="anim-fade-up-3" style={{ fontSize: "0.9rem", letterSpacing: "0.08em", color: gray, maxWidth: 460, margin: "0 auto 56px", lineHeight: 1.9 }}>
          Capturamos o mundo de perspectivas que nenhum outro equipamento alcança. Filmagem em 4K e 8K com drones de alta performance.
        </p>

        <div className="anim-fade-up-4 hero-btns" style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", padding: "0 16px" }}>
          <a href="#portfolio"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: dark, background: gold, padding: "16px 36px", textDecoration: "none", transition: "all 0.3s", display: "inline-block" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = goldLight; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = ""; }}
          >
            Ver Portfólio
          </a>
          <a href="#contato"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: gold, border: "1px solid rgba(201,168,76,0.4)", padding: "16px 36px", textDecoration: "none", transition: "all 0.3s", display: "inline-block" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = "rgba(201,168,76,0.05)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.background = ""; e.currentTarget.style.transform = ""; }}
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="anim-fade-up-5" style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: gray }}>Scroll</span>
        <div className="scroll-line-anim" style={{ width: 1, height: 50, background: `linear-gradient(to bottom, ${gold}, transparent)` }} />
      </div>
    </section>
  );
}

/* Section Label */
function SectionLabel({ children, centered }) {
  return (
    <p className={`reveal section-label-line`} style={{
      fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.5em",
      textTransform: "uppercase", color: gold, marginBottom: 20,
      display: "flex", alignItems: "center", gap: 16,
      justifyContent: centered ? "center" : undefined,
    }}>
      {children}
    </p>
  );
}

/* Section Title */
function SectionTitle({ children, centered, delay }) {
  return (
    <h2 className={`reveal${delay ? ` reveal-delay-${delay}` : ""}`} style={{
      fontFamily: "'Cinzel', serif", fontSize: "clamp(1.6rem, 4vw, 3rem)", fontWeight: 600,
      lineHeight: 1.2, letterSpacing: "0.05em", marginBottom: 24,
      textAlign: centered ? "center" : undefined,
    }}>
      {children}
    </h2>
  );
}

/* Sobre */
function Sobre() {
  const valores = [
    { n: "01", t: "Precisão", d: "Cada frame é planejado e executado com exatidão milimétrica." },
    { n: "02", t: "Criatividade", d: "Perspectivas únicas que contam histórias visuais inesquecíveis." },
    { n: "03", t: "Qualidade", d: "Equipamentos profissionais e entrega em ultra-alta definição." },
    { n: "04", t: "Confiança", d: "Pilotos certificados pela ANAC e seguros em todas as operações." },
  ];

  return (
    <section id="sobre" style={{ padding: "140px 60px", background: dark2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }} className="sobre-grid">
        {/* Visual */}
        <div className="reveal" style={{ position: "relative" }}>
          <div style={{ aspectRatio: "4/5", background: dark3, border: "1px solid rgba(201,168,76,0.15)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -1, left: -1, width: 60, height: 60, borderTop: `2px solid ${gold}`, borderLeft: `2px solid ${gold}` }} />
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 60, height: 60, borderBottom: `2px solid ${gold}`, borderRight: `2px solid ${gold}` }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.12 }}>
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="16" stroke={gold} strokeWidth="1.5"/>
                <line x1="84" y1="100" x2="20" y2="100" stroke={gold} strokeWidth="1.5"/>
                <line x1="116" y1="100" x2="180" y2="100" stroke={gold} strokeWidth="1.5"/>
                <line x1="100" y1="84" x2="100" y2="20" stroke={gold} strokeWidth="1.5"/>
                <line x1="100" y1="116" x2="100" y2="180" stroke={gold} strokeWidth="1.5"/>
                <circle cx="20" cy="100" r="14" stroke={gold} strokeWidth="1.5"/>
                <circle cx="180" cy="100" r="14" stroke={gold} strokeWidth="1.5"/>
                <circle cx="100" cy="20" r="14" stroke={gold} strokeWidth="1.5"/>
                <circle cx="100" cy="180" r="14" stroke={gold} strokeWidth="1.5"/>
                <ellipse cx="100" cy="100" rx="44" ry="44" stroke={gold} strokeWidth="0.5" strokeDasharray="4 4"/>
              </svg>
            </div>
            <svg width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
              <defs>
                <radialGradient id="rg1" cx="40%" cy="60%">
                  <stop offset="0%" stopColor={gold} stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#000" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <rect width="400" height="500" fill="#0a0a0a"/>
              <rect x="0" y="0" width="400" height="500" fill="url(#rg1)"/>
              <line x1="0" y1="250" x2="400" y2="250" stroke={gold} strokeWidth="0.5" opacity="0.3"/>
              <line x1="200" y1="0" x2="200" y2="500" stroke={gold} strokeWidth="0.5" opacity="0.3"/>
              <circle cx="200" cy="250" r="80" stroke={gold} strokeWidth="0.5" fill="none" opacity="0.2"/>
              <circle cx="200" cy="250" r="40" stroke={gold} strokeWidth="0.5" fill="none" opacity="0.3"/>
              <circle cx="200" cy="250" r="8" fill={gold} opacity="0.4"/>
            </svg>
          </div>
          {/* Stat badge */}
          <div className="sobre-badge" style={{ position: "absolute", bottom: 30, right: -30, background: dark, border: "1px solid rgba(201,168,76,0.2)", padding: "24px 30px" }}>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "2.5rem", color: gold, lineHeight: 1 }}>+120</div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: gray, marginTop: 6 }}>Projetos Realizados</div>
          </div>
        </div>

        {/* Text */}
        <div>
          <SectionLabel>Nossa História</SectionLabel>
          <SectionTitle delay={1}>Onde Arte e<br/>Tecnologia <span style={{ color: gold }}>Voam</span></SectionTitle>
          <p className="reveal reveal-delay-2" style={{ fontSize: "0.92rem", lineHeight: 2, color: gray, marginBottom: 20 }}>
            A Volo Visual nasceu da paixão por capturar o mundo de perspectivas impossíveis. Unimos tecnologia de ponta com sensibilidade cinematográfica para criar imagens que transcendem o ordinário.
          </p>
          <p className="reveal reveal-delay-3" style={{ fontSize: "0.92rem", lineHeight: 2, color: gray, marginBottom: 48 }}>
            Nossa equipe de pilotos certificados e cinegrafistas profissionais domina cada detalhe da captação aérea — do planejamento de voo à entrega final em 4K ou 8K.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {valores.map((v, i) => (
              <div key={v.n} className={`reveal reveal-delay-${i + 1}`}
                style={{ padding: 20, border: "1px solid rgba(201,168,76,0.1)", transition: "border-color 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)"}
              >
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.5rem", color: gold, opacity: 0.6, marginBottom: 6 }}>{v.n}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{v.t}</div>
                <div style={{ fontSize: "0.78rem", color: gray, lineHeight: 1.7 }}>{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Serviços */
const servicos = [
  { n: "01", title: "Filmagem Aérea com Drone", desc: "Captação aérea profissional em 4K e 8K, com estabilização avançada e planejamento de voo personalizado para cada projeto.", Icon: DroneIcon },
  { n: "02", title: "Produção Cinematográfica", desc: "Produções completas com direção de fotografia, iluminação e edição. Spots publicitários, clipes musicais e documentários.", Icon: CameraIcon },
  { n: "03", title: "Fotografia Aérea", desc: "Imagens estáticas de alta resolução para arquitetura, imóveis, eventos e registros geográficos com tratamento profissional.", Icon: PhotoIcon },
  { n: "04", title: "Mapeamento e Inspeção", desc: "Levantamentos topográficos, ortomosaicos e inspeções técnicas em estruturas e áreas de difícil acesso.", Icon: GlobeIcon },
  { n: "05", title: "Cobertura de Eventos", desc: "Casamentos, shows, festivais e eventos corporativos com cobertura aérea em tempo real, transmissão ao vivo disponível.", Icon: PhoneIcon },
  { n: "06", title: "Pós-Produção e Color", desc: "Edição avançada, correção de cor cinematográfica, efeitos visuais e masterização para broadcast, streaming e cinema.", Icon: TriangleIcon },
];

function Servicos() {
  return (
    <section id="servicos" style={{ padding: "140px 60px", background: dark }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, flexWrap: "wrap", gap: 20 }}>
          <div>
            <SectionLabel>O Que Fazemos</SectionLabel>
            <SectionTitle delay={1}>Nossos <span style={{ color: gold }}>Serviços</span></SectionTitle>
          </div>
          <a href="#contato" className="reveal reveal-delay-2"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: gold, border: "1px solid rgba(201,168,76,0.4)", padding: "16px 36px", textDecoration: "none", transition: "all 0.3s", display: "inline-block" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = "rgba(201,168,76,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.background = ""; }}
          >
            Solicitar Proposta
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }} className="servicos-grid-resp">
          {servicos.map((s, i) => (
            <div key={s.n} className={`servico-card reveal${i % 3 > 0 ? ` reveal-delay-${i % 3}` : ""}`}
              style={{ background: dark3, padding: "48px 40px", position: "relative", overflow: "hidden", transition: "background 0.4s", border: "1px solid rgba(201,168,76,0.06)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#151515"}
              onMouseLeave={(e) => e.currentTarget.style.background = dark3}
            >
              <div style={{ position: "absolute", top: 40, right: 36, fontFamily: "'Cinzel Decorative', serif", fontSize: "3.5rem", color: "rgba(201,168,76,0.06)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ marginBottom: 32, opacity: 0.7 }}><s.Icon /></div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", letterSpacing: "0.05em", marginBottom: 16 }}>{s.title}</h3>
              <p style={{ fontSize: "0.82rem", color: gray, lineHeight: 1.9, marginBottom: 32 }}>{s.desc}</p>
              <a href="#contato" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold, textDecoration: "none", display: "flex", alignItems: "center", gap: 10, transition: "gap 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.gap = "16px"}
                onMouseLeave={(e) => e.currentTarget.style.gap = "10px"}
              >
                Saiba mais →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Portfolio */
const portfolioItems = [
  { pat: "radial-gradient(ellipse at 30% 70%, rgba(201,168,76,0.12) 0%, transparent 60%), #0e0e0e", cat: "Produção Imobiliária", name: "Residencial Alto da Serra", col: "span 7", row: "span 2", minH: 460 },
  { pat: "linear-gradient(135deg, #0d0d0d 0%, #141410 100%)", cat: "Eventos", name: "Festival Cultura Viva", col: "span 5", minH: 220 },
  { pat: "radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.08) 0%, transparent 60%), #0e0e0e", cat: "Publicidade", name: "Campanha Natureza Viva", col: "span 5", minH: 220 },
  { pat: "#0d0d0d", cat: "Mapeamento", name: "Levantamento Industrial", col: "span 4", minH: 220 },
  { pat: "linear-gradient(45deg, #0c0c0c 0%, #131310 100%)", cat: "Casamento", name: "Fazenda Santa Luzia", col: "span 4", minH: 220 },
  { pat: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%), #0e0e0e", cat: "Documentário", name: "Litoral Paranaense", col: "span 4", minH: 220 },
];

function Portfolio() {
  return (
    <section id="portfolio" style={{ padding: "140px 60px", background: dark2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, flexWrap: "wrap", gap: 20 }}>
          <div>
            <SectionLabel>Trabalhos Recentes</SectionLabel>
            <SectionTitle delay={1}>Nosso <span style={{ color: gold }}>Portfólio</span></SectionTitle>
          </div>
          <a href="#contato" className="reveal reveal-delay-2"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: gold, border: "1px solid rgba(201,168,76,0.4)", padding: "16px 36px", textDecoration: "none", transition: "all 0.3s", display: "inline-block" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = "rgba(201,168,76,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.background = ""; }}
          >
            Ver Todos os Projetos
          </a>
        </div>

        {/* Grid desktop / lista mobile via classe */}
        <div className="reveal portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 3 }}>
          {portfolioItems.map((item, i) => (
            <div key={i} className="portfolio-item"
              style={{ gridColumn: item.col, gridRow: item.row, minHeight: item.minH, position: "relative", overflow: "hidden", background: dark3 }}
            >
              <div className="port-bg" style={{ position: "absolute", inset: 0, background: item.pat, transition: "transform 0.6s ease" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="port-icon" style={{ opacity: 0.06, transition: "opacity 0.4s" }}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="30" stroke={gold} strokeWidth="0.75"/>
                    <circle cx="40" cy="40" r="15" stroke={gold} strokeWidth="0.5"/>
                    <line x1="10" y1="40" x2="70" y2="40" stroke={gold} strokeWidth="0.4"/>
                    <line x1="40" y1="10" x2="40" y2="70" stroke={gold} strokeWidth="0.4"/>
                  </svg>
                </div>
              </div>
              <div className="port-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)", opacity: 0, transition: "opacity 0.4s" }} />
              <div className="port-info" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 32, transform: "translateY(10px)", opacity: 0, transition: "all 0.4s" }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: gold, marginBottom: 8 }}>{item.cat}</p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", letterSpacing: "0.08em" }}>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Processo */
const steps = [
  { n: "01", t: "Briefing e Planejamento", d: "Entendemos sua visão, definimos objetivos, analisamos locações e elaboramos o plano de voo e produção completo." },
  { n: "02", t: "Pré-Produção", d: "Licenças, autorizações ANAC, reconhecimento do terreno, preparação de equipamentos e equipe técnica." },
  { n: "03", t: "Captação", d: "Operação de voo com drones de alto desempenho, câmeras profissionais e monitoramento em tempo real." },
  { n: "04", t: "Entrega Final", d: "Edição, correção de cor, masterização e entrega nos formatos solicitados dentro do prazo acordado." },
];

function Processo() {
  return (
    <section id="processo" style={{ padding: "140px 60px", background: dark }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <SectionLabel centered>Como Trabalhamos</SectionLabel>
          <SectionTitle centered delay={1}>Nosso <span style={{ color: gold }}>Processo</span></SectionTitle>
        </div>
        <div className="processo-steps" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 80, position: "relative" }}>
          {steps.map((s, i) => (
            <div key={s.n} className={`reveal${i > 0 ? ` reveal-delay-${i}` : ""}`} style={{ padding: "0 32px" }}>
              <div style={{ width: 64, height: 64, border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel Decorative', serif", fontSize: "1.1rem", color: gold, marginBottom: 32, background: dark, position: "relative", zIndex: 1 }}>
                {s.n}
              </div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: 14 }}>{s.t}</h3>
              <p style={{ fontSize: "0.8rem", color: gray, lineHeight: 1.9 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Videos */
const videos = [
  {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Título do Vídeo 1",
    desc: "Descrição breve do projeto — localização, tipo de produção ou cliente.",
    label: "Produção Aérea",
  },
  {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Título do Vídeo 2",
    desc: "Descrição breve do projeto — localização, tipo de produção ou cliente.",
    label: "Cinematografia",
  },
];

function Videos() {
  return (
    <section id="depoimentos" style={{ padding: "140px 60px", background: dark2, overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <SectionLabel centered>Nosso Trabalho</SectionLabel>
          <SectionTitle centered delay={1}>Produções em <span style={{ color: gold }}>Destaque</span></SectionTitle>
          <p className="reveal reveal-delay-2" style={{ fontSize: "0.88rem", color: gray, lineHeight: 1.9, maxWidth: 480, margin: "0 auto" }}>
            Veja como transformamos visões em produções cinematográficas aéreas únicas.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="video-grid-resp">
          {videos.map((v, i) => (
            <div key={i} className={`reveal${i > 0 ? " reveal-delay-1" : ""}`}>
              <div style={{ position: "relative", border: "1px solid rgba(201,168,76,0.15)", background: dark3 }}>
                <div style={{ position: "absolute", top: -1, left: -1, width: 28, height: 28, borderTop: `1px solid ${gold}`, borderLeft: `1px solid ${gold}`, zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -1, right: -1, width: 28, height: 28, borderBottom: `1px solid ${gold}`, borderRight: `1px solid ${gold}`, zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                  <iframe
                    src={v.url}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              </div>
              <div style={{ padding: "24px 4px 0" }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>{v.label}</p>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", letterSpacing: "0.05em", marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: "0.82rem", color: gray, lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Contato */
function Contato() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: "", empresa: "", email: "", servico: "", mensagem: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ nome: "", empresa: "", email: "", servico: "", mensagem: "" }); }, 3500);
  };

  const inputStyle = { background: "transparent", border: "none", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "12px 0", fontFamily: "'Montserrat', sans-serif", fontSize: "0.88rem", color: white, outline: "none", transition: "border-color 0.3s", fontWeight: 300, width: "100%" };
  const labelStyle = { fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: gray };

  const contactInfos = [
    { label: "E-mail", value: "contato@volovisual.com", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3h12v10H3z" stroke={gold} strokeWidth="1"/><path d="M3 3l6 5 6-5" stroke={gold} strokeWidth="1"/></svg> },
    { label: "Telefone / WhatsApp", value: "+55 (41) 99999-0000", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3c0 8 4 12 12 12l1-3-3-1-1 1c-2-1-4-3-5-5l1-1-1-3z" stroke={gold} strokeWidth="1"/></svg> },
    { label: "Localização", value: "Curitiba, Paraná — Brasil", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="8" r="3" stroke={gold} strokeWidth="1"/><path d="M9 1C6 1 3 3.7 3 7c0 4 6 10 6 10s6-6 6-10c0-3.3-3-6-6-6z" stroke={gold} strokeWidth="1"/></svg> },
  ];

  return (
    <section id="contato" style={{ padding: "140px 60px", background: dark }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }} className="contato-grid-resp">
        {/* Info */}
        <div>
          <SectionLabel>Fale Conosco</SectionLabel>
          <SectionTitle delay={1}>Vamos Criar <span style={{ color: gold }}>Juntos</span></SectionTitle>
          <p className="reveal reveal-delay-2" style={{ fontSize: "0.9rem", color: gray, lineHeight: 2, marginBottom: 40 }}>
            Conte-nos sobre seu projeto. Nossa equipe responde em até 24 horas úteis com uma proposta personalizada.
          </p>
          <div className="reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {contactInfos.map((ci) => (
              <div key={ci.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{ci.icon}</div>
                <div>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 4 }}>{ci.label}</p>
                  <p style={{ fontSize: "0.85rem", color: white }}>{ci.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="reveal reveal-delay-2" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Nome + Empresa — empilha no mobile via classe */}
          <div className="contato-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={labelStyle}>Nome</label>
              <input className="volo-input" type="text" placeholder="Seu nome" required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={labelStyle}>Empresa</label>
              <input className="volo-input" type="text" placeholder="Sua empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={labelStyle}>E-mail</label>
            <input className="volo-input" type="email" placeholder="seu@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={labelStyle}>Serviço de Interesse</label>
            <select className="volo-input" value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">Selecione um serviço</option>
              {["Filmagem Aérea com Drone","Produção Cinematográfica","Fotografia Aérea","Mapeamento e Inspeção","Cobertura de Eventos","Pós-Produção e Color"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={labelStyle}>Mensagem</label>
            <textarea className="volo-input" placeholder="Descreva seu projeto..." value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} style={{ ...inputStyle, resize: "none", height: 100 }} />
          </div>
          <button
            type="submit"
            className="contato-submit"
            style={{
              fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase",
              color: submitted ? white : dark, background: submitted ? "#5a8a5a" : gold,
              border: "none", padding: "18px 40px", transition: "all 0.3s", alignSelf: "flex-start", marginTop: 10,
            }}
            onMouseEnter={(e) => { if (!submitted) { e.currentTarget.style.background = goldLight; e.currentTarget.style.transform = "translateY(-2px)"; } }}
            onMouseLeave={(e) => { if (!submitted) { e.currentTarget.style.background = gold; e.currentTarget.style.transform = ""; } }}
          >
            {submitted ? "Mensagem Enviada!" : "Enviar Mensagem"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* Footer */
function Footer() {
  const navLinks = ["Sobre", "Serviços", "Portfólio", "Processo", "Contato"];
  const serviceLinks = ["Filmagem com Drone", "Produção Cinematográfica", "Fotografia Aérea", "Mapeamento", "Eventos"];
  const socials = ["IG", "YT", "LI", "VM"];
  const linkStyle = { fontSize: "0.8rem", color: gray, textDecoration: "none", transition: "color 0.3s" };

  return (
    <footer style={{ background: dark2, borderTop: "1px solid rgba(201,168,76,0.1)", padding: "60px 60px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, paddingBottom: 50, borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="footer-grid-resp">
          <div>
            <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.3rem", color: gold, marginBottom: 16, display: "block" }}>VOLO VISUAL</span>
            <p style={{ fontSize: "0.8rem", color: gray, lineHeight: 1.9 }}>Produções audiovisuais aéreas com excelência técnica e visão artística. Capturamos o mundo de perspectivas que nenhum outro equipamento alcança.</p>
          </div>
          <div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginBottom: 20 }}>Navegação</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {navLinks.map(l => <li key={l}><a href={`#${l.toLowerCase().replace("ó","o").replace("ç","c").replace("í","i")}`} style={linkStyle} onMouseEnter={e => e.target.style.color = white} onMouseLeave={e => e.target.style.color = gray}>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginBottom: 20 }}>Serviços</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {serviceLinks.map(l => <li key={l}><a href="#servicos" style={linkStyle} onMouseEnter={e => e.target.style.color = white} onMouseLeave={e => e.target.style.color = gray}>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginBottom: 20 }}>Contato</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <li><a href="mailto:contato@volovisual.com" style={linkStyle} onMouseEnter={e => e.target.style.color = white} onMouseLeave={e => e.target.style.color = gray}>contato@volovisual.com</a></li>
              <li><a href="tel:+5541999990000" style={linkStyle} onMouseEnter={e => e.target.style.color = white} onMouseLeave={e => e.target.style.color = gray}>+55 (41) 99999-0000</a></li>
              <li><span style={{ ...linkStyle, cursor: "default" }}>Curitiba, PR — Brasil</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 30 }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(154,150,144,0.5)", letterSpacing: "0.05em" }}>© 2025 Volo Visual. Todos os direitos reservados.</p>
          <div style={{ display: "flex", gap: 16 }}>
            {socials.map(s => (
              <a key={s} href="#" style={{ width: 36, height: 36, border: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: gray, fontSize: "0.75rem", fontFamily: "'Cinzel', serif", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)"; e.currentTarget.style.color = gray; }}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────── */
export default function VoloVisual() {
  useReveal();

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = GLOBAL_CSS + RESPONSIVE_CSS;
    document.head.appendChild(styleEl);

    if (!document.querySelector('link[href*="Cinzel"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Montserrat:wght@300;400;500;600&display=swap";
      document.head.appendChild(link);
    }

    return () => document.head.removeChild(styleEl);
  }, []);

  return (
    <div style={{ background: dark, color: white, minHeight: "100vh" }}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Sobre />
      <Servicos />
      <Portfolio />
      <Processo />
      <Videos />
      <Contato />
      <Footer />
    </div>
  );
}
