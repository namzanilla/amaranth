import {combineReducers} from 'redux';
import app from 'store/reducers/app';
import category from 'store/reducers/category';
import products from 'store/reducers/products';
import breadcrumbs from 'store/reducers/breadcrumbs';

const reducers = combineReducers({
  app,
  category,
  products,
  breadcrumbs,
});

export default reducers;
