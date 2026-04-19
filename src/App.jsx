import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  FolderOpen,
  Contact as ContactIcon,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Mail,
  Phone,
  Globe,
  MapPin,
  UserPlus,
  X,
  Lock,
  Zap,
  LineChart,
  ShieldCheck,
  ChevronsDown
  Save,
  Settings,
  Send,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

const DEFAULT_CONFIG = {
  heroVideo: "/content/hero.mp4",
  heroPoster: "",
  logoWhite: "/content/logos/wordmark-white.svg",
  logoBlack: "/content/logos/wordmark-black.svg",
  logoMark: "/content/logos/mark-only.svg",
  qrCode: "/content/qr.png",
  heroTagline: "A click away.",
  tagline: "Business strategy. Digital execution.",
  heroSubtitle: "Precision tools and systems for modern companies.",
  industries: [
    "Manufacturing",
    "Government",
    "Retail",
    "Professional Services",
  ],
  industriesLabel: "Industries we serve",
  formEndpoint: "",
  formEnabled: true,
  vcard: {
    name: "Intelbex, Corp.",
    founder: "Rafa Sánchez",
    title: "Founder & Principal",
    email: "rafa@intelbex.com",
    phone: "+1 (787) 000-0000",
    website: "contact.intelbex.com",
    location: "San Juan, Puerto Rico",
  },
  services: [
    {
      title: "Business Strategy",
      description:
        "Clear positioning, pricing, and go-to-market frameworks built around how your business actually earns.",
      icon: "LineChart",
    },
    {
      title: "Digital Execution",
      description:
        "Websites, landing pages, and client-facing tools shipped fast without cutting corners on quality.",
      icon: "Zap",
    },
    {
      title: "Process Automation",
      description:
        "HubSpot, Make.com, and custom integrations that remove manual work from onboarding, sales, and ops.",
      icon: "Briefcase",
    },
    {
      title: "Verification & Compliance",
      description:
        "Identity, supplier, and document verification systems aligned with modern regulatory standards.",
      icon: "ShieldCheck",
    },
  ],
  documents: {
    corporate: "/content/pdfs/corporate.pdf",
    services: "/content/pdfs/services.pdf",
    onePager: "/content/pdfs/onepager.pdf",
  },
  documentsMeta: {
    corporate: { title: "Corporate Presentation", size: "" },
    services: { title: "Services Presentation", size: "" },
    onePager: { title: "One Pager", size: "" },
  },
};

const ADMIN_PASSWORD_HASH =
  "a6b8f7c3e1d2a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9";

const ICON_MAP = {
  Briefcase,
  LineChart,
  Zap,
  ShieldCheck,
  FolderOpen,
  ContactIcon,
};

// ============================================================================
// REVEAL HOOK
// ============================================================================

const useReveal = (delay = 0) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return [ref, visible];
};

const Reveal = ({ delay = 0, className = "", style = {}, children }) => {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition:
          "opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// LOGO / WORDMARK
// ============================================================================

const IntelbexWordmarkFallback = ({ color = "#ffffff", size = 28 }) => (
  <svg viewBox="0 0 320 72" height={size} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path
      d="M 14 0 L 58 0 Q 72 0 72 14 L 72 72 L 14 72 Q 0 72 0 58 L 0 14 Q 0 0 14 0 Z"
      fill="#294CCC"
    />
    <text x="36" y="52" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="42" fill="#ffffff" letterSpacing="-0.03em">ib</text>
    <text x="90" y="50" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="40" fill={color} letterSpacing="-0.04em">intelbex</text>
  </svg>
);

const IntelbexMarkFallback = ({ size = 64 }) => (
  <svg viewBox="0 0 72 72" width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M 14 0 L 58 0 Q 72 0 72 14 L 72 72 L 14 72 Q 0 72 0 58 L 0 14 Q 0 0 14 0 Z" fill="#294CCC" />
    <text x="36" y="52" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="42" fill="#ffffff" letterSpacing="-0.03em">ib</text>
  </svg>
);

const IntelbexLogo = ({ src, fallbackColor = "#ffffff", size = 28, alt = "Intelbex" }) => {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);
  if (failed || !src) return <IntelbexWordmarkFallback color={fallbackColor} size={size} />;
  return <img src={src} alt={alt} onError={() => setFailed(true)} style={{ height: `${size}px`, width: "auto", display: "block" }} />;
};

const HeroPosterFallback = () => (
  <div
    className="absolute inset-0 flex items-center justify-center"
    style={{ background: "linear-gradient(135deg, #0F1E4D 0%, #1A2F73 55%, #223F99 100%)" }}
  >
    <div style={{ opacity: 0.12 }}>
      <IntelbexMarkFallback size={280} />
    </div>
  </div>
);

