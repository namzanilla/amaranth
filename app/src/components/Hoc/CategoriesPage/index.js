import CategoriesPage from './CategoriesPage';
import {connect} from 'react-redux';
import * as appActionCreators from 'store/actions/app';
import * as categoryActionCreators from 'store/actions/category';

const mapStateToProps = (state) => {
  return {
    ssr: state.app.ssr,
    languageId: state.app.languageId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategoryList: (languageId) => dispatch(categoryActionCreators.fetchCategoryList(languageId)),
    appSetSSR: (bool) => dispatch(appActionCreators.setSSR(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
