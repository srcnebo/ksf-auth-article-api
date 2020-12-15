import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image/Image';
import Box from '../Box/Box';
import Login from '../Login/Login';
import './Article.css';

function cleanDate(updateTime, publishingTime) {
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
}

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function Article(props) {
  // const [article, setArticle] = useState(null);
  // Paid dede0629-79d6-456e-ab0a-dfbf9e836763
  // a6282b95-e620-4040-87d1-731fed85a7d6
  const [data, setData] = useState(null);
  const [isPremium, setIsPremium] = useState(true);

  const token = getToken();
  let authheader = token
    ? {
        'Content-Type': 'application/json',
        AuthUser: `${token?.uuid}`,
        Authorization: `OAuth ${token?.token}`,
      }
    : {};

  useEffect(() => {
    axios
      .get(
        `https://lettera.api.ksfmedia.fi/v3/article/dede0629-79d6-456e-ab0a-dfbf9e836763`,
        {
          headers: authheader,
        }
      )
      .then((res) => {
        const data = res.data;
        setData(data);
        setIsPremium(data.premium);
        console.log('FullArticle', data);
      })
      .catch((err) => {
        console.log(err);
        setData(err.response.data.not_entitled.articlePreview);
        console.log('Preview', err.response.data.not_entitled.articlePreview);
      });
  }, []);

  return (
    data && (
      <div className='article-container'>
        <div>
          <header>
            <ul>
              {data.tags.map((tag) => (
                <li>{tag}</li>
              ))}
            </ul>
            <div
              dangerouslySetInnerHTML={{ __html: data.title }}
              className=''
            />
          </header>
          <Image
            url={data.mainImage.url}
            byline={data.mainImage.byline}
            caption={data.mainImage.caption}
          />
          {/* Todo: Meta could be refactored into separate component */}
          <div className='meta-info'>
            {data.authors.map((author) => (
              <p className='meta-info-author'>{author.byline}</p>
            ))}
            <p className='meta-info-date'>
              {cleanDate(data.publishingTime, data.updateTime)}
            </p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: data.preamble }}
            className='article-preamble'
          />
        </div>
        <div className='article-body'>
          {data.body.map((item) => (
            <div>
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
        {isPremium && !token && <Login />}
      </div>
    )
  );
}

Article.propTypes = {};

export default Article;
