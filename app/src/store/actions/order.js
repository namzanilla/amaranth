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
    const {orderId, amount} = data;

    if (!orderId) {
      dispatch({type: at.ORDER_CREATE_FAILURE});
    } else {
      dispatch({
        type: at.ORDER_CREATE_SUCCESS,
        orderId,
        amount,
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
}
