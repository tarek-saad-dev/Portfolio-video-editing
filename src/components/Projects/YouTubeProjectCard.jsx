import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { getProjectThumbnail } from "../../utils/youtubeUtils";
import "./YouTubeProjectCard.css";

const YouTubeProjectCard = ({ project, onSelect, index }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Safely get thumbnail on client side
    if (typeof window !== 'undefined') {
      const thumb = getProjectThumbnail(project);
      setThumbnail(thumb);
    }
  }, [project]);

  const handleClick = () => {
    if (onSelect && project.youtubeUrl) {
      onSelect(project);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  if (!project) return null;

  const hasVideo = project.youtubeUrl && typeof project.youtubeUrl === 'string' && project.youtubeUrl.trim();

  return (
    <div
      className="youtube-card-wrapper"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={hasVideo ? 0 : -1}
      aria-label={`View ${project.title || 'project'}`}
    >
      <div className="youtube-card">
        <div className="youtube-card-image-container">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={project.title || 'Project thumbnail'}
              className="youtube-card-image"
              loading="lazy"
              onError={(e) => {
                // Fallback to default thumbnail if image fails to load
                e.target.src = 'https://via.placeholder.com/1280x720/1a1a1a/ffffff?text=No+Thumbnail';
              }}
            />
          ) : (
            <div className="youtube-card-placeholder">
              <FaPlay className="placeholder-icon" />
            </div>
          )}
          
          <div className="youtube-card-gradient" />
          
          {hasVideo && (
            <div className={`youtube-card-play-overlay ${isHovered ? 'hovered' : ''}`}>
              <div className="youtube-play-button">
                <FaPlay className="youtube-play-icon" />
              </div>
            </div>
          )}
        </div>

        <div className="youtube-card-content">
          {project.category && (
            <span className="youtube-card-category">{project.category}</span>
          )}
          <h3 className="youtube-card-title">{project.title || 'Untitled Project'}</h3>
          <div className="youtube-card-meta">
            {project.year && (
              <span className="youtube-card-year">{project.year}</span>
            )}
            {project.duration && (
              <span className="youtube-card-duration">{project.duration}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeProjectCard;

