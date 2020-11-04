import apiConnector from 'helpers/apiConnector';
const querystring = require('querystring');

export const getProducts = (params) => {
  const path = '/products';

  let {
    page,
    categoryId: cid,
    languageId: lid = 1,
  } = params;
  const offset = (page - 1) * 12;
  const query = querystring.stringify({
    cid,
    o: offset,
    lid,
  });

  return apiConnector({path, query});
};
