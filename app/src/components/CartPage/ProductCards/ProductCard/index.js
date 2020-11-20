import ProductCard from './ProductCard';
import {connect} from 'react-redux';
import * as cartActionCreators from 'store/actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    addIntoCart: (products) => dispatch(cartActionCreators.addIntoCart(products)),
    removeFromCart: (products) => dispatch(cartActionCreators.removeFromCart(products)),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
