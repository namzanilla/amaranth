import * as at from 'store/actionTypes';

const initialState = {
  loading: 0,
  catalog: {
    isVisible: false,
    scrollY: 0,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.APP_LOADING_DECR: {
      let {loading = 0} = state;

      if (loading > 0) {
        loading--;
      }

      return {
        ...state,
        loading,
      };
    } case at.APP_SET_SSR: {
      let {bool} = action;

      return {
        ...state,
        ssr: bool,
      };
    } case at.APP_SET_CATALOG_STATE: {
      const {catalog} = state;
      const {state: catalogState = {}} = action;

      return {
        ...state,
        catalog: {
          ...catalog,
          ...catalogState,
        }
      };
    } case at.APP_SET_SESSION_KEY: {
      let {sessionKey} = action;

      return {
        ...state,
        sessionKey,
      };
    } case at.APP_SET_SESSION_VALUE: {
      let {sessionValue} = action;

      return {
        ...state,
        sessionValue,
      };
    } case at.APP_SET_STATIC_HOST: {
      let {host} = action;

      return {
        ...state,
        hostStatic: host,
      };
    } case at.APP_LOADING_INC: {
      let {loading = 0} = state;
      loading++;

      return {
        ...state,
        loading,
      };
    } case at.APP_SET_HOC: {
      let {payload} = action;

      return {
        ...state,
        hoc: payload,
      };
    } case at.APP_SET_LANGUAGE_ID: {
      let {payload} = action;

      return {
        ...state,
        languageId: payload,
      };
    } case at.APP_SET_HTML_LANG_ATTR_VALUE: {
      let {htmlLangAttrValue} = action;

      return {
        ...state,
        htmlLangAttrValue,
      };
    } case at.APP_SET_ALTERNATE: {
      let {
        payload: {
          uk: alternateUk,
          ru: alternateRu,
        } = {},
      } = action;

      return {
        ...state,
        alternateUk,
        alternateRu,
      };
    } default: {
      return state;
    }
  }
}
