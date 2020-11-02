import * as at from 'store/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.CATEGORY_SET_LIST_STATE: {
      const {
        languageId,
        state: listState,
      } = action;

      return {
        ...state,
        [`list_${languageId}_state`]: listState,
      };
    } case at.CATEGORY_SET_LIST: {
      const {
        languageId,
        list,
      } = action;

      return {
        ...state,
        [`list_${languageId}`]: list,
      };
    } case at.CATEGORY_SET_INFO: {
      const {
        languageId,
        info,
      } = action;

      return {
        ...state,
        [`info_${languageId}`]: info,
      };
    } default: {
      return state;
    }
  }
}
