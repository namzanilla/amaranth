import {combineReducers} from 'redux';

import app from 'store/reducers/app';
import category from 'store/reducers/category';
import products from 'store/reducers/products';
import product from 'store/reducers/product';
import cart from 'store/reducers/cart';
import order from 'store/reducers/order';
import model from 'store/reducers/model';

export default combineReducers({
  app,
  category,
  products,
  product,
  cart,
  order,
  model,
});
