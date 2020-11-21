import * as at from 'store/actionTypes';
import * as cartApi from 'api/cart';
import storeHelper from 'store/storeHelper';

export const addIntoCart = (products, token) => async (dispatch, getState) => {
  try {
    token = token ? token : storeHelper.app.getToken(getState());

    dispatch({type: at.CART_ADD_REQUEST});
    const {data = {}} = await cartApi.addIntoCart(products, token);

    dispatch({
      type: at.CART_ADD_SUCCESS,
      products: data,
    });
    dispatch({type: at.CART_SET_COUNT_INTO_LIST});
    dispatch({type: at.CART_REFRESH_DETAILS_TOTAL});
  } catch (e) {
    dispatch({type: at.CART_ADD_FAILURE});
    console.log(e);
  }
};

export const removeFromCart = (products, token) => async (dispatch, getState) => {
  try {
    token = token ? token : storeHelper.app.getToken(getState());

    dispatch({type: at.CART_REMOVE_REQUEST});
    const {data = {}} = await cartApi.removeFromCart(products, token);

    dispatch({
      type: at.CART_REMOVE_SUCCESS,
      products: data,
    });
    dispatch({type: at.CART_SET_COUNT_INTO_LIST});
    dispatch({type: at.CART_REFRESH_DETAILS_TOTAL});
  } catch (e) {
    dispatch({type: at.CART_REMOVE_FAILURE});
    console.log(e);
  }
};

export const fetchCartDetails = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = storeHelper.app.getToken(state);
    const languageId = storeHelper.app.getLanguageId(state);

    dispatch({type: at.CART_FETCH_DETAILS_REQUEST});
    const {data: details = {}} = await cartApi.getCartDetails(languageId, token);

    dispatch({
      type: at.CART_FETCH_DETAILS_SUCCESS,
      details,
    });
  } catch (e) {
    dispatch({type: at.CART_FETCH_DETAILS_FAILURE});
    console.log(e);
  }
};

export const getCartInfo = (token) => async (dispatch) => {
  try {
    dispatch({type: at.CART_FETCH_INFO_REQUEST});
    const {data: products = {}} = await cartApi.getCartInfo(token);

    dispatch({
      type: at.CART_FETCH_INFO_SUCCESS,
      products,
    });
  } catch (e) {
    dispatch({type: at.CART_FETCH_INFO_FAILURE});
    console.log(e);
  }
};

export const setCartInitialState = () => async (dispatch) => {
  dispatch({type: at.CART_SET_INITIAL_STATE});
};
