import { useState, type ReactNode } from "react";

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

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

export default function App() {
  const [activeProject, setActiveProject] =
    useState<ProjectCategory>("hackathon");

  return (
    <div className="site">
      <header className="topbar">
        <div className="wrap nav-inner">
          <a className="brand" href="#top">
            <span className="brand-dot" />
            Maikeru
          </a>
          <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#certificate">Certificate</a>
            <a href="#projects">Projects</a>
          </nav>
          <a className="nav-cta" href="mailto:johnmichael223344@gmail.com">
            Get in touch
          </a>
        </div>
      </header>

      <main id="top">
        {/* ── Hero ── */}
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="hero-availability">
              <span />
              Available for work
            </div>
            <h1>
              John Michael O.
              <br />
              <em>Bautista</em>
            </h1>
            <p className="hero-role">
              Visual Graphic Designer &amp; Computer Science student creating
              purposeful digital experiences — from brand identities to
              interactive products.
            </p>
            <div className="hero-tags">
              <span>Visual Design</span>
              <span>NC III Holder</span>
              <span>App Development</span>
            </div>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                View projects
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path
                    d="M5 12h14m-5-5 5 5-5 5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </a>
              <a className="btn btn-secondary" href="#certificate">
                Explore portfolio
              </a>
            </div>
          </div>

          <div className="hero-portrait">
            <div className="portrait-frame">
              <div className="portrait-avatar" aria-label="Abstract portrait">
                <span className="p-hair-1" />
                <span className="p-hair-2" />
                <span className="p-face" />
                <span className="p-eye-l" />
                <span className="p-eye-r" />
                <span className="p-shirt" />
              </div>
            </div>
            <p className="portrait-caption">Manila, Philippines</p>
          </div>
        </section>

        {/* ── About ── */}
        <section className="wrap section" id="about">
          <SectionLabel>About Me</SectionLabel>
          <div className="about-grid">
            <article className="about-text card">
              <p>
                Hi, I&apos;m <strong>John Michael O. Bautista</strong>, a
                Visual Graphic Design specialist and Computer Science student
                majoring in Application Development. I enjoy combining clear
                systems, strong visual hierarchy, and a little playful
                character.
              </p>
              <p>
                My work moves between visual identities, interface design, and
                digital products — always with a focus on making ideas feel
                intentional and easy to use.
              </p>
            </article>
            <aside className="quick-facts">
              <div>
                <span className="fact-label">Location</span>
                <strong>Manila, PH</strong>
              </div>
              <div>
                <span className="fact-label">Focus</span>
                <strong>Design + Development</strong>
              </div>
              <div>
                <span className="fact-label">Status</span>
                <strong className="status-open">Open to opportunities</strong>
              </div>
            </aside>
          </div>
        </section>

        {/* ── Certificate ── */}
        <section className="wrap section" id="certificate">
          <SectionLabel>Certificate</SectionLabel>
          <article className="certificate-card card">
            <div className="cert-badge">
              <span className="cert-star">★</span>
              <small>Verified</small>
            </div>
            <div className="cert-body">
              <span className="cert-type">Professional Credential</span>
              <h3>National Certificate III — Visual Graphic Design</h3>
              <p>
                Certified competency in visual graphic design, including
                design fundamentals, layout development, visual asset creation,
                and digital production workflows.
              </p>
              <div className="cert-tags">
                <span>NC III</span>
                <span>Visual Graphic Design</span>
                <span>Credential Earned</span>
              </div>
            </div>
          </article>
        </section>

        {/* ── Projects ── */}
        <section className="wrap section" id="projects">
          <SectionLabel>Projects</SectionLabel>
          <div className="project-tabs" role="tablist">
            {(["hackathon", "nc_iii", "capstone"] as ProjectCategory[]).map(
              (category) => (
                <button
                  aria-selected={activeProject === category}
                  key={category}
                  onClick={() => setActiveProject(category)}
                  role="tab"
                  type="button"
                >
                  {categoryLabels[category]}
                </button>
              ),
            )}
          </div>
          <div className="project-grid">
            {projects[activeProject].map((project, index) => (
              <article className="project-card card" key={project.title}>
                <div className="project-head">
                  <span className="project-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="project-status">{project.status}</span>
                </div>
                <div className={`project-visual v-${index + 1}`}>
                  <span />
                  <span />
                  <span />
                </div>
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button className="project-link" type="button">
                  View case study
                  <span>↗</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="wrap contact-section">
          <div className="contact-card card">
            <h2>Let&apos;s build something together.</h2>
            <p>
              Open to creative opportunities, project collaborations, and a
              friendly hello.
            </p>
            <div className="contact-actions">
              <a
                className="btn btn-primary"
                href="mailto:johnmichael223344@gmail.com"
              >
                Send an email
              </a>
              <a
                className="btn btn-accent"
                href="https://github.com/johnmichael223344-rgb"
                rel="noreferrer"
                target="_blank"
              >
                GitHub profile
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <span>© 2026 John Michael O. Bautista</span>
          <span>Built with care in Manila</span>
        </div>
      </footer>
    </div>
  );
}
