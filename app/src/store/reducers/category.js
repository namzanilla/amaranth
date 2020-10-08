import * as at from 'store/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.CATEGORY_SET_BRAND_TREE: {
      const {payload} = action;

      return {
        ...state,
        brandTree: payload,
      };
    } default: {
      return state;
    }
  }
}
