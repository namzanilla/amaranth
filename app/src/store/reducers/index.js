import {combineReducers} from 'redux';
import app from 'store/reducers/app';
import category from 'store/reducers/category';
import breadcrumbs from 'store/reducers/breadcrumbs';

const reducers = combineReducers({
  app,
  category,
  breadcrumbs,
});

export default reducers;
