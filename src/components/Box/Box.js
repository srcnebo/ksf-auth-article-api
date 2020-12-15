import React from 'react';
import PropTypes from 'prop-types';
import './Box.css';

function Box(props) {
  const { content, title, headline } = props;
  return (
    <div className='box-container'>
      <div dangerouslySetInnerHTML={{ __html: headline }} />
      <div dangerouslySetInnerHTML={{ __html: title }} />
      {content.map((item) => (
        <div dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </div>
  );
}

Box.propTypes = {};

export default Box;
