import * as at from 'store/actionTypes';

export const setBcList = (payload) => (dispatch) => {
  dispatch({
    type: at.BC_SET_LIST,
    payload,
  });
};
