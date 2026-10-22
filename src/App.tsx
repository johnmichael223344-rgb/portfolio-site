import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

const bibleVerses = [
  { quote: "I CAN DO ALL THINGS", reference: "PHILIPPIANS 4:13" },
  { quote: "BE STRONG AND COURAGEOUS", reference: "JOSHUA 1:9" },
  { quote: "TRUST IN THE LORD", reference: "PROVERBS 3:5" },
  { quote: "LET ALL YOU DO BE DONE IN LOVE", reference: "1 CORINTHIANS 16:14" },
  { quote: "THE LORD IS MY SHEPHERD", reference: "PSALM 23:1" },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className="section-label">{children}</h2>;
}

function Cityscape() {
  return <div className="city-scene" aria-hidden="true" />;
}

type DeferredSectionKind = "certificates" | "projects";

const sectionLoaders = {
  certificates: () => import("./sections/CertificatesSection"),
  projects: () => import("./sections/ProjectsSection"),
};

function DeferredSection({ id, kind }: { id: string; kind: DeferredSectionKind }) {
  const host = useRef<HTMLDivElement>(null);
  const [Section, setSection] = useState<ComponentType | null>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    const loadSection = () => {
      void sectionLoaders[kind]().then(({ default: LoadedSection }) => {
        if (!cancelled) setSection(() => LoadedSection);
      });
    };

    if (!("IntersectionObserver" in window)) {
      loadSection();
      return () => { cancelled = true; };
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        observer?.disconnect();
        loadSection();
      }
    }, { rootMargin: "240px 0px" });
    observer.observe(element);

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [kind]);

  const placeholderHeight = kind === "certificates" ? "520px" : "620px";
  return (
    <div
      id={id}
      ref={host}
      style={{ minHeight: Section ? undefined : placeholderHeight }}
      aria-busy={!Section}
    >
      {Section ? <Section /> : <div aria-hidden="true" />}
    </div>
  );
}


export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("portfolio-theme") !== "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    window.localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="site">
      <header className="topbar">
        <div className="wrap nav-inner">
          <a className="brand" href="#top" aria-label="Maikeru home">
            <span className="brand-mark">JM</span>
            <span className="brand-copy">
              <strong>MAIKERU</strong>
              <small>DEVELOPER</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#certificate">Certificates</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
              aria-pressed={darkMode}
              onClick={() => setDarkMode((current) => !current)}
            >
              <span className="theme-icon" aria-hidden="true">
                {darkMode ? "☼" : "☾"}
              </span>
              <span>{darkMode ? "LIGHT" : "DARK"}</span>
            </button>
            <a className="nav-cta" href="mailto:johnmichael223344@gmail.com">
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <Cityscape />
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <div className="hero-availability">
                <span className="status-dot" />
                <span>OPEN TO SELECT OPPORTUNITIES</span>
              </div>
              <p className="hero-kicker">VISUAL DESIGN <i /> APPLICATION DEVELOPMENT</p>
              <img
                className="hero-index-photo"
                src={`${import.meta.env.BASE_URL}images/temporary-profile.webp`}
                srcSet={`${import.meta.env.BASE_URL}images/temporary-profile-128.webp 128w, ${import.meta.env.BASE_URL}images/temporary-profile-320.webp 320w`}
                sizes="(max-width: 620px) 68px, 156px"
                alt="Temporary profile picture of John Michael"
              />
              <h1>
                JOHN MICHAEL
                <br />
                <em>O. BAUTISTA</em>
              </h1>
              <p className="hero-role">
                Visual designer and application developer based in Manila. I create clear, considered digital experiences and visual identities.
              </p>
              <div className="hero-tags">
                <span>VISUAL DESIGN</span>
                <span>NC III</span>
                <span>APP DEVELOPMENT</span>
              </div>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">
                  EXPLORE PROJECTS <span aria-hidden="true">↘</span>
                </a>
                <a className="btn btn-secondary" href="#about">
                  ABOUT ME
                </a>
              </div>
              <div className="hero-verse">
                <span>&ldquo;{verse.quote}&rdquo;</span>
                <span>{verse.reference}</span>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            <span className="scroll-square" /> SCROLL TO EXPLORE
          </a>
        </section>

        <section className="wrap section" id="about">
          <SectionLabel>01 / About Me</SectionLabel>
          <div className="about-grid">
            <article className="about-text card">
              <p className="micro-label">A LITTLE ABOUT MY WORLD</p>
              <p>
                Hi, I&apos;m <strong>John Michael O. Bautista</strong>, a Visual
                Graphic Design specialist and Computer Science student majoring
                in Application Development. I enjoy combining clear systems,
                strong visual hierarchy, and a little playful character.
              </p>
              <p>
                My work moves between visual identities, interface design, and
                digital products, with a focus on making ideas feel intentional
                and easy to use.
              </p>
            </article>
            <aside className="quick-facts" aria-label="Quick facts">
              <div>
                <span className="fact-label">LOCATION</span>
                <strong>Manila, Philippines</strong>
              </div>
              <div>
                <span className="fact-label">FOCUS</span>
                <strong>Design + Development</strong>
              </div>
              <div>
                <span className="fact-label">STATUS</span>
                <strong className="status-open">Open to opportunities</strong>
              </div>
            </aside>
          </div>
        </section>

        <DeferredSection id="certificate" kind="certificates" />
        <DeferredSection id="projects" kind="projects" />

        <section className="wrap contact-section" id="contact">
          <div className="contact-card card">
            <div className="contact-spark" aria-hidden="true">✳</div>
            <p className="micro-label">HAVE A GOOD IDEA?</p>
            <h2>Let&apos;s discuss your next project.</h2>
            <p>
              Open to creative opportunities, project collaborations, and a
              friendly hello.
            </p>
            <div className="contact-actions">
              <a className="btn btn-primary" href="mailto:johnmichael223344@gmail.com">
                GET IN TOUCH <span aria-hidden="true">↗</span>
              </a>
              <a
                className="btn btn-accent"
                href="https://github.com/kerusan1"
                rel="noreferrer"
                target="_blank"
              >
                GITHUB PROFILE
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <span>© 2026 JOHN MICHAEL O. BAUTISTA</span>
          <span>BUILT WITH CARE IN MANILA <i>✦</i></span>
        </div>
      </footer>
    </div>
  );
}
