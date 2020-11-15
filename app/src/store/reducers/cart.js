import * as at from 'store/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.CART_ADD_SUCCESS: {
      const {cart} = action;

      return {
        ...state,
        products: cart,
      };
    } case at.CART_GET_INFO_SUCCESS: {
      const {cart} = action;

      return {
        ...state,
        products: cart,
      };
    } default: {
      return state;
    }
  }
}
