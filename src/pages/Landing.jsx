import "../styles/Landing.css";

const STEPS = [
  {
    n: "01",
    title: "Add a folder",
    desc: "Click Add folder in the sidebar and pick any folder full of screenshots or images. ElectricSearch will scan and read the text inside every image automatically.",
  },
  {
    n: "02",
    title: "Wait for indexing to finish",
    desc: "A progress bar at the top shows how many images have been processed. Once it's done, your images are fully searchable — even offline.",
  },
  {
    n: "03",
    title: "Search by typing",
    desc: "Switch to the Search tab and type any word you remember seeing in a screenshot. Results appear instantly as you type.",
  },
  {
    n: "04",
    title: "Open or preview",
    desc: "Click a result to see a larger preview on the right. Double-click to open the original image in your default viewer.",
  },
];

const FEATURES = [
  {
    icon: "🔍",
    color: "cyan",
    title: "Text search",
    desc: "Finds exact words and phrases from the text inside your images.",
  },
  {
    icon: "🤖",
    color: "violet",
    title: "AI search",
    desc: "Understands meaning — search error message and find the right screenshot even if those exact words aren't in it.",
  },
  {
    icon: "📦",
    color: "green",
    title: "Works offline",
    desc: "Everything runs on your computer. No internet needed, no uploads, no accounts.",
  },
  {
    icon: "⚡",
    color: "amber",
    title: "Instant results",
    desc: "Results appear as you type — no waiting, no clicking a search button.",
  },
];

export default function Landing({ onGoToSearch }) {
  return (
    <div className="landing-page">
      <div className="landing-inner">

        {/* Hero */}
        <div className="landing-hero">
          <div className="landing-badge">
            <span className="landing-badge-dot" />
            Offline · Private · Fast
          </div>

          <h1 className="landing-headline">
            Find any screenshot<br />in <em>seconds</em>
          </h1>

          <p className="landing-sub">
            ElectricSearch reads the text inside your images and lets you search through
            thousands of screenshots instantly — right from your desktop, with no internet required.
          </p>

          <button className="landing-cta" onClick={onGoToSearch}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Start searching
          </button>
        </div>

        {/* How it works */}
        <p className="landing-section-title">How it works</p>
        <div className="steps-grid">
          {STEPS.map(s => (
            <div className="step-card" key={s.n}>
              <div className="step-num">{s.n}</div>
              <div className="step-content">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <p className="landing-section-title">What you get</p>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div className="feature-pill" key={f.title}>
              <div className={`feature-pill-icon ${f.color}`}>{f.icon}</div>
              <div>
                <h5>{f.title}</h5>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="tip-box">
          <span className="tip-icon">💡</span>
          <span>
            <strong>Tip: </strong>
            Use <strong>Text</strong> mode when you remember exact words from a screenshot.
            Switch to <strong>AI</strong> mode when you only remember the general topic or idea —
            it's better at understanding what you mean.
          </span>
        </div>

      </div>
    </div>
  );
}