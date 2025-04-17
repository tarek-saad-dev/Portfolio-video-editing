import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
    return ( <
        Typewriter options = {
            {
                strings: [
                    "Software Engineer",
                    "MERN Stack Devloper",
                    "Freelancer",
                    "Software Architect",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
            }
        }
        />
    );
}

export default Type;