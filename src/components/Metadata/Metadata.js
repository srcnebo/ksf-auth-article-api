import React from 'react';
import PropTypes from 'prop-types';

const cleanDate = function (updateTime, publishingTime) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const date1 = new Date(publishingTime)
    .toLocaleDateString('fi-FI', options)
    .replace('klo', '');
  const date2 = new Date(updateTime)
    .toLocaleDateString('fi-FI', options)
    .replace('klo', '');
  return `${date1} UPPDATERAD ${date2}`;
};

function Metadata(props) {
  const { authors, publishingTime, updateTime } = props;
  return (
    <div className='meta-info-container'>
      {authors.map((author, index) => (
        <p key={`Meta-authors-${index}`} className='meta-info-author'>
          {author.byline}
        </p>
      ))}
      <p className='meta-info-date'>{cleanDate(publishingTime, updateTime)}</p>
    </div>
  );
}

Metadata.propTypes = {
  authors: PropTypes.array,
  publishingTime: PropTypes.string,
  updateTime: PropTypes.string,
};

export default Metadata;
