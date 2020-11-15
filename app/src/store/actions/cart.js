import * as at from 'store/actionTypes';
import * as cartApi from 'api/cart';

export const addIntoCart = (products, token) => async (dispatch) => {
  dispatch({type: at.CART_ADD_REQUEST});

  try {
    const {data: cart = {}} = await cartApi.addIntoCart(products, token);

    dispatch({
      type: at.CART_ADD_SUCCESS,
      cart,
    });
  } catch (e) {
    dispatch({type: at.CART_ADD_FAILURE});
    console.log(e);
  }
};

export const getCartInfo = (token) => async (dispatch) => {
  dispatch({type: at.CART_GET_INFO_REQUEST});

  try {
    const {data: cart = {}} = await cartApi.getCartInfo(token);

    dispatch({
      type: at.CART_GET_INFO_SUCCESS,
      cart,
    });
  } catch (e) {
    dispatch({type: at.CART_GET_INFO_FAILURE});
    console.log(e);
  }
};
