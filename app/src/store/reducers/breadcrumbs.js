import * as at from 'store/actionTypes';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.BC_SET_LIST: {
      const {payload} = action;

      return {
        ...state,
        list: payload,
      };
    } default: {
      return state;
    }
  }
}
