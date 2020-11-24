import * as at from 'store/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.CATEGORY_FETCH_LIST_SUCCESS: {
      const {list = []} = action;

      return {
        ...state,
        list,
      };
    } case at.CATEGORY_SET_ID: {
      const {id} = action;

      return {
        ...state,
        id,
      };
    } case at.CATEGORY_UNSET_ID: {
      const {id, ...nextState} = state;

      return nextState;
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
