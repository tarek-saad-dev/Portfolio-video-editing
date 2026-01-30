import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTimes, FaClock, FaFilm } from "react-icons/fa";
import { extractYouTubeId, getYouTubeEmbedUrl, getProjectThumbnail } from "../../utils/youtubeUtils";
import "./YouTubeModal.css";

const YouTubeModal = ({ project, isOpen, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  // Handle client-side mounting for iframe
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extract YouTube embed URL when project changes
  useEffect(() => {
    if (project && project.youtubeUrl && isMounted) {
      const videoId = extractYouTubeId(project.youtubeUrl);
      if (videoId) {
        const embed = getYouTubeEmbedUrl(videoId, {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        });
        setEmbedUrl(embed);
      } else {
        setEmbedUrl(null);
      }
    } else {
      setEmbedUrl(null);
    }
  }, [project, isMounted]);

  // Get thumbnail
  useEffect(() => {
    if (project && isMounted) {
      const thumb = getProjectThumbnail(project);
      setThumbnail(thumb);
    }
  }, [project, isMounted]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
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

  if (!project || !isMounted) return null;

  const hasVideo = embedUrl !== null;
  const tools = project.tools || [];
  const toolsArray = Array.isArray(tools) ? tools : [];

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      className="youtube-modal"
      centered
      size="xl"
      backdrop="static"
      aria-labelledby="youtube-modal-title"
    >
      <Modal.Body className="youtube-modal-body">
        <button
          className="youtube-modal-close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <FaTimes />
        </button>

        {/* Video/Image Section */}
        <div className="youtube-modal-media">
          {hasVideo && embedUrl ? (
            <div className="youtube-video-container">
              <iframe
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={project.title || 'Video player'}
                className="youtube-video-iframe"
                loading="lazy"
              />
            </div>
          ) : thumbnail ? (
            <div className="youtube-image-container">
              <img
                src={thumbnail}
                alt={project.title || 'Project thumbnail'}
                className="youtube-modal-image"
                loading="lazy"
              />
              <div className="youtube-image-overlay" />
            </div>
          ) : (
            <div className="youtube-placeholder">
              <p>No video available</p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="youtube-modal-content">
          <div className="youtube-modal-header-content">
            <div>
              {project.category && (
                <span className="youtube-modal-category">{project.category}</span>
              )}
              <h2 id="youtube-modal-title" className="youtube-modal-title">
                {project.title || 'Untitled Project'}
              </h2>
            </div>
            {project.year && (
              <span className="youtube-modal-year">{project.year}</span>
            )}
          </div>

          {project.description && (
            <p className="youtube-modal-description">{project.description}</p>
          )}

          {/* Project Details */}
          <div className="youtube-modal-details">
            <div className="youtube-detail-grid">
              {project.duration && (
                <div className="youtube-detail-item">
                  <div className="youtube-detail-header">
                    <FaClock className="youtube-detail-icon" />
                    <span className="youtube-detail-label">Duration</span>
                  </div>
                  <p className="youtube-detail-value">{project.duration}</p>
                </div>
              )}

              {toolsArray.length > 0 && (
                <div className="youtube-detail-item">
                  <div className="youtube-detail-header">
                    <FaFilm className="youtube-detail-icon" />
                    <span className="youtube-detail-label">Tools</span>
                  </div>
                  <div className="youtube-tools-list">
                    {toolsArray.map((tool, index) => {
                      const toolName = typeof tool === 'object' && tool !== null && tool.name
                        ? tool.name
                        : String(tool || '');
                      
                      if (!toolName) return null;

                      return (
                        <span key={index} className="youtube-tool-tag">
                          {toolName}
                          {index < toolsArray.length - 1 && (
                            <span className="youtube-tool-separator">•</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default YouTubeModal;

