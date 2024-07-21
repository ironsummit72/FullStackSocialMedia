
import { Link } from 'react-router-dom';

/**
 * Function to linkify hashtags and mentions
 * @param {string} text - The text to process
 * @returns {Array} - An array of React components and strings
 */
const linkifyText = (text) => {
  // Regular expressions for hashtags and mentions
  const hashtagRegex = /(#\w+)/g;
  const mentionRegex = /(@\w+)/g;

  // Split the text by both hashtags and mentions
  const parts = text?.split(/(#\w+|@\w+)/g);

  return parts?.map((part, index) => {
    // Linkify hashtags
    if (hashtagRegex.test(part)) {
      const hashtag = part.slice(1);
      return (
        <Link key={index} className='text-blue-500' to={`/hashtag/${hashtag}`}>
          {part}
        </Link>
      );
    }
    // Linkify mentions
    if (mentionRegex.test(part)) {
      const mention = part.slice(1);
      return (
        <Link key={index} className='text-blue-500' to={`/${mention}`}>
          {part}
        </Link>
      );
    }
    // Return plain text
    return part;
  });
};

export default linkifyText;
