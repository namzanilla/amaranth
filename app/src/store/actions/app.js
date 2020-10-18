import * as at from 'store/actionTypes';

export const setLanguageId = (languageId) => (dispatch, getState) => {
  const {app = {}} = getState();

  if (app.languageId !== languageId) {
    dispatch({
      type: at.APP_SET_LANGUAGE_ID,
      payload: languageId,
    });
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

export const setAlternate = (alternate) => (dispatch, getState) => {
  const {
    app = {},
  } = getState();

  if (app.alternateUk !== alternate.uk) {
    dispatch({
      type: at.APP_SET_ALTERNATE,
      payload: alternate,
    });
  }
};
