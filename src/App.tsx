import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

type ProjectCategory = "hackathon" | "nc_iii" | "capstone";

const projects: Record<
  ProjectCategory,
  { title: string; type: string; description: string; status: string }[]
> = {
  hackathon: [
    {
      title: "Campus Connect",
      type: "Product Design",
      description:
        "A student-first collaboration platform shaped during a 24-hour design sprint.",
      status: "Case Study",
    },
    {
      title: "SafeRoute",
      type: "UI / UX",
      description:
        "A mobile concept that helps commuters share and discover safer city routes.",
      status: "Prototype",
    },
  ],
  nc_iii: [
    {
      title: "Identity System",
      type: "Brand Design",
      description:
        "A complete visual identity exercise covering marks, type, color, and applications.",
      status: "Coursework",
    },
    {
      title: "Campaign Toolkit",
      type: "Graphic Design",
      description:
        "A coordinated set of social, print, and digital campaign materials.",
      status: "Coursework",
    },
  ],
  capstone: [
    {
      title: "Application Project",
      type: "Capstone",
      description:
        "An application development project combining user research, interface design, and code.",
      status: "In Progress",
    },
  ],
};

const categoryLabels: Record<ProjectCategory, string> = {
  hackathon: "Hackathon",
  nc_iii: "NC III",
  capstone: "Capstone",
};

const skyline = Array.from({ length: 24 }, (_, index) => ({
  left: (index / 24) * 100,
  width: 3 + ((index * 7) % 5),
  height: 20 + ((index * 19) % 54),
  delay: (index % 5) * 0.28,
}));

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function Cityscape() {
  return (
    <div className="city-scene" aria-hidden="true">
      <div className="city-scanlines" />
      <div className="planet-orbit">
        <span className="planet" />
      </div>
      <div className="neon-sign sign-helix">HELIX<br />LABS</div>
      <div className="neon-sign sign-delta">DELTA<br />DISTRICT</div>
      <div className="neon-sign sign-arcade">NIGHT<br />ARCADE</div>
      <div className="skyline skyline-back">
        {skyline.map((building, index) => (
          <span
            className="building"
            key={`back-${index}`}
            style={{
              left: `${building.left}%`,
              width: `${building.width}%`,
              height: `${building.height * 0.72}%`,
              animationDelay: `${building.delay}s`,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="skyline skyline-front">
        {skyline.map((building, index) => (
          <span
            className="building"
            key={`front-${index}`}
            style={{
              left: `${(building.left + 2) % 100}%`,
              width: `${building.width + 1}%`,
              height: `${building.height}%`,
              animationDelay: `${building.delay + 0.12}s`,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="tower tower-left"><span /></div>
      <div className="tower tower-right"><span /></div>
      <div className="sky-rail sky-rail-back" />
      <div className="sky-rail sky-rail-front" />
      <div className="walkway" />
      <div className="hero-silhouette"><span /></div>
      <div className="city-caption">MAKATI / 01:42 AM</div>
    </div>
  );
}

export default function App() {
  const [activeProject, setActiveProject] =
    useState<ProjectCategory>("hackathon");
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
              <small>DESIGN / CODE</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#certificate">Certificate</a>
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
            </div>
            <div className="hero-index" aria-hidden="true">
              <span>CREATIVE FILE</span>
              <strong>001</strong>
              <i />
              <span>MANILA, PH</span>
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

        <section className="wrap section" id="certificate">
          <SectionLabel>02 / Certificate</SectionLabel>
          <article className="certificate-card card">
            <div className="cert-badge" aria-hidden="true">
              <span className="cert-star">★</span>
              <small>VERIFIED</small>
            </div>
            <div className="cert-body">
              <span className="cert-type">PROFESSIONAL CREDENTIAL</span>
              <h2>National Certificate III — Visual Graphic Design</h2>
              <p>
                Certified competency in visual graphic design, including design
                fundamentals, layout development, visual asset creation, and
                digital production workflows.
              </p>
              <div className="cert-tags">
                <span>NC III</span>
                <span>VISUAL GRAPHIC DESIGN</span>
                <span>CREDENTIAL EARNED</span>
              </div>
            </div>
          </article>
        </section>

        <section className="wrap section" id="projects">
          <SectionLabel>03 / Selected Projects</SectionLabel>
          <div className="project-tabs" role="tablist" aria-label="Project category">
            {(["hackathon", "nc_iii", "capstone"] as ProjectCategory[]).map(
              (category) => (
                <button
                  aria-selected={activeProject === category}
                  id={`tab-${category}`}
                  key={category}
                  onClick={() => setActiveProject(category)}
                  role="tab"
                  type="button"
                >
                  <span aria-hidden="true">▸</span> {categoryLabels[category]}
                </button>
              ),
            )}
          </div>
          <div className="project-grid" role="tabpanel" aria-labelledby={`tab-${activeProject}`}>
            {projects[activeProject].map((project, index) => (
              <article className="project-card card" key={project.title}>
                <div className="project-head">
                  <span className="project-num">FILE_{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-status"><i /> {project.status}</span>
                </div>
                <div className={`project-visual v-${index + 1}`} aria-hidden="true">
                  <span /><span /><span /><b /><i />
                </div>
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="project-link">CASE FILE <span aria-hidden="true">↗</span></span>
              </article>
            ))}
          </div>
        </section>

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
                href="https://github.com/johnmichael223344-rgb"
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
