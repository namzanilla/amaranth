import ProductPage from './ProductPage';
import {connect} from 'react-redux';
import * as appActionCreators from 'store/actions/app';
import * as productActionCreators from 'store/actions/product';

const mapStateToProps = (state) => {
  const {
    app: {
      ssr,
      languageId,
    } = {},
    product: {
      id: productId,
      h1: productH1,
      title: productTitle,
    } = {},
  } = state;

  return {
    ssr,
    productId,
    languageId,
    productH1,
    productTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appSetSSR: (bool) => dispatch(appActionCreators.setSSR(bool)),
    setProductId: (productId) => dispatch(productActionCreators.setProductId(productId)),
    setProductInitialState: () => dispatch(productActionCreators.setProductInitialState()),
    fetchProductById: (productId) => dispatch(productActionCreators.fetchProductById(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
