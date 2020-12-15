import SubHeader from './SubHeader';
import {connect} from 'react-redux';
import * as appActionCreators from 'store/actions/app';
import * as categoryActionCreators from 'store/actions/category';

const mapDispatchToProps = (dispatch) => {
  return {
    appSetCatalogState: (state) => (dispatch(appActionCreators.appSetCatalogState(state))),
    fetchCategoryList: (languageId) => dispatch(categoryActionCreators.fetchCategoryList(languageId)),
  };
};

const mapStateToProps = (state) => {
  const {
    category: {
      list = [],
    } = {},
  } = state;

  return {
    catalogIsVisible: state.app.catalog.isVisible,
    catalogScrollY: state.app.catalog.scrollY,
    hoc: state.app.hoc,
    languageId: state.app.languageId,
    categoryList: list,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);
