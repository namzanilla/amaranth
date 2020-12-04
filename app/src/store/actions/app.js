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

// @todo appSetCatalogVisibility
export const appSetCatalogState = (state) => (dispatch, getState) => {
  try {
    const {
      app: {
        catalog: {
          isVisible,
        } = {},
      } = {},
    } = getState();

    if (isVisible !== state.isVisible) {
      dispatch({
        type: at.APP_SET_CATALOG_STATE,
        state,
      });
    }
  } catch (e) {
    console.log(e);
  }
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

export const appSetHtmlLangAttrValue = (languageId) => (dispatch, getState) => {
  try {
    const state = getState();
    languageId = languageId ? languageId : state.app.languageId;
    const htmlLangAttrValue = state.app.languageId === 1 ? 'uk-UA' : 'ru-UA';

    if (state.app.htmlLangAttrValue !== htmlLangAttrValue) {
      dispatch({
        type: at.APP_SET_HTML_LANG_ATTR_VALUE,
        htmlLangAttrValue,
      });
    }
  } catch (e) {
    console.log(e);
  }
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
