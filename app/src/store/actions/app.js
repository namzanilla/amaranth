import * as at from 'store/actionTypes';
import {getAlternate} from 'helpers/language';

export const setLanguageId = (languageId) => (dispatch, getState) => {
  const {app = {}} = getState();

  if (app.languageId !== languageId) {
    dispatch({
      type: at.APP_SET_LANGUAGE_ID,
      payload: languageId,
    });
  }
};

export const setSSR = (bool) => (dispatch, getState) => {
  dispatch({
    type: at.APP_SET_SSR,
    bool,
  });
};

export const appSetStaticHost = (host) => (dispatch) => {
  dispatch({
    type: at.APP_SET_STATIC_HOST,
    host,
  });
};

export const appSetSessionKey = (sessionKey) => (dispatch) => {
  dispatch({
    type: at.APP_SET_SESSION_KEY,
    sessionKey,
  });
};

export const appSetSessionValue = (sessionValue) => (dispatch) => {
  dispatch({
    type: at.APP_SET_SESSION_VALUE,
    sessionValue,
  });
};

export const setHoc = (hoc) => (dispatch, getState) => {
  const {app = {}} = getState();

  if (app.hoc !== hoc) {
    dispatch({
      type: at.APP_SET_HOC,
      payload: hoc,
    });
  }
};

export const setAlternate = (path, querystring) => (dispatch, getState) => {
  const alternate = getAlternate(path, querystring);
  const {app} = getState();

  if (app.alternateUk !== alternate.uk) {
    dispatch({
      type: at.APP_SET_ALTERNATE,
      payload: alternate,
    });
  }
};
