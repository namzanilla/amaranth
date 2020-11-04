import * as at from 'store/actionTypes';
import * as productsApi from 'api/products';

export const productsSet = (products) => (dispatch) => {
  dispatch({
    type: at.PRODUCTS_SET,
    products,
  });
};

export const productsSetDidUnmount = (bool) => (dispatch) => {
  dispatch({
    type: at.PRODUCTS_SET_DID_UNMOUNT,
    bool,
  });
};

export const productsSetPage = (page) => (dispatch, getState) => {
  const {
    products = {},
  } = getState();

  if (page !== products.page) {
    dispatch({
      type: at.PRODUCTS_SET_PAGE,
      page,
    });
  }
};

export const productsSetInitialState = () => async (dispatch) => {
  dispatch({
    type: at.PRODUCTS_SET_INITIAL_STATE,
  });
}

export const productsFetch = () => async (dispatch, getState) => {
  dispatch({type: at.PRODUCTS_FETCH_REQUEST});

  const {
    app: {
      languageId
    } = {},
    category: {
      id: categoryId,
    } = {},
    products: {
      page,
    } = {},
  } = getState();

  const params = {
    languageId,
    categoryId,
    page,
  };

  try {
    const {data: products} = await productsApi.getProducts(params);
    dispatch({type: at.PRODUCTS_FETCH_SUCCESS});
    dispatch(productsSet(products));
  } catch (e) {
    dispatch({type: at.PRODUCTS_FETCH_FAILURE});
    console.log(e);
  }
};
