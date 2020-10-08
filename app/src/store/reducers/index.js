import {combineReducers} from 'redux';
import app from 'store/reducers/app';
import category from 'store/reducers/category';

const reducers = combineReducers({
  app,
  category,
});

export default reducers;
