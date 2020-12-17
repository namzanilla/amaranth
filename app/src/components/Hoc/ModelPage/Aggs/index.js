import Aggs from './Aggs';
import {connect} from 'react-redux';
import * as modelActionCreators from 'store/actions/model';

const mapStateToProps = (state) => {
  const {
    app: {
      languageId,
    } = {},
    model: {
      id: modelId,
      agg: {
        type,
        first = [],
        second = [],
        paramFirst,
      } = {},
    } = {},
  } = state;

  return {
    type,
    first,
    paramFirst,
    second,
    languageId,
    modelId,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetch_AGG_TYPE_3_PIPE_7_SECOND:
    (modelId, paramFirst, languageId) =>
      dispatch(modelActionCreators
        .fetch_AGG_TYPE_3_PIPE_7_SECOND(modelId, paramFirst, languageId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Aggs);
