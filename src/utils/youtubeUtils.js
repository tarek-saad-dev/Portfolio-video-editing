/**
 * YouTube Utility Functions
 * Safe extraction of YouTube video IDs and thumbnail generation
 */

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL in any format
 * @returns {string|null} - YouTube video ID or null if invalid
 */
export const extractYouTubeId = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  // Remove whitespace
  const cleanUrl = url.trim();

  // YouTube URL patterns
  const patterns = [
    // Standard: https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    // Short URL: https://youtu.be/VIDEO_ID
    /youtu\.be\/([^&\n?#]+)/,
    // Embed: https://www.youtube.com/embed/VIDEO_ID
    /youtube\.com\/embed\/([^&\n?#]+)/,
    // Mobile: https://m.youtube.com/watch?v=VIDEO_ID
    /m\.youtube\.com\/watch\?v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If URL is just the ID itself (11 characters, alphanumeric)
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
};

/**
 * Generates YouTube thumbnail URL from video ID
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality: 'default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'
 * @returns {string|null} - Thumbnail URL or null if invalid
 */
export const getYouTubeThumbnail = (videoId, quality = 'maxresdefault') => {
  if (!videoId || typeof videoId !== 'string') {
    return null;
  }

  const validQualities = ['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'];
  const selectedQuality = validQualities.includes(quality) ? quality : 'maxresdefault';

  return `https://img.youtube.com/vi/${videoId}/${selectedQuality}.jpg`;
};

/**
 * Generates YouTube embed URL from video ID
 * @param {string} videoId - YouTube video ID
 * @param {object} options - Embed options (autoplay, controls, etc.)
 * @returns {string|null} - Embed URL or null if invalid
 */
export const getYouTubeEmbedUrl = (videoId, options = {}) => {
  if (!videoId || typeof videoId !== 'string') {
    return null;
  }

  const {
    autoplay = 0,
    controls = 1,
    modestbranding = 1,
    rel = 0,
    showinfo = 0,
    loop = 0,
    playlist = '',
  } = options;

  const params = new URLSearchParams({
    autoplay: String(autoplay),
    controls: String(controls),
    modestbranding: String(modestbranding),
    rel: String(rel),
    showinfo: String(showinfo),
    loop: String(loop),
  });

  if (loop === 1 && playlist) {
    params.append('playlist', playlist);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

/**
 * Gets thumbnail for a project, using provided thumbnail or generating from YouTube URL
 * @param {object} project - Project object with thumbnail and youtubeUrl
 * @returns {string|null} - Thumbnail URL or null
 */
export const getProjectThumbnail = (project) => {
  if (!project) return null;

  // Use provided thumbnail if available
  if (project.thumbnail && typeof project.thumbnail === 'string' && project.thumbnail.trim()) {
    return project.thumbnail.trim();
  }

  // Generate from YouTube URL if available
  if (project.youtubeUrl) {
    const videoId = extractYouTubeId(project.youtubeUrl);
    if (videoId) {
      return getYouTubeThumbnail(videoId);
    }
  }

  return null;
};

/**
 * Validates if a string is a valid YouTube URL or ID
 * @param {string} input - Input to validate
 * @returns {boolean} - True if valid YouTube URL/ID
 */
export const isValidYouTubeUrl = (input) => {
  if (!input || typeof input !== 'string') {
    return false;
  }

  const videoId = extractYouTubeId(input);
  return videoId !== null;
};

