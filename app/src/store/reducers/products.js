import * as at from 'store/actionTypes';

const initialState = {
  didUnmount: true,
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
    } case at.PRODUCTS_SET_DID_UNMOUNT: {
      const {bool} = action;

      return {
        ...state,
        didUnmount: bool,
      };
    } case at.PRODUCTS_SET_INITIAL_STATE: {
      return initialState;
    } case at.PRODUCTS_SET: {
      const {didUnmount} = state;
      if (didUnmount) return state;

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
