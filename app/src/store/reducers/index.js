import {combineReducers} from 'redux';
import app from 'store/reducers/app';
import category from 'store/reducers/category';
import products from 'store/reducers/products';
import product from 'store/reducers/product';
import cart from 'store/reducers/cart';
import breadcrumbs from 'store/reducers/breadcrumbs';

const reducers = combineReducers({
  app,
  category,
  products,
  product,
  cart,
  breadcrumbs,
});

export default reducers;
