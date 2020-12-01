import * as at from 'store/actionTypes';

const initialState = {
  limit: 12,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.PRODUCTS_SET_PAGE: {
      const {page} = action;

      return {
        ...state,
        page,
      };
    } case at.PRODUCTS_SET_INITIAL_STATE: {
      return initialState;
    } case at.PRODUCTS_FETCH_SUCCESS: {
      const {
        products: {
          total,
          list = [],
        } = {},
      } = action;

      return {
        ...state,
        total,
        list,
      };
    } default: {
      return state;
    }
  }
}
