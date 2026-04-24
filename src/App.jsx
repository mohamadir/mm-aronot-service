import React, { useState, useEffect, useRef } from "react";

import imgTekon from "../assets/tekon_aron.png";
import imgMededa from "../assets/mededa.png";
import imgHazaza from "../assets/hazaza.png";
import imgBakara from "../assets/bakarat-aekhout.png";

const BRAND = {
  name: "מ.מ שירות ומדידה לארונות",
  nameHe: "מ.מ שירות ומדידה",
  tagline: "דיוק בכל פרט",
  phone: "050-984-0407",
  phoneRaw: "0509840407",
  whatsapp: "972509840407",
  whatsappMsg: "הגעתי מגוגל ורוצה שירות",
  email: "info@mm-closets.co.il",
};

const COLORS = {
  gold: "#C8A96E",
  goldLight: "#E8D5B0",
  goldDark: "#A08040",
  dark: "#1A1A1A",
  darker: "#111111",
  cream: "#FAF8F5",
  warmGray: "#9A9590",
};

const IMG_TEKON = imgTekon;
const IMG_MEDEDA = imgMededa;
const IMG_HAZAZA = imgHazaza;
const IMG_BAKARA = imgBakara;

const trackCall = () => { try { window.gtag("event", "click_call", { event_category: "engagement" }); } catch (e) {} };
const trackWA = () => { try { window.gtag("event", "click_whatsapp", { event_category: "engagement" }); } catch (e) {} };
const waHref = () => `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(BRAND.whatsappMsg)}`;

