import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./VideoModal.css";

const VideoModal = ({ isOpen, onClose, videoUrl, title, videoType = "vimeo" }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Extract Vimeo video ID from URL
  const getVimeoId = (url) => {
    const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    return match ? match[1] : null;
  };

  // Extract YouTube video ID from URL (if needed later)
  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  // Determine video embed URL
  const getEmbedUrl = () => {
    if (videoType === "vimeo") {
      const vimeoId = getVimeoId(videoUrl);
      return vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : null;
    } else if (videoType === "youtube") {
      const youtubeId = getYouTubeId(videoUrl);
      return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;
    } else if (videoType === "html5") {
      return videoUrl; // Direct video URL
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        
        <div className="video-modal-header">
          <h2 className="video-modal-title">{title}</h2>
        </div>

        <div className="video-modal-player">
          {embedUrl ? (
            videoType === "html5" ? (
              <video
                controls
                autoPlay={false}
                className="video-html5-player"
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
                title={title}
                className="video-iframe"
              />
            )
          ) : (
            <div className="video-error">
              <p>Invalid video URL</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

