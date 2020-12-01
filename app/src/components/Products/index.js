import Products from './Products';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const {
    app: {
      languageId,
      hostStatic,
    } = {},
    category: {
      id,
    } = {},
    products: {
      list = [],
    } = {},
  } = state;

  return {
    categoryId: id,
    languageId,
    hostStatic,
    list,
  };
};

export default connect(mapStateToProps)(Products);
