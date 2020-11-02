import apiConnector from 'helpers/apiConnector';
const querystring = require('querystring');
const path = '/category';

export const getCategoryList = (params) => {
  const {
    group = 1,
    status = 1,
    view = 1,
    languageId: language_id = 1,
  } = params;

  const query = querystring.stringify({
    group,
    status,
    view,
    language_id,
  });

  return apiConnector({path, query});
};
