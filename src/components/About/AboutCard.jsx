import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "start" }}>
            Hi Everyone, I am <span className="purple">Tarek Saad</span>
            <span style={{ padding: "0 6px" }} s>
              from
            </span>{" "}
            <span className="purple"> Alexandria, Egypt.</span>
            <br /> <hr />
            I am currently a Full Stack Developer || software developer.
            <br />
            I study in Computer Science and Artificial Intelligence
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul style={{ lineHeight: "3rem" }}>
            <li className="about-activity">
              <ImPointRight /> Learning new tools and technologies
            </li>
            <li className="about-activity">
              <ImPointRight /> Passionate about Automation and AI
            </li>
            <li className="about-activity">
              <ImPointRight /> Explaining concepts in a fun way
            </li>
            <li className="about-activity">
              <ImPointRight /> Leading teams and designing full systems
            </li>
            <li className="about-activity">
              <ImPointRight /> Researching better ways to build LMS
            </li>
            <li className="about-activity">
              <ImPointRight /> Creating quality content and design
            </li>
            <li className="about-activity">
              <ImPointRight /> Playing games, football, and traveling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Creativity is the art of collecting knowledge from different fields and weaving it into a single, powerful idea."{" "}
          </p>
          <footer className="blockquote-footer">Tarek Saad</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
