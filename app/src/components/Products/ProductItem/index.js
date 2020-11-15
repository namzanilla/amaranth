import {connect} from 'react-redux';
import ProductItem from './ProductItem';
import * as cartActionCreators from 'store/actions/cart';

const mapStateToProps = (state) => {
  const {
    app: {
      languageId,
    } = {},
    cart: {
      products = {},
    } = {},
  } = state;

  return {
    sessionValue: state.app.sessionValue,
    products,
    languageId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIntoCart: (products, token) => dispatch(cartActionCreators.addIntoCart(products, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
