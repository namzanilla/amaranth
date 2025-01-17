import * as at from 'store/actionTypes';
import * as productApi from 'api/product';

export const setProductId = (productId) => (dispatch, getState) => {
  const {product = {}} = getState();

  if (product.id !== productId) {
    dispatch({
      type: at.PRODUCT_SET_ID,
      id: productId,
    });
  }
};

export const setProductInitialState = () => (dispatch) => {
  dispatch({
    type: at.PRODUCT_SET_INITIAL_STATE,
  });
};

export const fetchProductById = (productId, languageId) => async (dispatch, getState) => {
  try {
    if (!languageId) {
      const {
        app: {
          languageId: lid,
        } = {},
      } = getState();

      languageId = lid;
    }

    dispatch({type: at.PRODUCT_FETCH_BY_ID_REQUEST});

    const {data: product} = await productApi.getProduct({productId, languageId});

    dispatch({
      type: at.PRODUCT_FETCH_BY_ID_SUCCESS,
      product,
    });

    return product;
  } catch (e) {
    dispatch({type: at.PRODUCT_FETCH_BY_ID_FAILURE});
    console.log(e);

    return at.PRODUCT_FETCH_BY_ID_FAILURE;
  }
};

export const setProductIdByPathname = (pathname) => (dispatch, getState) => {
  dispatch({type: at.PRODUCT_SET_ID_BY_PATHNAME});

  pathname = pathname.split('/');
  pathname.shift();

  if ('ru' === pathname[0] || '' === pathname[0]) {
    pathname.shift();
  }

  const {product = {}} = getState();
  const productId = +pathname[0].substring(1);

  if (product.id !== productId) {
    dispatch(setProductId(productId));
  }
};

export const fetchProductList = () => async (dispatch, getState) => {
  try {
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

    dispatch({type: at.PRODUCT_FETCH_LIST_REQUEST});

    const {data: products = {}} = await productApi.getProductList(params);

    dispatch({
      type: at.PRODUCT_FETCH_LIST_SUCCESS,
      products,
    });

    return products;
  } catch (e) {
    dispatch({type: at.PRODUCT_FETCH_LIST_FAILURE});
    console.log(e);
  }
};

