import React from "react";
import { FaPlay } from "react-icons/fa";
import "./CinemaProjectCard.css";

const CinemaProjectCard = ({
  project,
  onSelect,
  index,
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(project);
    }
  };

  const hasVideo = project.videoUrl && project.videoUrl.trim() !== "";

  return (
    <div
      className="cinema-card-wrapper"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={handleClick}
    >
      <div className="cinema-card">
        <div className="cinema-card-image-container">
          <img
            src={project.imgPath || project.thumbnail}
            alt={project.title}
            className="cinema-card-image"
          />
          <div className="cinema-card-gradient" />
          
          {hasVideo && (
            <div className="cinema-card-play-overlay">
              <div className="cinema-play-button">
                <FaPlay className="cinema-play-icon" />
              </div>
            </div>
          )}
        </div>

        <div className="cinema-card-content">
          {project.type && (
            <span className="cinema-tag">{project.type}</span>
          )}
          {project.category && !project.type && (
            <span className="cinema-tag">{project.category}</span>
          )}
          <h3 className="cinema-card-title">{project.title}</h3>
          {project.year && (
            <p className="cinema-card-year">{project.year}</p>
          )}
          {project.date && !project.year && (
            <p className="cinema-card-year">{project.date}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CinemaProjectCard;