// ============================================================================
// QR placeholder
// ============================================================================

const QRPlaceholder = ({ size = 200 }) => {
  const cells = [];
  const grid = 21;
  const seed = 0.42;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const inFinder = (x < 7 && y < 7) || (x >= grid - 7 && y < 7) || (x < 7 && y >= grid - 7);
      const filled = inFinder
        ? (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4)) ||
          (x >= grid - 7 && (x === grid - 7 || x === grid - 1 || y === 0 || y === 6 || (x >= grid - 5 && x <= grid - 3 && y >= 2 && y <= 4))) ||
          (y >= grid - 7 && (y === grid - 7 || y === grid - 1 || x === 0 || x === 6 || (y >= grid - 5 && y <= grid - 3 && x >= 2 && x <= 4)))
        : Math.abs(Math.sin(x * 7.3 + y * 3.1 + seed)) > 0.55;
      if (filled) cells.push({ x, y });
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${grid} ${grid}`} xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      <rect width={grid} height={grid} fill="#ffffff" />
      {cells.map((c, i) => (<rect key={i} x={c.x} y={c.y} width="1" height="1" fill="#0F1E4D" />))}
    </svg>
  );
};

// ============================================================================
// Utilities
// ============================================================================

async function sha256(text) {
  const buf = new TextEncoder().encode(text);
  const hashBuf = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hashBuf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const Toast = ({ message, show, onHide }) => {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onHide, 3000);
      return () => clearTimeout(t);
    }
  }, [show, onHide]);
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)" }}
    >
      <div className="px-4 py-3 rounded-xl shadow-lg text-sm font-medium max-w-[90vw]" style={{ background: "#0F1E4D", color: "#ffffff", fontFamily: "Inter, sans-serif" }}>
        {message}
      </div>
    </div>
  );
};

// ============================================================================
// HERO
// ============================================================================

const Hero = ({ config, onScrollDown }) => {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onErr = () => setVideoFailed(true);
    v.addEventListener("error", onErr);
    if (!config.heroVideo || config.heroVideo.endsWith("hero.mp4")) {
      setVideoFailed(true);
    }
    return () => v.removeEventListener("error", onErr);
  }, [config.heroVideo]);

  return (
    <section className="relative w-full overflow-hidden scroll-section" style={{ height: "100vh", minHeight: "600px" }}>
      {!videoFailed ? (
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" src={config.heroVideo} poster={config.heroPoster || undefined} autoPlay muted loop playsInline preload="auto" />
      ) : (
        <HeroPosterFallback />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,30,77,0.5) 0%, rgba(15,30,77,0.35) 40%, rgba(15,30,77,0.78) 100%)" }} />
      <div className="absolute left-0 right-0 z-10 px-6" style={{ top: "calc(env(safe-area-inset-top, 0px) + 40px)" }}>
        <Reveal delay={100}>
          <div className="mb-3">
            <IntelbexLogo src={config.logoWhite} fallbackColor="#ffffff" size={34} alt="Intelbex" />
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "0.8125rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {config.heroTagline}
          </div>
        </Reveal>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-6" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 120px)", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 120px)" }}>
        <Reveal delay={250}>
          <h1 className="text-white font-bold leading-tight mb-4" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2rem, 7vw, 3.25rem)", letterSpacing: "-0.03em", maxWidth: "640px" }}>
            {config.tagline}
          </h1>
        </Reveal>
        <Reveal delay={400}>
          <p className="text-white/85 mb-10 leading-relaxed" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(1rem, 3.5vw, 1.125rem)", maxWidth: "520px" }}>
            {config.heroSubtitle}
          </p>
        </Reveal>
        <Reveal delay={550}>
          <button onClick={onScrollDown} className="hover-lift inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm active:scale-95" style={{ background: "#ffffff", color: "#0F1E4D", fontFamily: "Inter, sans-serif", minHeight: "44px" }}>
            Explore <ChevronRight size={16} />
          </button>
        </Reveal>
      </div>
      <button onClick={onScrollDown} className="absolute left-1/2 -translate-x-1/2 z-10 text-white/70 transition-all duration-300 ease-out active:scale-95 hover:text-white" style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 104px)", animation: "bounce-soft 2.2s ease-in-out infinite" }} aria-label="Scroll down">
        <ChevronsDown size={28} strokeWidth={1.5} />
      </button>
    </section>
  );
};

// ============================================================================
// INDUSTRIES STRIP
// ============================================================================

const IndustriesStrip = ({ config }) => {
  if (!config.industries || config.industries.length === 0) return null;
  return (
    <section className="px-6 py-10" style={{ background: "#ffffff", borderBottom: "1px solid #F1F5FB" }}>
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="text-center mb-4" style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            {config.industriesLabel}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {config.industries.map((industry, i) => (
              <React.Fragment key={i}>
                <span style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "-0.005em" }}>
                  {industry}
                </span>
                {i < config.industries.length - 1 && (
                  <span style={{ color: "#C9D6FB", fontSize: "0.875rem", fontWeight: 400 }} aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ============================================================================
// SERVICES
// ============================================================================

const Services = ({ config, onDownload }) => {
  return (
    <section className="px-6 py-20 scroll-section" style={{ background: "#ffffff" }}>
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#294CCC", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.18em" }}>Services</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-10" style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 5vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            What we do, and how we do it.
          </h2>
        </Reveal>
        <div className="space-y-3 mb-10">
          {config.services.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] || Briefcase;
            return (
              <Reveal key={i} delay={160 + i * 90}>
                <div className="card-hover p-5 rounded-2xl active:scale-[0.99]" style={{ background: "#F5F8FF", border: "1px solid #E8EEFF" }}>
                  <div className="flex items-start gap-4">
                    <div className="icon-tile flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "#294CCC" }}>
                      <Icon size={20} color="#ffffff" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1.5" style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.0625rem", letterSpacing: "-0.01em" }}>{svc.title}</h3>
                      <p style={{ color: "#475569", fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "0.9375rem", lineHeight: 1.55 }}>{svc.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={160 + config.services.length * 90}>
          <button onClick={() => onDownload("services")} className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #294CCC 0%, #1A2F73 100%)", color: "#ffffff", fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", minHeight: "52px" }}>
            <Download size={18} strokeWidth={2.2} />
            Download Services Presentation
          </button>
        </Reveal>
      </div>
    </section>
  );
};

// ============================================================================
// DOCUMENTS
// ============================================================================

const DocumentsSection = ({ config, onDownload }) => {
  const [open, setOpen] = useState({ presentations: true });
  const docs = [
    { key: "corporate", ...config.documentsMeta.corporate },
    { key: "services", ...config.documentsMeta.services },
    { key: "onePager", ...config.documentsMeta.onePager },
  ];
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  return (
    <section className="px-6 py-20 scroll-section" style={{ background: "#F5F8FF" }}>
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#294CCC", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.18em" }}>Library</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-8" style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 5vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Documents</h2>
        </Reveal>
        <Reveal delay={160}>
          <div className="card-hover rounded-2xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid #E8EEFF" }}>
            <button onClick={() => toggle("presentations")} className="w-full flex items-center justify-between p-5 transition-all duration-300 ease-out active:scale-[0.995] hover:bg-[#FAFCFF]" style={{ minHeight: "56px" }}>
              <div className="flex items-center gap-3">
                <FolderOpen size={20} color="#294CCC" strokeWidth={2} />
                <span style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9375rem" }}>Presentations</span>
              </div>
              <ChevronDown size={20} color="#64748B" style={{ transition: "transform 0.3s ease-out", transform: open.presentations ? "rotate(0deg)" : "rotate(-90deg)" }} />
            </button>
            <div style={{ maxHeight: open.presentations ? "600px" : "0", overflow: "hidden", transition: "max-height 0.35s ease-out" }}>
              <div className="border-t" style={{ borderColor: "#E8EEFF" }}>
                {docs.map((d, i) => (
                  <div key={d.key} className={`doc-row flex items-center gap-3 p-4 ${i < docs.length - 1 ? "border-b" : ""}`} style={{ borderColor: "#F1F5FB", minHeight: "64px" }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#E8EEFF" }}>
                      <FileText size={18} color="#294CCC" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "0.9375rem", lineHeight: 1.3 }}>{d.title}</div>
                      {d.size && (<div style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", marginTop: "2px" }}>{d.size}</div>)}
                    </div>
                    <button onClick={() => onDownload(d.key)} className="btn-mini flex-shrink-0 flex items-center gap-1.5 px-3.5 rounded-lg active:scale-95" style={{ background: "#294CCC", color: "#ffffff", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.8125rem", height: "44px", minWidth: "44px" }} aria-label={`Download ${d.title}`}>
                      <Download size={15} strokeWidth={2.4} />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ============================================================================
// INQUIRY FORM
// ============================================================================

const InquiryForm = ({ config, showToast }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (e) => /^[^s@]+@[^s@]+.[^s@]+$/.test(e);
  const canSubmit =
    name.trim().length >= 2 &&
    isValidEmail(email) &&
    message.trim().length >= 10 &&
    status !== "sending";

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (!config.formEndpoint || !config.formEndpoint.trim()) {
      showToast("Form endpoint not yet configured — see admin panel.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(config.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), _source: "intelbex-pwa" }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again or email directly.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error. Please try again or email directly.");
    }
  };

  const inputStyle = { background: "#ffffff", color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontSize: "1rem", border: "1px solid #E8EEFF", minHeight: "48px" };
  const labelStyle = { color: "#64748B", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" };

  return (
    <Reveal delay={100}>
      <div className="rounded-2xl p-6 mb-6 card-hover" style={{ background: "#F5F8FF", border: "1px solid #E8EEFF" }}>
        <div className="mb-5">
          <div style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.125rem", letterSpacing: "-0.01em" }}>Start a conversation</div>
          <div style={{ color: "#64748B", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", marginTop: "4px", lineHeight: 1.5 }}>Tell us what you're working on. We usually reply within a business day.</div>
        </div>
        {status === "success" ? (
          <div className="rounded-xl p-5 flex items-start gap-3" style={{ background: "#ffffff", border: "1px solid #C9D6FB" }}>
            <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#294CCC" }}>
              <Check size={18} color="#ffffff" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9375rem" }}>Message sent.</div>
              <div style={{ color: "#64748B", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", marginTop: "4px", lineHeight: 1.5 }}>Thanks — we'll be in touch shortly.</div>
              <button onClick={() => setStatus("idle")} className="mt-3 text-sm transition-all duration-300 ease-out active:scale-95" style={{ color: "#294CCC", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 600 }}>Send another →</button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label style={labelStyle} className="block mb-2">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="w-full px-4 py-3 rounded-lg outline-none focus:border-[#294CCC]" style={inputStyle} disabled={status === "sending"} />
            </div>
            <div>
              <label style={labelStyle} className="block mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoCapitalize="off" autoCorrect="off" className="w-full px-4 py-3 rounded-lg outline-none focus:border-[#294CCC]" style={inputStyle} disabled={status === "sending"} />
            </div>
            <div>
              <label style={labelStyle} className="block mb-2">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you working on?" rows={4} className="w-full px-4 py-3 rounded-lg outline-none resize-none focus:border-[#294CCC]" style={{ ...inputStyle, minHeight: "120px", lineHeight: 1.5 }} disabled={status === "sending"} />
            </div>
            {status === "error" && (
              <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                <AlertCircle size={16} color="#DC2626" strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }} />
                <span style={{ color: "#991B1B", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", lineHeight: 1.5 }}>{errorMsg}</span>
              </div>
            )}
            <button type="button" onClick={submit} disabled={!canSubmit} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl active:scale-[0.98]" style={{ background: canSubmit ? "linear-gradient(135deg, #294CCC 0%, #1A2F73 100%)" : "#C9D6FB", color: "#ffffff", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9375rem", minHeight: "52px", cursor: canSubmit ? "pointer" : "not-allowed", opacity: canSubmit ? 1 : 0.7 }}>
              {status === "sending" ? (<><Loader2 size={18} strokeWidth={2.4} className="animate-spin" />Sending…</>) : (<><Send size={17} strokeWidth={2.2} />Send message</>)}
            </button>
          </div>
        )}
      </div>
    </Reveal>
  );
};

// ============================================================================
// CONTACT
// ============================================================================

const Contact = ({ config, onQrClick, showToast }) => {
  const { vcard } = config;
  const handleSaveContact = () => {
    const url = `https://${vcard.website.replace(/^https?:\/\//, "")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <section className="px-6 py-20 scroll-section" style={{ background: "#ffffff" }}>
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#294CCC", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.18em" }}>Contact</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-8" style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 5vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Let's talk.</h2>
        </Reveal>
        <InquiryForm config={config} showToast={showToast} />
        <Reveal delay={200}>
          <div className="vcard-hover rounded-2xl p-6 mb-6" style={{ background: "linear-gradient(135deg, #0F1E4D 0%, #1A2F73 60%, #223F99 100%)", color: "#ffffff" }}>
            <div className="mb-5">
              <IntelbexLogo src={config.logoWhite} fallbackColor="#ffffff" size={24} alt="Intelbex" />
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.01em" }}>{vcard.founder}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", marginBottom: "20px" }}>{vcard.title}, {vcard.name}</div>
            <div className="space-y-3">
              <a href={`mailto:${vcard.email}`} className="contact-link flex items-center gap-3 active:scale-[0.98]" style={{ minHeight: "36px" }}>
                <Mail size={16} color="#9FB4F7" strokeWidth={2} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#ffffff" }}>{vcard.email}</span>
              </a>
              <a href={`tel:${vcard.phone.replace(/\s/g, "")}`} className="contact-link flex items-center gap-3 active:scale-[0.98]" style={{ minHeight: "36px" }}>
                <Phone size={16} color="#9FB4F7" strokeWidth={2} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#ffffff" }}>{vcard.phone}</span>
              </a>
              <div className="flex items-center gap-3" style={{ minHeight: "36px" }}>
                <Globe size={16} color="#9FB4F7" strokeWidth={2} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#ffffff" }}>{vcard.website}</span>
              </div>
              <div className="flex items-center gap-3" style={{ minHeight: "36px" }}>
                <MapPin size={16} color="#9FB4F7" strokeWidth={2} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#ffffff" }}>{vcard.location}</span>
              </div>
            </div>
            <button onClick={handleSaveContact} className="btn-light w-full flex items-center justify-center gap-2 mt-6 py-3.5 rounded-xl active:scale-[0.98]" style={{ background: "#ffffff", color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9375rem", minHeight: "48px" }}>
              <UserPlus size={17} strokeWidth={2.2} />
              Save to Contacts
            </button>
          </div>
        </Reveal>
        <Reveal delay={280}>
          <button onClick={onQrClick} className="card-hover w-full rounded-2xl p-6 flex flex-col items-center active:scale-[0.99]" style={{ background: "#F5F8FF", border: "1px solid #E8EEFF" }}>
            <div className="p-3 rounded-xl mb-3" style={{ background: "#ffffff" }}>
              <QRPlaceholder size={160} />
            </div>
            <span style={{ color: "#64748B", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}>Tap to expand</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
};

// ============================================================================
// QR Fullscreen
// ============================================================================

const QRFullscreen = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(15, 30, 77, 0.96)" }} onClick={onClose}>
      <button onClick={onClose} className="absolute w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ease-out active:scale-95 hover:bg-white/20" style={{ background: "rgba(255,255,255,0.12)", color: "#ffffff", top: "calc(env(safe-area-inset-top, 0px) + 16px)", right: "24px" }} aria-label="Close">
        <X size={22} />
      </button>
      <div className="p-5 rounded-2xl" style={{ background: "#ffffff" }} onClick={(e) => e.stopPropagation()}>
        <QRPlaceholder size={Math.min(window.innerWidth - 80, 320)} />
      </div>
    </div>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

const Footer = () => (
  <footer className="px-6 py-12 text-center" style={{ background: "#ffffff" }}>
    <Reveal>
      <div style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "1.125rem", letterSpacing: "0.08em", marginBottom: "12px" }}>A click away.</div>
      <div style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400 }}>© Intelbex, Corp. 2026</div>
    </Reveal>
  </footer>
);

