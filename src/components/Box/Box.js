import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Box.css';

// Fontawesome is so awesome it broke my code
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Box(props) {
  const [isOpen, setIsOpen] = useState(false);

  const { content, title, headline } = props;
  return (
    <div className='box-container'>
      <div className='box-header'>
        <div dangerouslySetInnerHTML={{ __html: `<h5>${headline}</h5>` }} />
        <div dangerouslySetInnerHTML={{ __html: `<h3>${title}</h3>` }} />
      </div>
      <div className='box-body-container'>
        {content.map((paragraph) => (
          <div dangerouslySetInnerHTML={{ __html: `<p>${paragraph}</p>` }} />
        ))}
      </div>
      <div>
        <p>Vik ut</p>
        <FontAwesomeIcon icon={faHome} />
      </div>
    </div>
  );
}

Box.propTypes = {};

export default Box;
