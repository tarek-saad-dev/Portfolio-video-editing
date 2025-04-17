import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CertificateCard from "./CertificateCard";
import Particle from "../Particle";
import AOS from "aos";
import "aos/dist/aos.css";


// Import your certificate and organization logo images here
// import ai from "../../Assets/cirtificate/Ai.png";

// company logo
// import cib from "../../Assets/company/cib.png"



// Add more certificates as needed

function Certificates() {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration
      once: true, // Animation should happen only once
      easing: "ease-in-out", // Easing function for the animation
    });
  }, []);


  const certificates = []



  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Certificates </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few certificates I've achieved recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {certificates.map((certificate, index) => (
            <Col
              md={4}
              className="project-card"
              data-aos="fade-up"
              data-aos-delay={100}
              key={index}
            >
              <CertificateCard
                imgPath={certificate.imgPath}
                orgLogos={certificate.orgLogos}
                title={certificate.title}
                description={certificate.description}
                liveLink={certificate.liveLink}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Certificates;