// ============================================================================
// TAB BAR
// ============================================================================

const TabBar = ({ active, onChange }) => {
  const tabs = [
    { id: "services", label: "Services", Icon: Briefcase },
    { id: "documents", label: "Documents", Icon: FolderOpen },
    { id: "contact", label: "Contact", Icon: ContactIcon },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40" style={{ background: "rgba(255, 255, 255, 0.92)", backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)", borderTop: "1px solid #E8EEFF", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="flex items-stretch justify-around max-w-2xl mx-auto">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button key={id} onClick={() => onChange(id)} className="tab-btn flex-1 flex flex-col items-center justify-center gap-1 py-2 active:scale-95" style={{ minHeight: "56px" }} aria-label={label}>
              <Icon size={22} color={isActive ? "#294CCC" : "#94A3B8"} strokeWidth={isActive ? 2.4 : 2} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: isActive ? 600 : 500, fontSize: "0.6875rem", color: isActive ? "#294CCC" : "#94A3B8", letterSpacing: "0.01em" }}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// ============================================================================
// ADMIN PANEL
// ============================================================================

const AdminPanel = ({ config, setConfig, onExit, showToast }) => {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [demoHash, setDemoHash] = useState("");

  useEffect(() => { sha256("intelbex2026").then(setDemoHash); }, []);

  const tryLogin = async () => {
    setErr("");
    const h = await sha256(pw);
    if (h === ADMIN_PASSWORD_HASH || h === demoHash) setAuthed(true);
    else setErr("Incorrect password.");
  };

  const updateField = (path, value) => {
    setConfig((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateService = (idx, field, value) => {
    setConfig((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.services[idx][field] = value;
      return next;
    });
  };

  const updateIndustry = (idx, value) => {
    setConfig((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.industries[idx] = value;
      return next;
    });
  };

  const addIndustry = () => {
    setConfig((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.industries.push("New industry");
      return next;
    });
  };

  const removeIndustry = (idx) => {
    setConfig((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.industries.splice(idx, 1);
      return next;
    });
  };

  const downloadConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("config.json downloaded — commit to /content/");
  };

  if (!authed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "#0F1E4D" }}>
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.1)" }}>
              <Lock size={22} color="#ffffff" />
            </div>
            <h1 style={{ color: "#ffffff", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.375rem", letterSpacing: "-0.02em" }}>Admin Access</h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", marginTop: "4px" }}>Enter password to continue</p>
          </div>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && tryLogin()} placeholder="Password" className="w-full px-4 py-3.5 rounded-xl outline-none mb-3" style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", fontFamily: "Inter, sans-serif", fontSize: "1rem", border: "1px solid rgba(255,255,255,0.15)", minHeight: "52px" }} />
          {err && (<div className="mb-3 text-sm" style={{ color: "#FCA5A5", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}>{err}</div>)}
          <button onClick={tryLogin} className="btn-primary w-full py-3.5 rounded-xl active:scale-[0.98]" style={{ background: "#294CCC", color: "#ffffff", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9375rem", minHeight: "52px" }}>Unlock</button>
          <button onClick={onExit} className="w-full mt-3 py-3 text-sm transition-all duration-300 ease-out active:scale-95" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}>← Back to site</button>
          <p className="mt-6 text-xs text-center" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", lineHeight: 1.5 }}>Demo password: intelbex2026<br />Replace hash in source before deploying.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: "#F5F8FF", paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid #E8EEFF" }}>
        <div className="flex items-center gap-2">
          <Settings size={18} color="#294CCC" />
          <span style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9375rem" }}>Admin</span>
        </div>
        <button onClick={onExit} className="px-3 py-1.5 rounded-lg transition-all duration-300 ease-out active:scale-95 hover:bg-[#E8EEFF]" style={{ color: "#64748B", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}>Exit</button>
      </div>
      <div className="p-5 max-w-2xl mx-auto space-y-6 pb-32">
        <div className="p-4 rounded-xl text-sm" style={{ background: "#E8EEFF", color: "#1A2F73", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", lineHeight: 1.5 }}>
          Edits live in memory only. Download updated config.json and commit it to <span style={{ fontFamily: "monospace" }}>/content/</span> in your GitHub repo. Changes go live in 1–2 minutes.
        </div>
        <AdminSection title="Hero">
          <AdminField label="Video URL" value={config.heroVideo} onChange={(v) => updateField("heroVideo", v)} placeholder="/content/hero.mp4" />
          <AdminField label="Small tagline (top of hero)" value={config.heroTagline} onChange={(v) => updateField("heroTagline", v)} />
          <AdminField label="Headline" value={config.tagline} onChange={(v) => updateField("tagline", v)} />
          <AdminField label="Subtitle" value={config.heroSubtitle} onChange={(v) => updateField("heroSubtitle", v)} multiline />
        </AdminSection>
        <AdminSection title="Industries strip">
          <AdminField label="Section label" value={config.industriesLabel} onChange={(v) => updateField("industriesLabel", v)} />
          <div style={{ color: "#64748B", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.02em", marginBottom: "8px" }}>Industries</div>
          {config.industries.map((ind, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input type="text" value={ind} onChange={(e) => updateIndustry(i, e.target.value)} className="flex-1 px-3 py-2.5 rounded-lg outline-none" style={{ background: "#ffffff", color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", border: "1px solid #E8EEFF", minHeight: "44px" }} />
              <button onClick={() => removeIndustry(i)} className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 ease-out active:scale-95 hover:bg-[#FEF2F2]" style={{ color: "#DC2626", background: "#ffffff", border: "1px solid #E8EEFF" }} aria-label="Remove"><X size={16} /></button>
            </div>
          ))}
          <button onClick={addIndustry} className="mt-2 text-sm px-3 py-2 rounded-lg transition-all duration-200 ease-out active:scale-95" style={{ color: "#294CCC", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 600, background: "#E8EEFF" }}>+ Add industry</button>
        </AdminSection>
        <AdminSection title="Inquiry form">
          <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#92400E", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", lineHeight: 1.5, padding: "10px 12px", borderRadius: "8px", marginBottom: "12px" }}>
            Paste a Formspree or Web3Forms endpoint URL to receive submissions by email.<br/>
            See: formspree.io or web3forms.com. Without this, the form shows a "not configured" toast.
          </div>
          <AdminField label="Form endpoint (POST URL)" value={config.formEndpoint} onChange={(v) => updateField("formEndpoint", v)} placeholder="https://formspree.io/f/xxxxxxxx" />
        </AdminSection>
        <AdminSection title="Logos">
          <AdminField label="Wordmark (white)" value={config.logoWhite} onChange={(v) => updateField("logoWhite", v)} />
          <AdminField label="Wordmark (black)" value={config.logoBlack} onChange={(v) => updateField("logoBlack", v)} />
          <AdminField label="Mark only (square ib)" value={config.logoMark} onChange={(v) => updateField("logoMark", v)} />
          <AdminField label="QR code image" value={config.qrCode} onChange={(v) => updateField("qrCode", v)} />
          <div style={{ color: "#64748B", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", lineHeight: 1.5, marginTop: "8px" }}>
            Note: QR and "Save to Contacts" both point to the vCard website field. Update that field in <strong>Contact / vCard</strong> below to change where both lead.
          </div>
        </AdminSection>
        <AdminSection title="Documents">
          <AdminField label="Corporate Presentation" value={config.documents.corporate} onChange={(v) => updateField("documents.corporate", v)} />
          <AdminField label="Services Presentation" value={config.documents.services} onChange={(v) => updateField("documents.services", v)} />
          <AdminField label="One Pager" value={config.documents.onePager} onChange={(v) => updateField("documents.onePager", v)} />
        </AdminSection>
        <AdminSection title="Services">
          {config.services.map((svc, i) => (
            <div key={i} className="p-3 rounded-lg mb-3" style={{ background: "#F5F8FF", border: "1px solid #E8EEFF" }}>
              <AdminField label={`Service ${i + 1} — Title`} value={svc.title} onChange={(v) => updateService(i, "title", v)} />
              <AdminField label="Description" value={svc.description} onChange={(v) => updateService(i, "description", v)} multiline />
            </div>
          ))}
        </AdminSection>
        <AdminSection title="Contact / vCard">
          <AdminField label="Company" value={config.vcard.name} onChange={(v) => updateField("vcard.name", v)} />
          <AdminField label="Founder" value={config.vcard.founder} onChange={(v) => updateField("vcard.founder", v)} />
          <AdminField label="Title" value={config.vcard.title} onChange={(v) => updateField("vcard.title", v)} />
          <AdminField label="Email" value={config.vcard.email} onChange={(v) => updateField("vcard.email", v)} />
          <AdminField label="Phone" value={config.vcard.phone} onChange={(v) => updateField("vcard.phone", v)} />
          <AdminField label="Website" value={config.vcard.website} onChange={(v) => updateField("vcard.website", v)} />
          <AdminField label="Location" value={config.vcard.location} onChange={(v) => updateField("vcard.location", v)} />
        </AdminSection>
        <button onClick={downloadConfig} className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl active:scale-[0.98]" style={{ background: "#294CCC", color: "#ffffff", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9375rem", minHeight: "52px" }}>
          <Save size={18} strokeWidth={2.2} />
          Download config.json
        </button>
      </div>
    </div>
  );
};

const AdminSection = ({ title, children }) => (
  <div className="p-5 rounded-2xl" style={{ background: "#ffffff", border: "1px solid #E8EEFF" }}>
    <h3 className="mb-4" style={{ color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>{title}</h3>
    {children}
  </div>
);

const AdminField = ({ label, value, onChange, placeholder, multiline }) => (
  <div className="mb-3 last:mb-0">
    <label className="block mb-1.5" style={{ color: "#64748B", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.02em" }}>{label}</label>
    {multiline ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className="w-full px-3 py-2.5 rounded-lg outline-none resize-none" style={{ background: "#ffffff", color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", border: "1px solid #E8EEFF", lineHeight: 1.5 }} />
    ) : (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2.5 rounded-lg outline-none" style={{ background: "#ffffff", color: "#0F1E4D", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", border: "1px solid #E8EEFF", minHeight: "44px" }} />
    )}
  </div>
);

// ============================================================================
// ROOT
// ============================================================================

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState("services");
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [qrOpen, setQrOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const servicesRef = useRef(null);
  const documentsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    fetch("content/config.json")
      .then((r) => r.json())
      .then((data) => setConfig((prev) => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const check = () => setIsAdmin(window.location.hash === "#admin");
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  useEffect(() => {
    if (isAdmin) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const id = entry.target.getAttribute("data-section");
          if (id) setActiveTab(id);
        }
      });
    }, { threshold: [0.3, 0.5, 0.7] });
    [servicesRef, documentsRef, contactRef].forEach((r) => { if (r.current) observer.observe(r.current); });
    return () => observer.disconnect();
  }, [isAdmin]);

  const showToast = (msg) => setToast({ show: true, msg });
  const hideToast = () => setToast({ show: false, msg: "" });

  const scrollToSection = (id) => {
    const map = { services: servicesRef, documents: documentsRef, contact: contactRef };
    const r = map[id];
    if (r && r.current) {
      r.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(id);
    }
  };

  const handleDownload = (key) => {
    const url = config.documents[key];
    const a = document.createElement("a");
    a.href = url;
    a.download = `intelbex-${key}.pdf`;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          showToast("File not yet uploaded — add to /content/pdfs/");
        }
      })
      .catch(() => { showToast("File not yet uploaded — add to /content/pdfs/"); });
  };

  if (isAdmin) {
    return (
      <>
        <GlobalStyles />
        <AdminPanel config={config} setConfig={setConfig} onExit={() => { window.location.hash = ""; setIsAdmin(false); }} showToast={showToast} />
        <Toast message={toast.msg} show={toast.show} onHide={hideToast} />
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen w-full overflow-x-hidden scroll-container" style={{ background: "#ffffff", fontFamily: "Inter, sans-serif", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 72px)" }}>
        <Hero config={config} onScrollDown={() => scrollToSection("services")} />
        <IndustriesStrip config={config} />
        <div ref={servicesRef} data-section="services">
          <Services config={config} onDownload={handleDownload} />
        </div>
        <div ref={documentsRef} data-section="documents">
          <DocumentsSection config={config} onDownload={handleDownload} />
        </div>
        <div ref={contactRef} data-section="contact">
          <Contact config={config} onQrClick={() => setQrOpen(true)} showToast={showToast} />
        </div>
        <Footer />
      </div>
      <TabBar active={activeTab} onChange={scrollToSection} />
      <QRFullscreen show={qrOpen} onClose={() => setQrOpen(false)} />
      <Toast message={toast.msg} show={toast.show} onHide={hideToast} />
    </>
  );
}

// ============================================================================
// GLOBAL STYLES
// ============================================================================

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    :root {
      --ib-50: #F5F8FF; --ib-100: #E8EEFF; --ib-200: #C9D6FB; --ib-300: #9FB4F7;
      --ib-400: #6F8FF0; --ib-500: #4A6BE0; --ib-600: #294CCC; --ib-700: #223F99;
      --ib-800: #1A2F73; --ib-900: #0F1E4D;
      --ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
    }
    * { -webkit-tap-highlight-color: transparent; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    html { scroll-behavior: smooth; scroll-snap-type: y proximity; scroll-padding-top: 0; }
    html, body { overscroll-behavior-y: none; -webkit-text-size-adjust: 100%; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
    .scroll-section { scroll-snap-align: start; scroll-snap-stop: normal; }
    @keyframes bounce-soft {
      0%, 100% { transform: translate(-50%, 0); opacity: 0.5; }
      50% { transform: translate(-50%, 8px); opacity: 1; }
    }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-spin { animation: spin 0.8s linear infinite; }
    ::selection { background: #294CCC; color: #ffffff; }
    button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid #294CCC; outline-offset: 2px; }
    input, textarea { font-size: 16px; }
    input:focus, textarea:focus { border-color: #294CCC !important; box-shadow: 0 0 0 3px rgba(41, 76, 204, 0.12); }
    @media (hover: hover) and (pointer: fine) {
      .card-hover { transition: transform 280ms var(--ease-premium), box-shadow 280ms var(--ease-premium), background-color 280ms var(--ease-premium), border-color 280ms var(--ease-premium); }
      .card-hover:hover { transform: translateY(-2px); background: #ffffff !important; border-color: #C9D6FB !important; box-shadow: 0 10px 30px -12px rgba(15, 30, 77, 0.18), 0 4px 10px -4px rgba(15, 30, 77, 0.08); }
      .card-hover:hover .icon-tile { background: #223F99 !important; transform: scale(1.04); }
      .icon-tile { transition: background-color 280ms var(--ease-premium), transform 280ms var(--ease-premium); }
      .btn-primary { transition: transform 250ms var(--ease-premium), box-shadow 250ms var(--ease-premium), filter 250ms var(--ease-premium); box-shadow: 0 4px 14px rgba(41, 76, 204, 0.25); }
      .btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 24px -6px rgba(41, 76, 204, 0.4); filter: brightness(1.05); }
      .hover-lift, .btn-light { transition: transform 250ms var(--ease-premium), box-shadow 250ms var(--ease-premium); }
      .hover-lift:hover, .btn-light:hover { transform: translateY(-1px); box-shadow: 0 8px 20px -4px rgba(15, 30, 77, 0.25); }
      .btn-mini { transition: background-color 220ms var(--ease-premium), transform 220ms var(--ease-premium); }
      .btn-mini:hover { background: #1A2F73 !important; transform: scale(1.03); }
      .doc-row { transition: background-color 220ms var(--ease-premium); }
      .doc-row:hover { background: #FAFCFF; }
      .vcard-hover { transition: transform 320ms var(--ease-premium), box-shadow 320ms var(--ease-premium); }
      .vcard-hover:hover { transform: translateY(-2px); box-shadow: 0 16px 40px -12px rgba(15, 30, 77, 0.4); }
      .contact-link { transition: transform 200ms var(--ease-premium), opacity 200ms var(--ease-premium); opacity: 0.95; }
      .contact-link:hover { transform: translateX(2px); opacity: 1; }
      .tab-btn { transition: background-color 200ms var(--ease-premium), transform 200ms var(--ease-premium); }
      .tab-btn:hover { background: rgba(41, 76, 204, 0.06); }
    }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-snap-type: none; }
      * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  `}</style>
);
