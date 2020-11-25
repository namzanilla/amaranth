import * as at from 'store/actionTypes';

const initialState = {
  contactInfo: {
    contactName: '',
    contactPhone: '',
    contactCity: '',
    contactEmail: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.ORDER_SET_CONTACT_INFO: {
      const {field, value} = action;
      const {contactInfo} = state;

      return {
        ...state,
        contactInfo: {
          ...contactInfo,
          [field]: value,
        },
      };
    } case at.ORDER_SET_CONTACT_INFO_FROM_LOCAL_STORAGE: {
      const {
        contactName,
        contactPhone,
        contactCity,
        contactEmail,
      } = action;
      const {contactInfo} = state;

      return {
        ...state,
        contactInfo: {
          ...contactInfo,
          contactName,
          contactPhone,
          contactCity,
          contactEmail,
        },
      };
    } case at.ORDER_CREATE_SUCCESS: {
      const {orderId, orderHash} = action;

      return {
        ...state,
        orderId,
        orderHash,
      };
    } case at.ORDER_FETCH_SUCCESS: {
      const {details = {}} = action;

      return {
        ...state,
        details,
      };
    } case at.ORDER_SET_ID: {
      const {orderId} = action;

      return {
        ...state,
        orderId,
      };
    } case at.ORDER_SET_HASH: {
      const {orderHash} = action;

      return {
        ...state,
        orderHash,
      };
    } default: {
      return state;
    }
  }
}
