/**
 * Example Video Projects Data Structure
 * 
 * Add this data to your backend API or use it as a reference
 * for the expected project structure with video support.
 * 
 * Place this in: src/data/videoProjectsExample.js
 * Or integrate into your backend API response
 */

export const videoProjectsExample = [
  {
    id: 1,
    title: "Commercial Video Edit",
    type: "Commercial",
    category: "Commercial", // Alternative to 'type'
    description: "A professional commercial video edit showcasing product features",
    imgPath: "/Assets/Projects/commercial-thumb.jpg", // 16:9 thumbnail
    videoUrl: "https://vimeo.com/123456789", // Vimeo URL
    videoType: "vimeo", // Options: "vimeo", "youtube", "html5"
    ghLink: "https://github.com/yourusername/project",
    demoLink: "https://yourproject.com",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Music Video Production",
    type: "Music Video",
    category: "Music Video",
    description: "Creative music video with dynamic editing and effects",
    imgPath: "/Assets/Projects/music-thumb.jpg",
    videoUrl: "https://vimeo.com/987654321",
    videoType: "vimeo",
    ghLink: "",
    demoLink: "",
    date: "2024-02-20",
  },
  {
    id: 3,
    title: "Corporate Documentary",
    type: "Documentary",
    category: "Documentary",
    description: "Short documentary film for corporate client",
    imgPath: "/Assets/Projects/doc-thumb.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example123", // YouTube example
    videoType: "youtube",
    ghLink: "",
    demoLink: "",
    date: "2024-03-10",
  },
  {
    id: 4,
    title: "Wedding Highlight Reel",
    type: "Wedding",
    category: "Wedding",
    description: "Beautiful wedding highlight video with cinematic shots",
    imgPath: "/Assets/Projects/wedding-thumb.jpg",
    videoUrl: "https://vimeo.com/456789123",
    videoType: "vimeo",
    ghLink: "",
    demoLink: "",
    date: "2024-04-05",
  },
  {
    id: 5,
    title: "Short Film Edit",
    type: "Short Film",
    category: "Short Film",
    description: "Independent short film with narrative storytelling",
    imgPath: "/Assets/Projects/film-thumb.jpg",
    // HTML5 video example (direct video file URL)
    videoUrl: "https://example.com/videos/short-film.mp4",
    videoType: "html5",
    ghLink: "",
    demoLink: "",
    date: "2024-05-12",
  },
];

/**
 * Data Structure Explanation:
 * 
 * REQUIRED FIELDS:
 * - id: Unique identifier
 * - title: Project title
 * - imgPath: Thumbnail image path (16:9 aspect ratio recommended)
 * 
 * VIDEO FIELDS (for video projects):
 * - videoUrl: Full URL to video (Vimeo, YouTube, or direct video file)
 * - videoType: "vimeo" | "youtube" | "html5"
 * 
 * OPTIONAL FIELDS:
 * - type: Category/type label (e.g., "Commercial", "Music Video")
 * - category: Alternative to 'type'
 * - description: Project description
 * - ghLink: GitHub repository link
 * - demoLink: Live demo link
 * - date: Completion date
 * 
 * HOW IT WORKS:
 * - If project has 'videoUrl', VideoProjectCard is rendered
 * - If project has no 'videoUrl', regular ProjectCard is rendered
 * - Clicking thumbnail or "Watch Video" opens VideoModal
 */

