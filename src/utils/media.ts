/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Extracts Vimeo video ID from a Vimeo URL
 */
export function extractVimeoId(url: string): string | null {
  const regExp = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
  const match = url.match(regExp);

  return match ? match[1] : null;
}

/**
 * Normalizes a media URL and generates a thumbnail based on source type.
 */
export function normalizeMedia(url: string, sourceType: 'Image' | 'YouTube' | 'Vimeo'): {
  original_url: string;
  thumbnail_url: string | null;
} {
  try {
    const parsedUrl = new URL(url);

    if (sourceType === 'YouTube') {
      const videoId = extractYouTubeId(url);
      if (videoId) {
        return {
          original_url: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail_url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        };
      }
    } else if (sourceType === 'Vimeo') {
      const videoId = extractVimeoId(url);
      if (videoId) {
        // Vimeo thumbnail requires an API call theoretically, but we might just store the ID or standard format.
        // For simplicity, we just store the normalized VIMEO player URL. 
        return {
          original_url: `https://vimeo.com/${videoId}`,
          thumbnail_url: null // Can be fetched asynchronously later if needed
        };
      }
    } else if (sourceType === 'Image') {
      return {
        original_url: url,
        thumbnail_url: url
      };
    }

    // Fallback
    return {
      original_url: url,
      thumbnail_url: null
    };
  } catch (error) {
    // Invalid URL
    throw new Error('Invalid URL provided');
  }
}
