import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getOrgLogo } from "../../Assets/org-logos";

function WorkExperience({ experiences = [] }) {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      offset: 100, // Offset before animation starts
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  // Get organization logo or fallback to first letter
  const getOrgLogoDisplay = (exp) => {
    const logoSrc = exp.organizationLogoKey
      ? getOrgLogo(exp.organizationLogoKey)
      : null;

    if (logoSrc) {
      return (
        <img src={logoSrc} alt={`${exp.company} logo`} className="org-logo" />
      );
    }

    // Fallback: first letter of company name
    const firstLetter = exp.company ? exp.company.charAt(0).toUpperCase() : "?";
    return <div className="org-logo-fallback">{firstLetter}</div>;
  };

  return (
    <div className="work-experience-container">
      {experiences.length === 0 ? (
        <div className="text-center" style={{ color: "white" }}>
          No work experience data available.
        </div>
      ) : (
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div
              key={exp._id || index}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div className="timeline-card">
                <div className="timeline-header">
                  {getOrgLogoDisplay(exp)}
                  <div className="timeline-header-text">
                    <h3 className="timeline-title">{exp.title}</h3>
                    <p className="timeline-company">{exp.company}</p>
                  </div>
                </div>
                <p className="timeline-duration">{exp.duration}</p>
                <p className="timeline-type">
                  <strong>Type:</strong> {exp.type}
                </p>
                <ul className="timeline-role">
                  {exp.role.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkExperience;
