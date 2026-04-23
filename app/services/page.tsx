export const metadata = {
  title: "Services | ScholarAssistant",
  description:
    "Explore research paper editing, plagiarism removal, AI rewriting, and academic support services by ScholarAssistant.",
};

export default function Services() {
  const services = [
    ["Research Editing", "Improve grammar and clarity"],
    ["Plagiarism Reduction", "Reduce similarity index"],
    ["AI Rewriting", "Humanize AI-generated content"],
    ["Research Guidance", "Structure & improve papers"],
    ["Formatting", "APA, IEEE, MLA support"],
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Our Services</h1>

      {services.map((s, i) => (
        <div key={i} className="card-box">
          <h2>{s[0]}</h2>
          <p>{s[1]}</p>
        </div>
      ))}
    </div>
  );
}