import apiConnector from 'helpers/apiConnector';
const querystring = require('querystring');

export const getModelInfo = (params) => {
  let {
    modelId,
    languageId,
  } = params;

  const path = `/model/${modelId}`;

  const query = querystring.stringify({
    lid: languageId,
  });

  return apiConnector({path, query});
};
