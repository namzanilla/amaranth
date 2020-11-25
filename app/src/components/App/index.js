import {connect} from 'react-redux';
import App from './App';
import * as appActionCreators from 'store/actions/app';
import * as productsActionCreators from 'store/actions/products';
import * as productActionCreators from 'store/actions/product';
import * as cartActionCreators from 'store/actions/cart';
import * as orderActionCreators from 'store/actions/order';

const mapStateToProps = (state) => {
  return {
    sessionValue: state.app.sessionValue,
    hoc: state.app.hoc,
    alternateUk: state.app.alternateUk,
    alternateRu: state.app.alternateRu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguageId: (languageId) => dispatch(appActionCreators.setLanguageId(languageId)),
    setAlternate: (path, querystring) => dispatch(appActionCreators.setAlternate(path, querystring)),
    setHoc: (hoc) => dispatch(appActionCreators.setHoc(hoc)),
    productsSetPage: (page) => dispatch(productsActionCreators.productsSetPage(page)),
    setProductIdByPathname: (pathname) => dispatch(productActionCreators.setProductIdByPathname(pathname)),
    getCartInfo: (sessionValue) => dispatch(cartActionCreators.getCartInfo(sessionValue)),
    orderSetContactInfoFromLocalStorage: () => dispatch(orderActionCreators.setContactInfoFromLocalStorage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
