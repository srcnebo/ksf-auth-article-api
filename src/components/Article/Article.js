import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image/Image';
import Login from '../Login/Login';
import Body from '../Body/Body';
import Metadata from '../Metadata/Metadata';
import './Article.css';

const articleTest = {
  premium: 'dede0629-79d6-456e-ab0a-dfbf9e836763',
  free: 'a6282b95-e620-4040-87d1-731fed85a7d6',
};

const getToken = function () {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
};

function Article() {
  const [data, setData] = useState(null);
  const [currentArticleId, setCurrentArticleId] = useState(articleTest.free);

  const getData = (articleId, token = getToken()) => {
    axios
      .get(`https://lettera.api.ksfmedia.fi/v3/article/${articleId}`, {
        headers: token
          ? {
              'Content-Type': 'application/json',
              AuthUser: `${token?.uuid}`,
              Authorization: `OAuth ${token?.token}`,
            }
          : {},
      })
      .then((res) => {
        const data = res.data;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        setData(err.response.data.not_entitled.articlePreview);
        console.log('Preview', err.response.data.not_entitled.articlePreview);
      });
  };

  useEffect(() => {
    getData(currentArticleId);
  }, [currentArticleId]);

  return (
    <>
      <div className='testing-preheader'>
        <button
          className='ksf-button test-button'
          onClick={() => setCurrentArticleId(articleTest.premium)}>
          Load Premium Article
        </button>
        <button
          className='ksf-button test-button'
          onClick={() => setCurrentArticleId(articleTest.free)}>
          Load Free Article
        </button>
      </div>
      {data && (
        <div className='article-container'>
          <div>
            <header className='text-padding'>
              <ul className='article-tag-list'>
                <li>
                  <a
                    href='https://www.hbl.fi/tagg/presidentvalet-i-usa-2020/'
                    target='_blank'
                    rel='noreferrer'>
                    {data.tags[0]}
                  </a>
                </li>
              </ul>
              <div
                dangerouslySetInnerHTML={{ __html: data.title }}
                className='article-title'
              />
            </header>
            <Image
              url={data.mainImage.url}
              byline={data.mainImage.byline}
              caption={data.mainImage.caption}
              type='main'
            />
            <Metadata
              authors={data.authors}
              publishingTime={data.publishingTime}
              updateTime={data.updateTime}
            />
            <div
              dangerouslySetInnerHTML={{ __html: data.preamble }}
              className='article-preamble'
            />
          </div>
          <Body body={data.body} />
          {data.premium && !getToken() && (
            <Login getData={getData} currentArticleId={currentArticleId} />
          )}
        </div>
      )}
    </>
  );
}

Article.propTypes = {
  // children: PropTypes.element.isRequired
};

export default Article;
