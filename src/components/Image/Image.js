import React from 'react';
import PropTypes from 'prop-types';
import './Image.css';

function Image(props) {
  const { caption, url, byline, type } = props;
  const fallbackImage =
    'https://via.placeholder.com/680x400.png?text=Placeholder:+image+is+missing!';

  const captionClasses =
    type === 'main' ? 'image-text-spacing align-main' : 'image-text-spacing';
  return (
    <div className='image-container'>
      <img src={url ? url : fallbackImage} alt='Logo' className='image' />
      <div className={captionClasses} style={{}}>
        <div
          dangerouslySetInnerHTML={{ __html: `<p> ${caption} </p>` }}
          className='image-caption'
        />
        <div
          dangerouslySetInnerHTML={{ __html: ` bild: ${byline}` }}
          className='image-byline'
        />
      </div>
    </div>
  );
}

Image.propTypes = {
  caption: PropTypes.string,
  url: PropTypes.string,
  byline: PropTypes.string,
  type: PropTypes.string,
};

export default Image;
