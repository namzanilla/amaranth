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

export const appLoadingInc = () => (dispatch) => {
  try {
    dispatch({
      type: at.APP_LOADING_INC,
    }); 
  } catch (e) {
    console.error(e);
  }
}

export const appLoadingDecr = () => (dispatch, getState) => {
  try {
    const state = getState();
    const loading = state.app.loading;
    
    if (loading > 0) {
      dispatch({
        type: at.APP_LOADING_DECR,
      }); 
    } else {
      console.log('WARNING');
      console.log({
        action: at.APP_LOADING_DECR,
        loading,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

export const setSSR = (bool) => (dispatch) =>  {
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
export const appSetCatalogState = (catalog) => (dispatch, getState) => {
  try {
    const state = getState();

    if (state.app.catalog.isVisible !== catalog.isVisible) {
      dispatch({
        type: at.APP_SET_CATALOG_STATE,
        catalog,
      });
    }
  } catch (e) {
    console.error(e);
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
    console.error(e);
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
