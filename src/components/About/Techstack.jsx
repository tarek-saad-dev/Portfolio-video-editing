import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiCss3,
  DiHtml5,
  DiNodejs,
  DiPython
} from "react-icons/di";
import {
  SiBootstrap,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiReactrouter,
  SiReacthookform,
  SiOpenai,
  SiNestjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiNeo4J,
  SiMicrosoftsqlserver,
  SiNextdotjs,
  SiRedux 
} from "react-icons/si";
import { FaServer } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

// 🔗 Mapping for icons
const iconMapping = {
  "HTML": <DiHtml5 />,
  "CSS": <DiCss3 />,
  "Bootstrap": <SiBootstrap />,
  "Tailwind": <SiTailwindcss />,
  "JavaScript": <DiJavascript1 />,
  "TypeScript": <SiTypescript />,
  "React": <DiReact />,
  "React Router": <SiReactrouter />,
  "Hooks": <SiReacthookform />,
  "Node.js": <DiNodejs />,
  "Express.js": <SiExpress />,
  "NestJS": <SiNestjs />,
  "Server-Side": <FaServer />,
  "MongoDB": <SiMongodb />,
  "MySQL": <SiMysql />,
  "PostgreSQL": <SiPostgresql />,
  "SQL Server": <SiMicrosoftsqlserver />,
  "Neo4j": <SiNeo4J />,
  "Python": <DiPython />,
  "Open Ai": <SiOpenai />,
  "Next.js": <SiNextdotjs />,
  "Redux": <SiRedux />,
};

function Techstack({ skills, technologies }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const allTechs = [...skills, ...technologies];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {allTechs.map((tech, index) => (
        <Col
          xs={4}
          md={2}
          className="tech-icons"
          data-aos="fade-up"
          data-aos-delay={index * 150}
          key={index}
          style={{ position: "relative", textAlign: "center" }}
        >
          {iconMapping[tech] || null}
          <div className="tech-tooltip">{tech}</div>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
