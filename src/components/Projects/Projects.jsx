import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import YouTubeProjectCard from "./YouTubeProjectCard";
import YouTubeModal from "./YouTubeModal";
import Particle from "../Particle";
import "aos/dist/aos.css";
import AOS from "aos";
import { API_BASE_URL } from "../../config/api";
import "./YouTubeProjects.css";

function Projects({ projects: propProjects, loading, error }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  // If projects are passed as props, use them
  // Otherwise, fetch them from the API
  useEffect(() => {
    if (propProjects) {
      setProjects(propProjects);
      setIsLoading(loading || false);
      setErrorMessage(error || null);
    } else {
      // Fetch projects from the API if not provided as props
      const fetchProjects = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${API_BASE_URL}/api/projects`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch projects');
          }
          
          const data = await response.json();
          
          // Process the image paths to use the public URL
          const processedProjects = data.map(project => {
            return {
              ...project,
              imgPath: project.imgPath ? process.env.PUBLIC_URL + project.imgPath : null,
              imagePaths: project.imagePaths ? project.imagePaths.map(path => 
                process.env.PUBLIC_URL + path
              ) : []
            };
          });
          
          setProjects(processedProjects);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching projects:', error);
          setErrorMessage(error.message);
          setIsLoading(false);
        }
      };

      fetchProjects();
    }
  }, [propProjects, loading, error]);

  if (isLoading) {
    return (
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            My Recent <strong className="purple">Works</strong>
          </h1>
          <p style={{ color: "white" }}>Loading projects...</p>
        </Container>
      </Container>
    );
  }

  if (errorMessage) {
    return (
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            My Recent <strong className="purple">Works</strong>
          </h1>
          <p style={{ color: "white" }}>Error: {errorMessage}</p>
        </Container>
      </Container>
    );
  }

  const handleProjectSelect = (project) => {
    if (project && project.youtubeUrl) {
      setSelectedProject(project);
    }
  };

  const handleModalClose = () => {
    setSelectedProject(null);
  };

  return (
    <Container fluid className="project-section youtube-projects-section">
      <Particle />
      <Container className="youtube-projects-container">
        <div className="youtube-section-header" data-aos="fade-up">
          <h1 className="youtube-section-title">
            Selected <strong className="purple">Works</strong>
          </h1>
          <p className="youtube-section-subtitle">
            Featured projects from my portfolio
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="youtube-grid">
            {projects.map((project, index) => {
              // Only render projects with YouTube URLs
              if (!project || !project.youtubeUrl) {
                return null;
              }
              
              return (
                <YouTubeProjectCard
                  key={project.id || `project-${index}`}
                  project={project}
                  onSelect={handleProjectSelect}
                  index={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="youtube-empty-state">
            <p>No projects available</p>
          </div>
        )}
      </Container>

      <YouTubeModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleModalClose}
      />
    </Container>
  );
}

export default Projects;
