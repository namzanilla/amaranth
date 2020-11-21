import CartDetails from './CartDetails';
import {connect} from 'react-redux';
import * as orderActionCreators from 'store/actions/order';
import * as cartActionCreators from 'store/actions/cart';

const mapStateToProps = (state) => {
  const {
    app: {
      languageId,
    } = {},
    cart: {
      details: {
        totalStr: totalPrice,
      } = {},
    } = {},
  } = state;

  return {
    languageId,
    totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: () => dispatch(orderActionCreators.createOrder()),
    setCartInitialState: () => dispatch(cartActionCreators.setCartInitialState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);
