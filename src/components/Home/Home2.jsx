import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/tttt.png";
import Tilt from "react-parallax-tilt";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillBehanceSquare,
} from "react-icons/ai";
import { FaLinkedinIn, FaYoutube, FaVimeo } from "react-icons/fa";

function Home2() {
  useEffect(() => {
    AOS.init({
      duration: 3000, // Animation duration
    });
  }, []);

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col
            md={8}
            className="home-about-description"
            data-aos="fade-right"
            data-aos-duration="1200"
          ><h1 style={{ fontSize: "2.6em" }}>
          LET ME <span className="purple"> INTRODUCE </span> MYSELF
        </h1>
        <p className="home-about-body">
          I'm <b className="purple">Tarek Saad</b>, a passionate and creative <b className="purple">Video Editor</b> with over 5 years of hands-on experience in visual storytelling, motion graphics, and 3D animation.
          <br />
          <br />
          My journey started back in <b>2019</b>, and since then I've been exploring everything from <i>Adobe Premiere Pro</i>, <i>After Effects</i>, to tools like <i>VideoScribe</i> and <i>Cartoon Animator 4</i>. I’ve also worked with <b className="purple">Blender</b> to produce professional 3D animations and models.
          <br />
          <br />
          I specialize in:
          <i>
            <b className="purple"> Video Editing, Motion Graphics, Whiteboard & 2D/3D Animation</b>
          </i>{" "}
          — turning raw footage into cinematic experiences.
          <br />
          <br />
          My work includes <b className="purple">freelance promos, educational series, YouTube content, and corporate videos</b> including a 3D commercial for Banque du Caire.
          I also love integrating <b className="purple">AI tools</b> to push the boundaries of what I can do visually.
          <br />
          <br />
          Always learning. Always creating. Always telling stories that matter.
        </p>
        
          </Col>
          <Col
            md={4}
            className="myAvtar"
            data-aos="fade-left"
            data-aos-duration="1200"
          >
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col
            md={12}
            className="home-about-social"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://www.behance.net/tareksaad3"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillBehanceSquare />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.facebook.com/tarek.elgokar1/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillFacebook />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/tarek-saad-0964b2247/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/tareksaad_28/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.youtube.com/@Tarek__Saad"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaYoutube />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://vimeo.com/tareksaad"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaVimeo />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
