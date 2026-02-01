import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FaTimes, FaClock, FaFilm } from "react-icons/fa";
import "./CinemaModal.css";

const CinemaModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!project) return null;

  // Extract video embed URL
  const getEmbedUrl = () => {
    if (!project.videoUrl) return null;

    const videoType = project.videoType || "vimeo";

    if (videoType === "vimeo") {
      const match = project.videoUrl.match(
        /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/,
      );
      return match ? `https://player.vimeo.com/video/${match[1]}` : null;
    } else if (videoType === "youtube") {
      const match = project.videoUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      );
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    } else if (videoType === "html5") {
      return project.videoUrl;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();
  const hasVideo = embedUrl !== null;

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      className="cinema-modal"
      centered
      size="xl"
      backdrop={true}
    >
      <Modal.Body className="cinema-modal-body">
        <button
          className="cinema-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* Video/Image Section */}
        <div className="cinema-modal-media">
          {hasVideo ? (
            <div className="cinema-video-container">
              {project.videoType === "html5" ? (
                <video
                  controls
                  autoPlay={false}
                  className="cinema-video-player"
                  src={embedUrl}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={embedUrl}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                  className="cinema-video-iframe"
                />
              )}
            </div>
          ) : (
            <div className="cinema-image-container">
              <img
                src={project.imgPath || project.thumbnail}
                alt={project.title}
                className="cinema-modal-image"
              />
              <div className="cinema-image-overlay" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="cinema-modal-content">
          <div className="cinema-modal-header-content">
            <div>
              {project.type && (
                <span className="cinema-tag">{project.type}</span>
              )}
              {project.category && !project.type && (
                <span className="cinema-tag">{project.category}</span>
              )}
              <h2 className="cinema-modal-title">{project.title}</h2>
            </div>
            {(project.year || project.date) && (
              <span className="cinema-modal-year">
                {project.year || project.date}
              </span>
            )}
          </div>

          {project.description && (
            <p className="cinema-modal-description">{project.description}</p>
          )}

          {/* Project Details */}
          <div className="cinema-modal-details">
            <div className="cinema-detail-grid">
              {project.duration && (
                <div className="cinema-detail-item">
                  <div className="cinema-detail-header">
                    <FaClock className="cinema-detail-icon" />
                    <span className="cinema-detail-label">Duration</span>
                  </div>
                  <p className="cinema-detail-value">{project.duration}</p>
                </div>
              )}

              {(project.tools || project.skills) && (
                <div className="cinema-detail-item">
                  <div className="cinema-detail-header">
                    <FaFilm className="cinema-detail-icon" />
                    <span className="cinema-detail-label">Post Production</span>
                  </div>
                  <div className="cinema-tools-list">
                    {(project.tools || project.skills || []).map(
                      (tool, index) => {
                        const toolName =
                          typeof tool === "object" ? tool.name : tool;
                        return (
                          <span key={index} className="cinema-tool-tag">
                            {toolName}
                            {index <
                              (project.tools || project.skills || []).length -
                                1 && (
                              <span className="cinema-tool-separator">•</span>
                            )}
                          </span>
                        );
                      },
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          {(project.ghLink || project.demoLink) && (
            <div className="cinema-modal-links">
              {project.ghLink && (
                <a
                  href={project.ghLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cinema-link-button"
                >
                  View Source
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cinema-link-button"
                >
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CinemaModal;
