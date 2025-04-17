import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const experiences = [
  {
    id: 1,
    title: "PHP and SQL Intern",
    company: "Information Technology Institute (ITI)",
    duration: "July 2023",
    type: "Internship Remotely",
    role: [
      "Studied full-stack web fundamentals including HTML, CSS, JavaScript, and backend development with PHP.",
      "Designed and implemented relational databases, and practiced API development and integration.",
    ],
  },
  {
    id: 2,
    title: "IoT Project Consultant",
    company: "STEM School, El Obour, Egypt",
    duration: "January 2022",
    type: "Freelance Project Support",
    role: [
      "Collaborated with students on an IoT project involving temperature and soil moisture sensors to automate irrigation.",
      "Designed the mobile application UI/UX and improved backend logic and database integration.",
      "Guided students in understanding programming logic and Arduino code implementation.",
    ],
  },
  {
    id: 3,
    title: "Android Full-Stack Development Trainee",
    company: "Information Technology Institute (ITI)",
    duration: "Summer 2024",
    type: "Training Program",
    role: [
      "Learned clean code principles and clean architecture through intensive training and a final 3-week team project.",
      "Led the team as project leader, managing GitHub branches and task distribution.",
      "Enhanced problem-solving and debugging skills through continuous feedback from instructors.",
    ],
  },
  {
    id: 4,
    title: "Graduation Project – AI-Based Learning Path Recommender",
    company: "Faculty of Computers and Information",
    duration: "July 2024 – Present",
    type: "Academic Project",
    role: [
      "Developing an intelligent educational platform using machine learning to generate personalized programming learning paths.",
      "System analyzes users’ learning styles, prior knowledge, and goals to suggest a tailored curriculum.",
      "Handled core logic design, algorithm development, and full-stack implementation.",
    ],
  },
  {
    id: 5,
    title: "Top 10 Finalist – Benha Hackathon",
    company: "Benha University",
    duration: "January 2024",
    type: "Competition",
    role: [
      "Created a software solution to translate sign language into speech, aiding communication for the deaf and mute community.",
      "Selected among the top 10 teams from leading universities across Egypt.",
      "The idea was featured in Egyptian newspapers as a technological solution for a humanitarian challenge.",
    ],
  },
];


function WorkExperience() {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      offset: 100, // Offset before animation starts
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <div className="work-experience-container">
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div className="timeline-card">
              <h3 className="timeline-title">{exp.title}</h3>
              <p className="timeline-company">{exp.company}</p>
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
    </div>
  );
}

export default WorkExperience;
