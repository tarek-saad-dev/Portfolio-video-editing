# Video Integration Guide

## Overview

This guide explains how to integrate video functionality into your portfolio. The implementation supports Vimeo, YouTube, and HTML5 video playback through a clean modal interface.

## Components Created

### 1. `VideoModal.jsx`
- Modal component for video playback
- Supports Vimeo, YouTube, and HTML5 video
- Closes on Escape key, click outside, or close button
- Prevents background scrolling when open

### 2. `VideoProjectCard.jsx`
- Card component specifically for video projects
- Shows 16:9 thumbnail with play icon overlay
- Displays project title, type/category, and "Watch Video" button
- Compatible with existing grid layout

### 3. Updated `Projects.jsx`
- Automatically detects projects with `videoUrl`
- Renders `VideoProjectCard` for video projects
- Renders regular `ProjectCard` for non-video projects
- Manages video modal state

## Data Structure

### For Video Projects

Add these fields to your project objects:

```javascript
{
  id: 1,
  title: "Project Title",
  type: "Commercial", // or category
  imgPath: "/path/to/thumbnail.jpg", // 16:9 aspect ratio
  videoUrl: "https://vimeo.com/123456789", // REQUIRED for video
  videoType: "vimeo", // "vimeo" | "youtube" | "html5"
  // ... other fields
}
```

### Video URL Formats

**Vimeo:**
```javascript
videoUrl: "https://vimeo.com/123456789"
videoUrl: "https://player.vimeo.com/video/123456789"
videoType: "vimeo"
```

**YouTube:**
```javascript
videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID"
videoUrl: "https://youtu.be/VIDEO_ID"
videoType: "youtube"
```

**HTML5 (Direct Video File):**
```javascript
videoUrl: "https://example.com/videos/video.mp4"
videoType: "html5"
```

## Where to Add Video Data

### Option 1: Backend API (Recommended)

Update your backend API to include `videoUrl` and `videoType` fields:

```javascript
// Backend response example
{
  id: 1,
  title: "Commercial Video",
  imgPath: "/Assets/Projects/commercial.jpg",
  videoUrl: "https://vimeo.com/123456789",
  videoType: "vimeo",
  type: "Commercial",
  // ... other fields
}
```

The frontend will automatically detect projects with `videoUrl` and render the video card.

### Option 2: Static Data (For Testing)

Create a file `src/data/videoProjects.js`:

```javascript
export const videoProjects = [
  {
    id: 1,
    title: "My Video Project",
    type: "Commercial",
    imgPath: "/Assets/Projects/video-thumb.jpg",
    videoUrl: "https://vimeo.com/123456789",
    videoType: "vimeo",
  },
  // ... more projects
];
```

Then merge with API data in `Projects.jsx`:

```javascript
import { videoProjects } from "../data/videoProjects";

// In your fetchProjects function:
const mergedProjects = [...data, ...videoProjects];
setProjects(mergedProjects);
```

## Thumbnail Requirements

- **Aspect Ratio:** 16:9 (recommended)
- **Format:** JPG, PNG, or WebP
- **Size:** Optimize for web (500-800px width)
- **Location:** Place in `public/Assets/Projects/` or your assets folder

## Styling

All styles are in:
- `VideoModal.css` - Modal styling
- `VideoProjectCard.css` - Card styling

Both are compatible with your existing dark theme using:
- Purple accent color: `#c889e6`
- Dark backgrounds matching your theme
- Smooth transitions and hover effects

## Usage Example

1. **Add video data to your backend** or static data file
2. **Ensure thumbnails are 16:9** aspect ratio
3. **Set `videoUrl` and `videoType`** for video projects
4. **Projects without `videoUrl`** will render as regular cards

## Extending Later

The structure is designed to be easily extended:

### Add Hover Preview
```javascript
// In VideoProjectCard.jsx
const [isHovering, setIsHovering] = useState(false);

// Show preview on hover
{isHovering && <VideoPreview videoUrl={videoUrl} />}
```

### Add Filters
```javascript
// In Projects.jsx
const [filter, setFilter] = useState("all");

const filteredProjects = projects.filter(project => 
  filter === "all" || project.type === filter
);
```

### Netflix-Style Rows
```javascript
// Group by type
const groupedProjects = projects.reduce((acc, project) => {
  const type = project.type || "Other";
  if (!acc[type]) acc[type] = [];
  acc[type].push(project);
  return acc;
}, {});
```

## Testing

1. Add a test project with `videoUrl`
2. Verify thumbnail displays correctly
3. Click thumbnail or button to open modal
4. Test video playback
5. Test closing modal (X button, Escape key, click outside)

## Troubleshooting

**Video not playing:**
- Check `videoUrl` format matches `videoType`
- Verify Vimeo/YouTube URLs are public
- For HTML5, ensure CORS is enabled on video server

**Thumbnail not showing:**
- Check `imgPath` is correct
- Verify image exists in public folder
- Ensure aspect ratio is 16:9

**Modal not opening:**
- Check browser console for errors
- Verify `videoUrl` is not empty
- Ensure `onPlayClick` handler is passed to `VideoProjectCard`

