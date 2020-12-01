import ProductCard from './ProductCard';
import {connect} from 'react-redux';
import * as cartActionCreators from 'store/actions/cart';

const mapStateToProps = (state) => {
  return {
    languageId: state.app.languageId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIntoCart: (products) => dispatch(cartActionCreators.addIntoCart(products)),
    removeFromCart: (products) => dispatch(cartActionCreators.removeFromCart(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
