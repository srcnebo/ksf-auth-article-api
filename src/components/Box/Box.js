import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Box.css';
function Box(props) {
  const [isOpen, setIsOpen] = useState(false);

  const { content, title, headline } = props;

  const openCollapser = () => setIsOpen(true);

  const boxToggleClasses = !isOpen
    ? 'box-container collapsed-box'
    : 'box-container';

  const collapserContainerClasses = !isOpen
    ? 'ksf-collapser-container'
    : 'ksf-collapser-container hide-collapser';

  return (
    <div className={boxToggleClasses}>
      <div className='box-header'>
        <div dangerouslySetInnerHTML={{ __html: `<h5>${headline}</h5>` }} />
        <div dangerouslySetInnerHTML={{ __html: `<h3>${title}</h3>` }} />
      </div>
      <div className='box-body-container'>
        {content.map((paragraph) => (
          <div dangerouslySetInnerHTML={{ __html: `<p>${paragraph}</p>` }} />
        ))}
      </div>
      <div className={collapserContainerClasses}>
        <span onClick={openCollapser} className='ksf-collapser'>
          <span className='show-text'>Vik ut</span>
          <span className='show-arrow'>&gt;</span>
        </span>
      </div>
    </div>
  );
}

Box.propTypes = {};

export default Box;
