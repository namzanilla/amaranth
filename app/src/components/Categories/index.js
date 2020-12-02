import Categories from './Categories';
import {connect} from 'react-redux';
import * as categoryActionCreators from 'store/actions/category';

const mapStateToProps = (state) => {
  const {
    category: {
      list = [],
    } = {},
  } = state;

  return {
    hostStatic: state.app.hostStatic,
    languageId: state.app.languageId,
    list,
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
