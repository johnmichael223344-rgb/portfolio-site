import { useState } from "react";

type ProjectCategory = "hackathon" | "nc_iii" | "capstone";

const projects: Record<
  ProjectCategory,
  { title: string; type: string; description: string; status: string }[]
> = {
  hackathon: [
    {
      title: "Campus Connect",
      type: "Product Design",
      description: "A student-first collaboration platform shaped during a 24-hour design sprint.",
      status: "Case Study",
    },
    {
      title: "SafeRoute",
      type: "UI / UX",
      description: "A mobile concept that helps commuters share and discover safer city routes.",
      status: "Prototype",
    },
  ],
  nc_iii: [
    {
      title: "Identity System",
      type: "Brand Design",
      description: "A complete visual identity exercise covering marks, type, color, and applications.",
      status: "Coursework",
    },
    {
      title: "Campaign Toolkit",
      type: "Graphic Design",
      description: "A coordinated set of social, print, and digital campaign materials.",
      status: "Coursework",
    },
  ],
  capstone: [
    {
      title: "Application Project",
      type: "Capstone",
      description: "An application development project combining user research, interface design, and code.",
      status: "In Progress",
    },
  ],
};

const categoryLabels: Record<ProjectCategory, string> = {
  hackathon: "Hackathon",
  nc_iii: "NC III",
  capstone: "Capstone",
};

function SectionLabel({ children }: { children: string }) {
  return <h2 className="section-label">{children}</h2>;
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectCategory>("hackathon");

  return (
    <section className="wrap section">
      <SectionLabel>03 / Selected Projects</SectionLabel>
      <div className="project-tabs" role="tablist" aria-label="Project category">
        {(["hackathon", "nc_iii", "capstone"] as ProjectCategory[]).map((category) => (
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
        ))}
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
  );
}
