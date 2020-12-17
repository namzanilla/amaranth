import apiConnector from 'helpers/apiConnector';
const querystring = require('querystring');
import {AGG_TYPE_3_PIPE_7} from 'const/model';

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

export const get_AGG_TYPE_3_PIPE_7_SECOND = (params) => {
  let {
    modelId,
    paramFirst,
    languageId,
  } = params;

  const path = `/model/${modelId}/agg/${AGG_TYPE_3_PIPE_7}/${paramFirst}`;

  const query = querystring.stringify({
    lid: languageId,
  });

  return apiConnector({path, query});
};
