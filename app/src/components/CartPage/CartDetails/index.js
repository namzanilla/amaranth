import CartDetails from './CartDetails';
import {connect} from 'react-redux';

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

export default connect(mapStateToProps)(CartDetails);
