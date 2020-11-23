import CartPage from './CartPage';
import {connect} from 'react-redux';
import * as cartActionCreators from 'store/actions/cart';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartDetails: () => dispatch(cartActionCreators.fetchCartDetails()),
  };
};

const mapStateToProps = (state) => {
  return {
    languageId: state.app.languageId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
