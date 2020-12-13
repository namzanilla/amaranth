import CategoryPage from './CategoryPage';
import {connect} from 'react-redux';
import * as appActionCreators from 'store/actions/app';
import * as productsActionCreators from 'store/actions/products';
import * as productActionCreators from 'store/actions/product';
import * as categoryActionCreators from 'store/actions/category';

const mapDispatchToProps = (dispatch) => {
  return {
    productsSetPage: (page) =>  dispatch(productsActionCreators.productsSetPage(page)),
    unsetCategoryId: () =>  dispatch(categoryActionCreators.unsetCategoryId()),
    setCategoryIdByPathname: (pathname) =>  dispatch(categoryActionCreators.setCategoryIdByPathname(pathname)),
    fetchCategoryInfo: (categoryId, languageId) =>  dispatch(categoryActionCreators.fetchCategoryInfo(categoryId, languageId)),
    productsFetch: () =>  dispatch(productsActionCreators.productsFetch()),
    fetchProductList: () =>  dispatch(productActionCreators.fetchProductList()),
    setSSR: (bool) =>  dispatch(appActionCreators.setSSR(bool)),
  }
};

const mapStateToProps = (state) => {
  const {
    app: {
      ssr,
      languageId,
    } = {},
    products: {
      page,
      limit,
    } = {},
    product: {
      searchResult: {
        total,
      } = {},
    } = {},
    category: {
      id: categoryId,
      [`info_${languageId}`]: {
        h1 = '',
      } = {},
    } = {},
  } = state;

  return {
    languageId,
    categoryId,
    title: h1,
    h1,
    ssr,
    page,
    total,
    limit,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
