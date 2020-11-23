import OrderPage from './OrderPage';
import {connect} from 'react-redux';
import * as orderActionCreators from 'store/actions/order';

const mapStateToProps = (state) => {
  const {
    order: {
      details: {
        amount,
      } = {},
    } = {},
  } = state;

  return {
    languageId: state.app.languageId,
    orderId: state.order.orderId,
    orderAmount: amount,
    orderHash: state.order.orderHash,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (orderId, orderHash) => dispatch(orderActionCreators.fetchOrder(orderId, orderHash)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
