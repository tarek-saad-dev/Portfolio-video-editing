import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "start" }}>
            Hi Everyone, I’m <span className="purple">Tarek Saad</span>
            <span style={{ padding: "0 6px" }}>from</span>
            <span className="purple">Alexandria, Egypt.</span>
            <br /> <hr />
            I’m a passionate <span className="purple">Video Editor</span> and <span className="purple">Visual Storyteller</span>
            with over <b>5 years of experience</b> turning raw footage into visual art.
            <br />
            <br />
            From editing educational videos and promos to crafting <b>2D/3D animation</b> and cinematic storytelling,
            I bring ideas to life through motion, rhythm, and emotion.
            <br />
            <br />
            I’ve worked with educators, content creators, and even created a full 3D ad for <b className="purple">Banque du Caire</b>, managing everything from scripting, scene design, voiceovers, to 3D modeling and animation using <b>Blender</b>.
          </p>

          <ul style={{ lineHeight: "2.5rem" }}>
            <li className="about-activity">
              <ImPointRight /> Editing videos using Premiere Pro & After Effects
            </li>
            <li className="about-activity">
              <ImPointRight /> Creating motion graphics & 2D animation
            </li>
            <li className="about-activity">
              <ImPointRight /> 3D modeling & animation with Blender
            </li>
            <li className="about-activity">
              <ImPointRight /> Using AI tools to enhance post-production
            </li>
            <li className="about-activity">
              <ImPointRight /> Storyboarding and scene planning
            </li>
            <li className="about-activity">
              <ImPointRight /> Collaborating with teams & freelancing
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)", marginTop: "1.5rem" }}>
            "Editing is not just cutting clips — it’s about feeling the story, shaping emotions, and leaving impact."
          </p>
          <footer className="blockquote-footer">Tarek Saad</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
