import apiConnector from 'helpers/apiConnector';
const querystring = require('querystring');

export const getCategoryList = (params) => {
  const path = '/category';

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

export const getInfoById = (params) => {
  const {
    id,
    languageId,
  } = params;
  const path = `/category/${id}/info`;

  const query = `language_id=${languageId}`

  return apiConnector({path, query});
};
