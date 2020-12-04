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
      try {
        const {products = {}} = action;

        if (!Object.keys(products).length) {
          return initialState;
        }

        const {details = {}} = state;
        const {list = []} = details;
        const listNext = list.filter((el) => undefined !== products[el.id]);

        return {
          ...state,
          products,
          details: {
            ...details,
            list: listNext,
          },
        };
      } catch (e) {
        console.log(e);

        return state;
      }
    } case at.CART_FETCH_INFO_SUCCESS: {
      const {products = {}} = action;

      return {
        ...state,
        products,
      };
    } case at.CART_FETCH_DETAILS_SUCCESS: {
      const {details = {}} = action;
      const {total} = details;
      const {list = []} = details;

      if (!total) return state;

      const listNext = getListPriceWithTotal(list);

      details.totalStr = numberWithSpaces(total);

      return {
        ...state,
        details: {
          ...details,
          list: listNext,
        },
      };
    } case at.CART_REFRESH_DETAILS_TOTAL: {
      try {
        const {details = {}} = state;
        const {list = []} = details;

        if (!list.length) {
          return state;
        }

        const total = calculateTotal(state);
        const totalStr = numberWithSpaces(total);
        const listNext = getListPriceWithTotal(list)

        return {
          ...state,
          details: {
            ...details,
            list: listNext,
            total,
            totalStr,
          },
        };
      } catch (e) {
        console.log(e);
      }
    } case at.CART_SET_COUNT_INTO_LIST: {
      try {
        const {
          products = {},
          details = {},
          details: {
            list = [],
          } = {},
        } = state;

        if (list.length === 0 || !Object.keys(products).length) {
          return state;
        }

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
      } catch (e) {
        console.log(e);

        return state;
      }
    } default: {
      return state;
    }
  }
}

function getListPriceWithTotal(list) {
  return list.map((el) => {
    const {price, count} = el;
    const priceTotal = price * count;
    const priceTotalStr = numberWithSpaces(priceTotal);

    el.priceTotal = priceTotal;
    el.priceTotalStr = priceTotalStr;

    return el;
  });
}

function calculateTotal(state) {
  const {
    products = {},
    details: {
      list = [],
    } = {},
  } = state;

  let total = 0;

  list.forEach((el) => {
    const {id, price} = el;
    const {[id]: count} = products;

    total += (price * count);
  });

  return total;
}
