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
    product: {
      searchResult: {
        list = [],
      } = {},
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
