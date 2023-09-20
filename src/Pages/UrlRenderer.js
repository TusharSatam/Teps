import React from 'react'

function UrlRenderer({ url }) {
    // Check if the URL starts with 'http' or 'www.' and add the necessary protocol
    const formattedUrl = url.startsWith('http') || url.startsWith('www.')
      ? url
      : `http://${url}`;
  
    return (
      <a href={formattedUrl} target="_blank" rel="noopener noreferrer">
        {formattedUrl}
      </a>
    );
  }
export default UrlRenderer