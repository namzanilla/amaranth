import ProductCards from './ProductCards';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const {
    cart: {
      details: {
        list = [],
      } = {},
    } = {},
  } = state;

  return {
    list,
  };
};

export default connect(mapStateToProps)(ProductCards);
