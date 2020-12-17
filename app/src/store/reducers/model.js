import * as at from 'store/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case at.MODEL_FETCH_BY_ID_SUCCESS: {
      const {payload} = action;

      return {
        ...state,
        ...payload,
      };
    } case at.MODEL_SET_ID: {
      const {id} = action;

      return {
        ...state,
        id,
      };
    } case at.MODEL_SET_AGG_PARAM: {
      const {
        paramName,
        paramValue,
      } = action;
      const {agg} = state;

      return {
        ...state,
        agg: {
          ...agg,
          [paramName]: paramValue,
        },
      };
    } case at.MODEL_FETCH_AGG_TYPE_3_PIPE_7_SECOND_SUCCESS: {
      const {payload} = action;
      const {agg} = state;

      return {
        ...state,
        agg: {
          ...agg,
          second: payload,
        },
      };
    } case at.MODEL_SET_INITIAL_STATE: {
      return initialState;
    } default: {
      return state;
    }
  }
}
