import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
    return (
        <Typewriter 
            options={{
                strings: [
                    "Creative Video Editor",
                    "Motion Graphics Artist",
                    "2D & 3D Animator",
                    "AI-Powered Video Creator",
                    "Visual Storyteller",
                    "YouTube Content Editor",
                    "Freelance Promo Maker",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
            }} 
        />
    );
}

export default Type;
