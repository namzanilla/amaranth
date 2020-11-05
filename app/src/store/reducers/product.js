import * as at from 'store/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.PRODUCT_SET_ID: {
      let {id} = action;

      return {
        ...state,
        id,
      };
    } case at.PRODUCT_FETCH_BY_ID_SUCCESS: {
      let {product = {}} = action;

      return {
        ...state,
        ...product,
      };
    } case at.PRODUCT_SET_INITIAL_STATE: {
      return initialState;
    } default: {
      return state;
    }
  }
}
