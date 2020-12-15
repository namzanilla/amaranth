import ProductCards from './ProductCards';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const {
    app: {
      hostStatic
    } = {},
    cart: {
      details: {
        list = [],
      } = {},
    } = {},
  } = state;

  return {
    hostStatic,
    list,
  };
};

export default connect(mapStateToProps)(ProductCards);
