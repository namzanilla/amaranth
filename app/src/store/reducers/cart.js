import * as at from 'store/actionTypes';
import {numberWithSpaces} from 'helpers/_Number';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.CART_ADD_SUCCESS: {
      const {products = {}} = action;

      return {
        ...state,
        products,
      };
    } case at.CART_SET_INITIAL_STATE: {
      return initialState;
    } case at.CART_REMOVE_SUCCESS: {
      const {products = {}} = action;

      return {
        ...state,
        products,
      };
    } case at.CART_FETCH_INFO_SUCCESS: {
      const {products = {}} = action;

      return {
        ...state,
        products,
      };
    } case at.CART_FETCH_DETAILS_SUCCESS: {
      const {details = {}} = action;
      const {total} = details;

      details.totalStr = numberWithSpaces(total);

      return {
        ...state,
        details,
      };
    } case at.CART_REFRESH_DETAILS_TOTAL: {
      const {details = {}} = state;
      const total = calculateTotal(state);
      const totalStr = numberWithSpaces(total);

      return {
        ...state,
        details: {
          ...details,
          total,
          totalStr,
        },
      };
    } case at.CART_SET_COUNT_INTO_LIST: {
      const {
        products = {},
        details = {},
        details: {
          list = [],
        } = {},
      } = state;

      if (list.length === 0 ) return state;

      const listNext = list.map((el) => {
        const {id} = el;
        const {
          [id]: count,
        } = products;

        return {
          ...el,
          count,
        };
      });

      return {
        ...state,
        details: {
          ...details,
          list: listNext,
        },
      };
    } default: {
      return state;
    }
  }
}

function calculateTotal(state) {
  const {
    products = {},
    details: {
      list = [],
    } = {}
  } = state;

  let total = 0;

  list.forEach((el) => {
    const {id, price} = el;
    const {[id]: count} = products;

    total += (price * count);
  });

  return total;
}
