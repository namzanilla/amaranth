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
    } case at.ORDER_CREATE_SUCCESS: {
      const {orderId, amount} = action;

      return {
        ...state,
        orderId,
        amount,
      };
    } default: {
      return state;
    }
  }
}
