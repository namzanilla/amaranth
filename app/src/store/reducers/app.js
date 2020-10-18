import * as at from 'store/actionTypes';

const initialState = {
  loading: 0,
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
