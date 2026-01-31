import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaVideo, FaAward, FaUserFriends, FaClock } from "react-icons/fa";

function VideoStats() {
  useEffect(() => {
    AOS.init({
      duration: 3000, // Animation duration
    });
  }, []);

  const stats = [
    {
      icon: <FaVideo />,
      count: "100+",
      title: "Videos Edited",
      color: "#ff5e5e",
    },
    {
      icon: <FaUserFriends />,
      count: "10+",
      title: "Happy Clients",
      color: "#4e9eff",
    },
    {
      icon: <FaAward />,
      count: "12",
      title: "Awards Won",
      color: "#ffca3a",
    },
    {
      icon: <FaClock />,
      count: "1000+",
      title: "Hours of Editing",
      color: "#8ac926",
    },
  ];

  return (
    <Row
      style={{ justifyContent: "center", paddingBottom: "50px", color: "#fff" }}
      data-aos="fade-up"
      data-aos-duration="3000"
    >
      <h1
        className="project-heading"
        style={{ color: "#c889e6", textAlign: "center", marginBottom: "30px" }}
      >
        <strong className="purple">Video Editing</strong> Achievements
      </h1>

      <Row className="justify-content-center">
        {stats.map((stat, index) => (
          <Col xs={12} md={6} lg={3} key={index} className="mb-4">
            <Card
              className="stats-card"
              style={{
                background: "rgba(25, 25, 36, 0.7)",
                borderRadius: "10px",
                border: `1px solid ${stat.color}`,
                boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5)`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                height: "100%",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.7)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.5)`;
              }}
            >
              <Card.Body className="text-center py-4">
                <div
                  style={{
                    fontSize: "2.5rem",
                    color: stat.color,
                    marginBottom: "15px",
                  }}
                >
                  {stat.icon}
                </div>
                <h2
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: stat.color,
                  }}
                >
                  {stat.count}
                </h2>
                <Card.Text style={{ fontSize: "1.2rem", color: "#ffffff" }}>
                  {stat.title}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Row>
  );
}

export default VideoStats;
