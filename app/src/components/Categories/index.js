import Categories from './Categories';
import {connect} from 'react-redux';
import * as categoryActionCreators from 'store/actions/category';

const mapStateToProps = (state) => {
  const {
    app: {
      languageId,
    } = {},
    category: {
      [`list_${languageId}`]: list = [],
      [`list_${languageId}_state`]: listState = 'request',
    } = {},
  } = state;

  return {
    languageId,
    list,
    state: listState,
  };
};

const mapDispatchToProps = (dispatch) => {
  const fetchCategoryList = (languageId) => {
    return dispatch(categoryActionCreators.fetchCategoryList(languageId));
  };

  return {
    fetchCategoryList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
