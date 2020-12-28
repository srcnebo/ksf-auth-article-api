import axios from 'axios';

export const getToken = () => {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
};

export const fetchArticleData = (articleId, token = getToken()) => {
  return axios
    .get(`https://lettera.api.ksfmedia.fi/v3/article/${articleId}`, {
      headers: token
        ? {
            'Content-Type': 'application/json',
            AuthUser: `${token?.uuid}`,
            Authorization: `OAuth ${token?.token}`,
          }
        : {},
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return err.response.data.not_entitled.articlePreview;
    });
};

export const loginUser = (username, password) => {
  return axios
    .post(
      'https://persona.api.ksfmedia.fi/v1/login',
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};
