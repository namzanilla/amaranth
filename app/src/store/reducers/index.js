import {combineReducers} from 'redux';
import app from 'store/reducers/app';
import category from 'store/reducers/category';
import overlay from 'store/reducers/overlay';

const reducers = combineReducers({
  app,
  category,
  overlay,
});

export default reducers;
