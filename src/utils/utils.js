import React from 'react';
import ReactDOMServer from 'react-dom/server';

export function replaceNewlinesWithLineBreaks(text) {
    if (text) {
      // Replace newlines with line breaks
      let newText = text.replace(/(\r\n|\n)/g, '<br>');
  
      // Wrap links (http, https, www, and email addresses) in <a> tags
      newText = newText.replace(
        /(\bhttps?:\/\/[^\s<]+|\bwww\.[^\s<]+|\b[\w\.-]+@[\w\.-]+\.\w+\b)/g,
        match => {
          if (match.startsWith('http://') || match.startsWith('https://')) {
            return `<a href="${match}" target="_blank">${match}</a>`;
          } else if (match.startsWith('www.')) {
            return `<a href="http://${match}" target="_blank">${match}</a>`;
          } else if (match.includes('@')) {
            return `<a href="mailto:${match}">${match}</a>`;
          }
          return match; // Return the matched text as is
        }
      );
  
      return newText;
    }
    return '';
  }
  export function formatExpiryDate(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }
  
  export const generateHTML = (content) => {
    const paragraphs = content.split('\n\n');
    const htmlContent = paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  
    const joinedHtmlContent = ReactDOMServer.renderToString(
      <React.Fragment>
        {htmlContent}
      </React.Fragment>
    );
  
    return <div dangerouslySetInnerHTML={{ __html: joinedHtmlContent.replace(
      /(\bhttps?:\/\/[^\s<]+|\bwww\.[^\s<]+|\b[\w\.-]+@[\w\.-]+\.\w+\b)/g,
      match => {
        if (match.startsWith('http://') || match.startsWith('https://')) {
          return `<a href="${match}" target="_blank">${match}</a>`;
        } else if (match.startsWith('www.')) {
          return `<a href="http://${match}" target="_blank">${match}</a>`;
        } else if (match.includes('@')) {
          return `<a href="mailto:${match}">${match}</a>`;
        }
        return match; // Return the matched text as is
      }
    )}} />;
  };
  