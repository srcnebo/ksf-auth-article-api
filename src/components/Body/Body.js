import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Box from '../Box/Box';
import './Body.css';

function Body({ body }) {
  return (
    <div className='article-body'>
      {body.map((item, index) => (
        <div
          key={`body-paragraphs-${index}`}
          className='article-body-paragraph'>
          {Object.keys(item)[0] === 'headline' ? (
            <div
              dangerouslySetInnerHTML={{ __html: item.headline }}
              className='subheadline1'
            />
          ) : Object.keys(item)[0] === 'html' ? (
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
          ) : Object.keys(item)[0] === 'image' ? (
            <Image
              url={item.image.url}
              caption={item.image.caption}
              byline={item.image.byline}
              type='body'
            />
          ) : (
            <Box
              content={item.box.content}
              title={item.box.title}
              headline={item.box.headline}
            />
          )}
        </div>
      ))}
    </div>
  );
}

Body.propTypes = {};

export default Body;
