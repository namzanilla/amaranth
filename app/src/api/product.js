import apiConnector from 'helpers/apiConnector';
const querystring = require('querystring');

export const getProduct = (params) => {
  let {
    productId,
    languageId = 1,
  } = params;

  const path = `/product/${productId}`;

  const query = querystring.stringify({
    lid: languageId,
  });

  return apiConnector({path, query});
};