const IconRuler = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.7 7.3l-5-5a1 1 0 00-1.4 0l-13 13a1 1 0 000 1.4l5 5a1 1 0 001.4 0l13-13a1 1 0 000-1.4z"/>
    <path d="M7 13.5l1.5 1.5M10 10.5l1.5 1.5M13 7.5l1.5 1.5M16 4.5l1.5 1.5"/>
  </svg>
);
const IconDoor = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/>
    <path d="M9 21v-8h6v8"/><circle cx="14" cy="11" r="1"/>
  </svg>
);
const IconHammer = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 12l-8.5 8.5a2.12 2.12 0 01-3-3L12 9"/>
    <path d="M17.64 15L22 10.64a1 1 0 000-1.41l-7.23-7.23a1 1 0 00-1.41 0L9 6.36"/>
  </svg>
);
const IconWrench = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
);
const IconClipboard = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/>
  </svg>
);
const IconStar = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? COLORS.gold : "none"} stroke={COLORS.gold} strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label: "שירותים", href: "#services" },
    { label: "לפני ואחרי", href: "#before-after" },
    { label: "המלצות", href: "#reviews" },
    { label: "גלריה", href: "#gallery" },
    { label: "צור קשר", href: "#contact" },
  ];
  const btnBase = { padding: "10px 18px", fontFamily: "'Heebo', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: "none", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.25s", whiteSpace: "nowrap" };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
      transition: "box-shadow 0.4s",
      boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 38, height: 38, border: `2px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 15, color: COLORS.gold }}>מ.מ</div>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 16, fontWeight: 600, color: COLORS.dark }}>{BRAND.nameHe}</span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }} className="nav-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ textDecoration: "none", color: COLORS.warmGray, fontSize: 15, fontFamily: "'Heebo', sans-serif", fontWeight: 400, transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = COLORS.gold} onMouseLeave={e => e.target.style.color = COLORS.warmGray}>{l.label}</a>
          ))}
          <a href={`tel:${BRAND.phoneRaw}`} onClick={trackCall}
            style={{ ...btnBase, background: COLORS.dark, color: "#fff" }}
            onMouseEnter={e => e.currentTarget.style.background = "#333"}
            onMouseLeave={e => e.currentTarget.style.background = COLORS.dark}>
            <IconPhone />התקשר עכשיו
          </a>
          <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={trackWA}
            style={{ ...btnBase, background: "#25D366", color: "#fff" }}
            onMouseEnter={e => e.currentTarget.style.background = "#1aad52"}
            onMouseLeave={e => e.currentTarget.style.background = "#25D366"}>
            <IconWhatsApp />וואטסאפ
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          <div style={{ width: 24, height: 2, background: COLORS.dark, marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: COLORS.dark, marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: COLORS.dark, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ position: "absolute", top: 68, left: 0, right: 0, background: "rgba(255,255,255,0.99)", backdropFilter: "blur(20px)", padding: "20px", borderBottom: "1px solid rgba(0,0,0,0.07)", zIndex: 99 }} className="nav-mobile-menu">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "14px 0", textDecoration: "none", color: COLORS.dark, fontSize: 16, fontFamily: "'Heebo', sans-serif", borderBottom: i < links.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>{l.label}</a>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <a href={`tel:${BRAND.phoneRaw}`} onClick={() => { trackCall(); setMenuOpen(false); }}
              style={{ flex: 1, padding: "14px 8px", background: COLORS.dark, color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 16, fontWeight: 700, textDecoration: "none", borderRadius: 4, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <IconPhone />התקשר
            </a>
            <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={() => { trackWA(); setMenuOpen(false); }}
              style={{ flex: 1, padding: "14px 8px", background: "#25D366", color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 16, fontWeight: 700, textDecoration: "none", borderRadius: 4, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <IconWhatsApp />וואטסאפ
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const fadeIn = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: `linear-gradient(160deg, #FFFFFF 0%, ${COLORS.cream} 40%, #FFF9F0 100%)` }}>
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(200,169,110,0.12)", opacity: loaded ? 1 : 0, transition: "opacity 2s ease 0.5s" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "-8%", width: 350, height: 350, borderRadius: "50%", border: "1px solid rgba(200,169,110,0.08)", opacity: loaded ? 1 : 0, transition: "opacity 2s ease 0.8s" }} />
      <div style={{ position: "absolute", top: 0, right: "50%", width: 1, height: loaded ? "30%" : 0, background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, transparent)`, transition: "height 1.5s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
      <div style={{ textAlign: "center", padding: "120px 24px 80px", maxWidth: 860, position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 28, ...fadeIn(0.2) }}>
          <div style={{ width: 40, height: 1, background: COLORS.gold }} />
          <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.gold, letterSpacing: 4, fontWeight: 300 }}>מומחים לתיקון ושירות ארונות</span>
          <div style={{ width: 40, height: 1, background: COLORS.gold }} />
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 6.5vw, 78px)", fontWeight: 300, color: COLORS.dark, lineHeight: 1.15, margin: "0 0 20px", ...fadeIn(0.4) }}>
          תיקון ארונות עד הבית<br />
          <span style={{ color: COLORS.gold, fontWeight: 600 }}>שירות מהיר ואמין</span>
        </h1>
        <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: "clamp(18px, 2.2vw, 22px)", color: COLORS.warmGray, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 44px", fontWeight: 300, ...fadeIn(0.6) }}>
          תיקון דלתות, מסילות וארונות הזזה — מגיעים אליך
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", ...fadeIn(0.8) }}>
          <a href={`tel:${BRAND.phoneRaw}`} onClick={trackCall}
            style={{ padding: "18px 40px", background: COLORS.dark, color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 18, fontWeight: 700, textDecoration: "none", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.18)", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.22)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.18)"; }}>
            <IconPhone />התקשר עכשיו
          </a>
          <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={trackWA}
            style={{ padding: "18px 40px", background: "#25D366", color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 18, fontWeight: 700, textDecoration: "none", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(37,211,102,0.3)", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "#1aad52"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#25D366"; }}>
            <IconWhatsApp />שלח וואטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: <IconWrench />, title: "תיקון ארונות", img: IMG_TEKON,
      items: ["תיקון דלתות", "תיקון מסילות", "תיקון ארונות הזזה"],
      desc: "תיקון מקצועי של צירים, מדפים, מגירות ושלדות ארון. מחזירים את הארון לתפקוד מלא.",
    },
    {
      icon: <IconRuler />, title: "ארונות מטבח", img: IMG_MEDEDA,
      items: ["מדידה מדויקת", "התאמה לחלל", "ניצול מיטבי"],
      desc: "מדידות מדויקות והתאמה מושלמת לחלל המטבח שלכם. כל סנטימטר מנוצל בצורה אופטימלית.",
    },
    {
      icon: <IconDoor />, title: "ארונות בהתאמה אישית", img: IMG_HAZAZA,
      items: ["תכנון לפי הצורך", "חומרים איכותיים", "התקנה מקצועית"],
      desc: "ארונות המותאמים בדיוק לצרכים ולחלל שלכם — מהתכנון ועד ההתקנה.",
    },
    {
      icon: <IconClipboard />, title: "בקרת איכות", img: IMG_BAKARA,
      items: ["בדיקה מקיפה", "איתור תקלות", "דו״ח מפורט"],
      desc: "בדיקה מקיפה של מצב הארון, איתור תקלות ודו״ח מפורט עם המלצות לתיקון ושיפור.",
    },
  ];
  return (
    <section id="services" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.gold, letterSpacing: 4, fontWeight: 400 }}>השירותים שלנו</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, color: COLORS.dark, margin: "12px 0 0", lineHeight: 1.2 }}>
              פתרון <span style={{ color: COLORS.gold, fontWeight: 600 }}>מקצועי</span> לכל ארון</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", display: "flex", flexDirection: "column" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = "rgba(200,169,110,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; }}>
                <div style={{ width: "100%", height: 200, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, rgba(255,255,255,1), transparent)" }} />
                </div>
                <div style={{ padding: "20px 24px 16px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ color: COLORS.gold }}>{s.icon}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: COLORS.dark, margin: 0 }}>{s.title}</h3>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                    {s.items.map((item, j) => (
                      <li key={j} style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.warmGray, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: COLORS.gold, fontSize: 12 }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.warmGray, lineHeight: 1.6, margin: "0 0 16px", fontWeight: 300 }}>{s.desc}</p>
                </div>
                <div style={{ padding: "0 24px 24px" }}>
                  <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={trackWA}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", background: "#25D366", color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: "none", borderRadius: 4, transition: "background 0.25s", width: "100%", boxSizing: "border-box" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1aad52"}
                    onMouseLeave={e => e.currentTarget.style.background = "#25D366"}>
                    <IconWhatsApp />שלח הודעה
                  </a>
                </div>
                <div style={{ height: 2, background: `linear-gradient(to left, ${COLORS.gold}, transparent)` }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const items = [
    { before: "ארון ישן עם דלתות שבורות ומדפים רופפים", after: "ארון משוקם עם דלתות חדשות, מדפים יציבים ותפקוד מלא", label: "שיקום ארון חדר שינה" },
    { before: "חלל לא מנוצל ומדפים שבורים בתוך הארון", after: "חלוקה פנימית מותאמת עם מדפים חדשים וניצול מיטבי", label: "תיקון וארגון פנימי" },
    { before: "מסילות תקועות ודלתות שלא נסגרות", after: "דלתות הזזה חלקות עם מסילות חדשות ובקרת איכות", label: "תיקון דלתות הזזה" },
  ];
  return (
    <section id="before-after" style={{ background: COLORS.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.gold, letterSpacing: 4, fontWeight: 400 }}>תוצאות מוכחות</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, color: COLORS.dark, margin: "12px 0 0", lineHeight: 1.2 }}>
              לפני <span style={{ color: COLORS.gold }}>&</span> אחרי</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div style={{ borderRadius: 4, overflow: "hidden", background: "#fff", border: "1px solid rgba(0,0,0,0.06)", transition: "all 0.5s", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
                <div style={{ padding: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 11, color: COLORS.warmGray, letterSpacing: 3, fontWeight: 500 }}>לפני</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.06)" }} />
                  </div>
                  <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 17, color: COLORS.warmGray, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{item.before}</p>
                </div>
                <div style={{ height: 1, background: `linear-gradient(to left, transparent, ${COLORS.gold}, transparent)` }} />
                <div style={{ padding: 32, background: "rgba(200,169,110,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 11, color: COLORS.gold, letterSpacing: 3, fontWeight: 500 }}>אחרי</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(200,169,110,0.2)" }} />
                  </div>
                  <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 17, color: COLORS.dark, lineHeight: 1.6, margin: 0, fontWeight: 400 }}>{item.after}</p>
                </div>
                <div style={{ padding: "14px 32px", background: "rgba(200,169,110,0.08)", borderTop: "1px solid rgba(200,169,110,0.1)" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: COLORS.goldDark, fontWeight: 600 }}>{item.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { name: "שרה כהן", location: "תל אביב", rating: 5, text: "שירות מדהים! הארון שלנו חזר לתפקוד מלא. המקצועיות והדיוק של הצוות פשוט ברמה אחרת." },
    { name: "דוד לוי", location: "ירושלים", rating: 5, text: "הזמנתי מדידה ותיקון לארון בחדר השינה. התוצאה הייתה מעבר לכל ציפייה. ממליץ בחום!" },
    { name: "מירב אברהם", location: "חיפה", rating: 5, text: "דלתות ההזזה שלנו לא עבדו כבר חודשים. תוך שעתיים הכל היה מתוקן ועובד חלק. תודה רבה!" },
    { name: "יוסי מזרחי", location: "באר שבע", rating: 5, text: "מקצוענים אמיתיים. הגיעו בזמן, עשו בדיקה יסודית ותיקנו הכל. הארון שלנו קיבל חיים חדשים." },
    { name: "נועה ברקוביץ׳", location: "אשדוד", rating: 5, text: "ביצעו בקרת איכות מלאה ותיקנו כל מה שהיה צריך. כל סנטימטר נבדק. שירות ברמה גבוהה מאוד." },
  ];
  return (
    <section id="reviews" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.gold, letterSpacing: 4, fontWeight: 400 }}>מה אומרים עלינו</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, color: COLORS.dark, margin: "12px 0 0", lineHeight: 1.2 }}>
              הלקוחות שלנו <span style={{ color: COLORS.gold, fontWeight: 600 }}>ממליצים</span></h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ background: COLORS.cream, padding: 36, borderRadius: 4, position: "relative", border: "1px solid rgba(0,0,0,0.04)", transition: "all 0.5s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.06)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 72, color: "rgba(200,169,110,0.15)", position: "absolute", top: 12, right: 20, lineHeight: 1 }}>"</div>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array.from({ length: 5 }).map((_, j) => <IconStar key={j} filled={j < r.rating} />)}
                </div>
                <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 17, color: COLORS.dark, lineHeight: 1.8, margin: "0 0 20px", fontWeight: 300 }}>{r.text}</p>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: COLORS.dark }}>{r.name}</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.warmGray, fontWeight: 300 }}>{r.location}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { title: "שירות מהיר", desc: "מגיעים אליכם תוך זמן קצר ועובדים ביעילות — ללא עיכובים מיותרים" },
    { title: "ניסיון של שנים", desc: "מעל 10 שנות ניסיון בתחום תיקון ותחזוקת ארונות" },
    { title: "מגיעים עד הבית", desc: "השירות מגיע אליכם — לא צריך להוציא את הארון מהבית" },
    { title: "מחיר הוגן", desc: "הצעת מחיר שקופה ללא הפתעות. תמורה מלאה לכל שקל" },
    { title: "אחריות מלאה", desc: "אחריות על כל עבודה שאנחנו מבצעים — השקט שלכם חשוב לנו" },
    { title: "חומרים איכותיים", desc: "עבודה עם חומרי גלם מהשורה הראשונה בלבד" },
  ];
  return (
    <section style={{ background: COLORS.cream, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.gold, letterSpacing: 4, fontWeight: 400 }}>למה לבחור בנו</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, color: COLORS.dark, margin: "12px 0 0", lineHeight: 1.2 }}>
              למה <span style={{ color: COLORS.gold, fontWeight: 600 }}>לבחור בנו?</span></h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {points.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ display: "flex", gap: 16, padding: 28, borderRadius: 4, border: "1px solid rgba(200,169,110,0.15)", background: "#fff", transition: "all 0.4s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,169,110,0.06)"; e.currentTarget.style.borderColor = "rgba(200,169,110,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "rgba(200,169,110,0.15)"; }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}><IconCheck /></div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: COLORS.dark, marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 16, color: COLORS.warmGray, lineHeight: 1.6, fontWeight: 300 }}>{p.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const galleryItems = [
    { label: "תיקון ארון דלת רגילה", img: IMG_TEKON },
    { label: "תיקון דלתות הזזה", img: IMG_HAZAZA },
    { label: "מדידה והתאמה", img: IMG_MEDEDA },
    { label: "בקרת איכות", img: IMG_BAKARA },
  ];
  return (
    <section id="gallery" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.gold, letterSpacing: 4, fontWeight: 400 }}>מהשטח</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, color: COLORS.dark, margin: "12px 0 0", lineHeight: 1.2 }}>
              גלריית <span style={{ color: COLORS.gold, fontWeight: 600 }}>תיקונים</span></h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {galleryItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ aspectRatio: "3/4", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", border: "1px solid rgba(0,0,0,0.04)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.querySelector(".g-overlay").style.opacity = 1; e.currentTarget.querySelector("img").style.transform = "scale(1.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.querySelector(".g-overlay").style.opacity = 0; e.currentTarget.querySelector("img").style.transform = "scale(1)"; }}>
                <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
                <div className="g-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.2) 40%, transparent 100%)", display: "flex", alignItems: "flex-end", padding: 24, opacity: 0, transition: "opacity 0.4s ease" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#fff", fontWeight: 600 }}>{item.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => { setSent(true); setTimeout(() => setSent(false), 4000); setForm({ name: "", phone: "", message: "" }); };
  const inputStyle = { width: "100%", padding: "14px 18px", background: COLORS.cream, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, color: COLORS.dark, fontFamily: "'Heebo', sans-serif", fontSize: 15, fontWeight: 300, outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" };
  return (
    <section id="contact" style={{ background: COLORS.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Strong CTA block */}
        <Reveal>
          <div style={{ background: COLORS.dark, borderRadius: 8, padding: "48px 32px", textAlign: "center", marginBottom: 64, boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
            <h2 style={{ fontFamily: "'Heebo', sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>
              צריכים תיקון? התקשרו עכשיו
            </h2>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.6)", margin: "0 0 32px", fontWeight: 300 }}>
              זמינים לכל שאלה — מגיעים עד הבית
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`tel:${BRAND.phoneRaw}`} onClick={trackCall}
                style={{ padding: "18px 36px", background: COLORS.gold, color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 800, textDecoration: "none", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 12, transition: "all 0.3s", direction: "ltr" }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.goldDark}
                onMouseLeave={e => e.currentTarget.style.background = COLORS.gold}>
                <IconPhone />{BRAND.phone}
              </a>
              <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={trackWA}
                style={{ padding: "18px 36px", background: "#25D366", color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 18, fontWeight: 700, textDecoration: "none", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 12, transition: "all 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#1aad52"}
                onMouseLeave={e => e.currentTarget.style.background = "#25D366"}>
                <IconWhatsApp />שלח וואטסאפ
              </a>
            </div>
          </div>
        </Reveal>

        {/* Form section */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.gold, letterSpacing: 4, fontWeight: 400 }}>או השאירו פרטים</span>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: COLORS.dark, margin: "12px 0 0", lineHeight: 1.2 }}>
              צרו <span style={{ color: COLORS.gold, fontWeight: 600 }}>קשר</span></h3>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <Reveal>
            <div>
              <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 17, color: COLORS.warmGray, lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>
                מעוניינים בהצעת מחיר? רוצים להתייעץ?<br />השאירו פרטים או צרו קשר ישירות — נחזור אליכם תוך שעות.
              </p>
              <a href={`tel:${BRAND.phoneRaw}`} onClick={trackCall}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", marginBottom: 12, background: "#fff", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 4, textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.5)"; e.currentTarget.style.background = "rgba(200,169,110,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.2)"; e.currentTarget.style.background = "#fff"; }}>
                <div style={{ color: COLORS.gold }}><IconPhone /></div>
                <div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.warmGray, fontWeight: 300 }}>התקשרו אלינו</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 18, color: COLORS.dark, fontWeight: 600, direction: "ltr" }}>{BRAND.phone}</div>
                </div>
              </a>
              <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={trackWA}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)", borderRadius: 4, textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,211,102,0.12)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,211,102,0.06)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.2)"; }}>
                <div style={{ color: "#25D366" }}><IconWhatsApp /></div>
                <div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 15, color: COLORS.warmGray, fontWeight: 300 }}>שלחו הודעה בוואטסאפ</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 16, color: COLORS.dark, fontWeight: 500 }}>פתח צ׳אט</div>
                </div>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input type="text" placeholder="שם מלא" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
              <input type="tel" placeholder="מספר טלפון" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
              <textarea placeholder="ספרו לנו על הפרויקט שלכם..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} style={{ ...inputStyle, resize: "vertical" }} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
              <button type="button" onClick={handleSubmit} style={{ padding: "16px 40px", background: COLORS.gold, color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 16, fontWeight: 700, border: "none", borderRadius: 2, cursor: "pointer", transition: "all 0.4s" }}
                onMouseEnter={e => { e.target.style.background = COLORS.dark; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.background = COLORS.gold; e.target.style.transform = "translateY(0)"; }}>{sent ? "✓ הפרטים נשלחו!" : "שלח הצעת מחיר"}</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const areas = ["תל אביב", "ירושלים", "חיפה", "באר שבע", "רמת גן", "הרצליה", "ראשון לציון", "פתח תקווה", "נתניה", "אשדוד", "אשקלון", "חולון", "כפר סבא", "רחובות", "עפולה", "טבריה", "אילת"];
  return (
    <footer style={{ background: COLORS.dark, padding: "64px 24px 32px", borderTop: "1px solid rgba(200,169,110,0.15)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, border: `1.5px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.gold }}>מ.מ</div>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 16, fontWeight: 600, color: "#fff" }}>{BRAND.nameHe}</span>
            </div>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontWeight: 300 }}>
              {BRAND.tagline} — שירות מקצועי לתיקון, מדידה ותחזוקת ארונות בכל הארץ.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <a href={`tel:${BRAND.phoneRaw}`} onClick={trackCall}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "rgba(255,255,255,0.08)", color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 14, fontWeight: 600, textDecoration: "none", borderRadius: 4, transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
                <IconPhone />{BRAND.phone}
              </a>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: COLORS.gold, marginBottom: 16, marginTop: 0 }}>אזורי שירות</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {areas.map(a => (
                <span key={a} style={{ fontFamily: "'Heebo', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", padding: "4px 12px", background: "rgba(255,255,255,0.06)", borderRadius: 2, border: "1px solid rgba(255,255,255,0.08)", fontWeight: 300 }}>{a}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: COLORS.gold, marginBottom: 16, marginTop: 0 }}>ניווט מהיר</h4>
            {["שירותים", "לפני ואחרי", "המלצות", "גלריה", "צור קשר"].map((l, i) => (
              <a key={i} href={`#${["services", "before-after", "reviews", "gallery", "contact"][i]}`} style={{ display: "block", fontFamily: "'Heebo', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.45)", textDecoration: "none", padding: "6px 0", transition: "color 0.3s", fontWeight: 300 }}
                onMouseEnter={e => e.target.style.color = COLORS.gold} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>© 2026 {BRAND.nameHe}. כל הזכויות שמורות.</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Facebook", "Instagram"].map(s => (
              <a key={s} href="#" style={{ fontFamily: "'Heebo', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = COLORS.gold} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const [pulse, setPulse] = useState(true);
  return (
    <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={trackWA}
      className="floating-wa-desktop"
      style={{ position: "fixed", bottom: 24, right: 20, zIndex: 90, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "transform 0.3s", animation: pulse ? "waPulse 2s infinite" : "none" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12)"; setPulse(false); }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
      <IconWhatsApp />
    </a>
  );
}

function MobileBottomBar() {
  return (
    <div className="mobile-bottom-bar" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: "#fff", borderTop: "1px solid rgba(0,0,0,0.1)", padding: "10px 12px", display: "none", gap: 10, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
      <a href={`tel:${BRAND.phoneRaw}`} onClick={trackCall}
        style={{ flex: 1, padding: "14px 8px", background: COLORS.dark, color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 16, fontWeight: 700, textDecoration: "none", borderRadius: 6, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <IconPhone />התקשר עכשיו
      </a>
      <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={trackWA}
        style={{ flex: 1, padding: "14px 8px", background: "#25D366", color: "#fff", fontFamily: "'Heebo', sans-serif", fontSize: 16, fontWeight: 700, textDecoration: "none", borderRadius: 6, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <IconWhatsApp />וואטסאפ
      </a>
    </div>
  );
}

export default function App() {
  return (
    <div dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", margin: 0, padding: 0 }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @keyframes waPulse {
          0% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); }
          50% { box-shadow: 0 4px 20px rgba(37,211,102,0.4), 0 0 0 14px rgba(37,211,102,0.1); }
          100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); }
        }
        ::selection { background: rgba(200,169,110,0.3); color: #1A1A1A; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.4); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(200,169,110,0.6); }
        input::placeholder, textarea::placeholder { color: rgba(0,0,0,0.3); font-family: 'Heebo', sans-serif; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; flex-direction: column; }
          .mobile-bottom-bar { display: flex !important; }
          .floating-wa-desktop { display: none !important; }
          body { padding-bottom: 76px; }
        }
        @media (min-width: 769px) {
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
          .mobile-bottom-bar { display: none !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Services />
      <BeforeAfter />
      <Reviews />
      <WhyUs />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </div>
  );
}
