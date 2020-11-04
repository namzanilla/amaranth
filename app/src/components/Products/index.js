import Products from './Products';
import {connect} from 'react-redux';
import * as productsActionCreators from 'store/actions/products';

const mapStateToProps = (state) => {
  const {
    app: {
      languageId,
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
    list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    productsSetDidUnmount: (bool) => dispatch(productsActionCreators.productsSetDidUnmount(bool)),
    productsSetInitialState: () => dispatch(productsActionCreators.productsSetInitialState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
