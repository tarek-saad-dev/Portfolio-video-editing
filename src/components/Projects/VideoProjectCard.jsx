import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import "./VideoProjectCard.css";

const VideoProjectCard = ({
  id,
  title,
  type,
  thumbnail,
  videoUrl,
  videoType = "vimeo",
  onPlayClick,
}) => {
  const handleClick = () => {
    if (onPlayClick && videoUrl) {
      onPlayClick({ id, title, videoUrl, videoType });
    }
  };

  return (
    <Card className="video-project-card-view">
      <div className="video-thumbnail-container" onClick={handleClick}>
        <Card.Img
          variant="top"
          src={thumbnail}
          alt={title}
          className="video-thumbnail-img"
        />
        {videoUrl && (
          <div className="video-play-overlay">
            <div className="video-play-icon">
              <FaPlay />
            </div>
          </div>
        )}
      </div>
      <Card.Body>
        <div className="video-card-header">
          <Card.Title className="video-card-title">{title}</Card.Title>
          {type && (
            <span className="video-card-type">{type}</span>
          )}
        </div>
        {videoUrl && (
          <Button
            variant="primary"
            onClick={handleClick}
            className="video-watch-button"
          >
            <FaPlay style={{ marginRight: "8px" }} />
            Watch Video
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default VideoProjectCard;

