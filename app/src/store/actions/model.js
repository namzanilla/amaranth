import * as at from 'store/actionTypes';
import * as modelApi from 'api/model';

export const fetchModelById = (modelId, languageId) => async (dispatch, getState) => {
  try {
    if (!languageId) {
      const {app} = getState();
      languageId = app.languageId;
    }

    dispatch({type: at.MODEL_FETCH_BY_ID_REQUEST});

    const params = {
      modelId,
      languageId,
    };
    const {data: payload} = await modelApi.getModelInfo(params);

    dispatch({type: at.MODEL_FETCH_BY_ID_SUCCESS, payload});

    return payload;
  } catch (e) {
    console.error(e);

    dispatch({type: at.MODEL_FETCH_BY_ID_FAILURE});
  }
}

export function setModelId(modelId) {
  return function(dispatch) {
    dispatch({
      type: at.MODEL_SET_ID,
      id: modelId,
    });
  }
}

export function setModelInitialState() {
  return function(dispatch) {
    dispatch({
      type: at.MODEL_SET_INITIAL_STATE,
    });
  }
}

export const setModelIdByPathname = (pathname) => async (dispatch) => {
  try {
    pathname = pathname.split('/');
    pathname.shift();

    if ('ru' === pathname[0] || '' === pathname[0]) {
      pathname.shift();
    }

    const modelId = parseInt(pathname[0].substring(1));

    dispatch(setModelId(modelId));

    return modelId;
  } catch (e) {
    console.log(e);
  }
}
