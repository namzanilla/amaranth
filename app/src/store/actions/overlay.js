import * as at from 'store/actionTypes';

export const show = () => (dispatch) => {
  dispatch({
    type: at.OVERLAY_SHOW,
  });
};

export const hide = () => (dispatch) => {
  dispatch({
    type: at.OVERLAY_HIDE,
  });
};
