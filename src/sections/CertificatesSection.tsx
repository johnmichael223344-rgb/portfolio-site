import { useState } from "react";

type CertificateCategory = "all" | "design" | "technology" | "non_developer";

const certificateCategoryLabels: Record<CertificateCategory, string> = {
  all: "All",
  design: "Design & Creative",
  technology: "Technology",
  non_developer: "Non-developer",
};

const certificates: {
  title: string;
  category: Exclude<CertificateCategory, "all">;
  description: string;
  file: string;
  year: string;
}[] = [
  {
    title: "National Certificate III — Visual Graphic Design",
    category: "design",
    description: "Professional competency in visual graphic design, including design foundations, layout development, visual asset creation, and digital production.",
    file: "nc-iii-visual-graphic-design-unlocked.pdf",
    year: "NC III",
  },
  {
    title: "InfoTechnOlympics 2025 — Web Design",
    category: "design",
    description: "Participant in the Web Design category at the University of Makati's InfoTechnOlympics 2025.",
    file: "infotechnolympics-web-design-2025.pdf",
    year: "2025",
  },
  {
    title: "AI Tech 2.0",
    category: "technology",
    description: "Participation certificate for AI Tech 2.0, themed “Think. Code. Evolve: The Future of AI Starts Here.”",
    file: "ai-tech-2-0-participant.pdf",
    year: "2026",
  },
  {
    title: "InfoTechnOlympics 2026: The Tech Odyssey",
    category: "technology",
    description: "Recognition for active participation in the University of Makati InfoTechnOlympics 2026, showcasing skills and knowledge in modern technologies.",
    file: "infotechnolympics-tech-odyssey-2026.pdf",
    year: "2026",
  },
  {
    title: "CCIS Student Leadership Team Building",
    category: "non_developer",
    description: "Recognition for service and contribution as a participant in the 2025 CCIS Student Leadership Team Building.",
    file: "ccis-leadership-team-building-2025.pdf",
    year: "2025",
  },
  {
    title: "CCIS General Assembly",
    category: "non_developer",
    description: "Certificate of appreciation for attending the 2025 CCIS General Assembly, themed “CCIS@25: Debugging the Future with Innovation, Collaboration, and Excellence.”",
    file: "ccis-general-assembly-2025.pdf",
    year: "2025",
  },
  {
    title: "Film Showing on Escherian Stairwell",
    category: "non_developer",
    description: "Participation in the University of Makati film showing event held on October 30, 2025.",
    file: "film-showing-escherian-stairwell-2025.pdf",
    year: "2025",
  },
  {
    title: "Mighty Magulang: Adventures in Ninuno-Hunting",
    category: "non_developer",
    description: "Participation in a CLAS magisterial lecture hosted by the Department of Social Sciences, Philosophy, and Humanities on September 19, 2025.",
    file: "mighty-magulang-lecture-2025.pdf",
    year: "2025",
  },
];

function SectionLabel({ children }: { children: string }) {
  return <h2 className="section-label">{children}</h2>;
}

export default function CertificatesSection() {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const visibleCertificates = certificates.filter(
    (certificate) => activeCategory === "all" || certificate.category === activeCategory,
  );
  const activeCertificate = visibleCertificates[activeIndex] ?? visibleCertificates[0];
  const moveCertificate = (step: number) => {
    setDirection(step > 0 ? "next" : "previous");
    setActiveIndex((index) => (index + step + visibleCertificates.length) % visibleCertificates.length);
  };

  return (
    <section className="wrap section">
      <SectionLabel>02 / Certificates</SectionLabel>
      <p className="certificate-intro">
        A collection of credentials and experiences across design, technology, and campus life. Each item opens its original PDF.
      </p>
      <div className="certificate-filters" role="tablist" aria-label="Certificate category">
        {(["all", "design", "technology", "non_developer"] as CertificateCategory[]).map((category) => (
          <button
            aria-selected={activeCategory === category}
            id={`certificate-tab-${category}`}
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setActiveIndex(0);
              setDirection("next");
            }}
            role="tab"
            type="button"
          >
            {certificateCategoryLabels[category]}
          </button>
        ))}
      </div>
      <div className={`certificate-carousel-stage slide-${direction}`}>
        <div
          className="certificate-carousel"
          role="tabpanel"
          aria-labelledby={`certificate-tab-${activeCategory}`}
          aria-live="polite"
        >
          {activeCertificate && (
            <article className="certificate-entry certificate-current card" key={`${activeCategory}-${activeCertificate.file}`}>
              <div className="certificate-entry-meta">
                <span>{certificateCategoryLabels[activeCertificate.category]}</span>
                <span>{activeCertificate.year}</span>
              </div>
              <h2>{activeCertificate.title}</h2>
              <p>{activeCertificate.description}</p>
              <a
                className="certificate-link"
                href={`${import.meta.env.BASE_URL}certificates/${activeCertificate.file}`}
                rel="noreferrer"
                target="_blank"
              >
                OPEN CERTIFICATE PDF <span aria-hidden="true">↗</span>
              </a>
            </article>
          )}
        </div>
        <div className="certificate-carousel-controls" aria-label="Certificate carousel controls">
          <button type="button" onClick={() => moveCertificate(-1)} aria-label="Previous certificate">
            <span className="certificate-control-label">PREV</span>
            <span className="certificate-control-arrow" aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => moveCertificate(1)} aria-label="Next certificate">
            <span className="certificate-control-label">NEXT</span>
            <span className="certificate-control-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div className="certificate-carousel-nav" role="group" aria-label="Choose certificate">
        {visibleCertificates.map((certificate, index) => (
          <button
            key={certificate.file}
            type="button"
            aria-label={`Show certificate ${index + 1}: ${certificate.title}`}
            aria-pressed={index === activeIndex}
            className={index === activeIndex ? "active" : ""}
            onClick={() => {
              setDirection(index >= activeIndex ? "next" : "previous");
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
    </section>
  );
}
