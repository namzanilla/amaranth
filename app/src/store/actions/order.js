import * as at from 'store/actionTypes';
import * as orderApi from 'api/order';
import storeHelper from 'store/storeHelper';

export const createOrder = (token) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = token ? token : storeHelper.app.getToken(state);
    const contactInfo = state.order.contactInfo;
    const orderData = {contactInfo};

    dispatch({type: at.ORDER_CREATE_REQUEST});

    const {data = {}} = await orderApi.createOrder(orderData, token);
    const {orderId, orderHash} = data;

    if (!orderId) {
      dispatch({type: at.ORDER_CREATE_FAILURE});
    } else {
      dispatch({
        type: at.ORDER_CREATE_SUCCESS,
        orderId,
        orderHash,
      });

      return data;
    }
  } catch (e) {
    dispatch({type: at.ORDER_CREATE_FAILURE});

    console.log(e);
  }
};

export const setContactInfo = (field, value) => (dispatch) => {
  dispatch({
    type: at.ORDER_SET_CONTACT_INFO,
    field,
    value,
  });

  try {
    localStorage.setItem(field, value);
  } catch (e) {
    console.log(e);
  }
}

export const setContactInfoFromLocalStorage = () => (dispatch) => {
  try {
    const contactName = localStorage.getItem('contactName') || '',
      contactPhone = localStorage.getItem('contactPhone') || '',
      contactCity = localStorage.getItem('contactCity') || '',
      contactEmail = localStorage.getItem('contactEmail') || '';

    dispatch({
      type: at.ORDER_SET_CONTACT_INFO_FROM_LOCAL_STORAGE,
      contactName,
      contactPhone,
      contactCity,
      contactEmail,
    });
  } catch (e) {
    console.log(e);
  }
}

export const fetchOrder = (orderId, orderHash) => async (dispatch) => {
  try {
    orderId = parseInt(orderId);

    if (isNaN(orderId)) {
      dispatch({type: at.ORDER_FETCH_FAILURE});
    } else if ('string' !== typeof orderHash) {
      dispatch({type: at.ORDER_FETCH_FAILURE});
    } else {
      dispatch({type: at.ORDER_FETCH_REQUEST});

      const {data = {}} = await orderApi.getOrder(orderId, orderHash);

      dispatch({
        type: at.ORDER_FETCH_SUCCESS,
        details: data,
      });

      return data;
    }
  } catch (e) {
    dispatch({type: at.ORDER_FETCH_FAILURE});

    console.log(e);
  }
}

export const setOrderId = (orderId) => (dispatch) => {
  dispatch({
    type: at.ORDER_SET_ID,
    orderId,
  });
}

export const setOrderHash = (orderHash) => (dispatch) => {
  dispatch({
    type: at.ORDER_SET_HASH,
    orderHash,
  });
}
