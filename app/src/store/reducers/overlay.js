import * as at from 'store/actionTypes';

const initialState = {
  isVisible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.OVERLAY_SHOW: {
      return {
        ...state,
        isVisible: true,
      };
    } case at.OVERLAY_HIDE: {
      return {
        ...state,
        isVisible: false,
      };
    } default: {
      return state;
    }
  }
}
