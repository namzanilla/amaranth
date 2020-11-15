import {v4 as uuidv4} from 'uuid';
import createStore from 'store/createStore';
import * as appActionCreators from 'store/actions/app';
const {
  HOST_STATIC,
  NODE_API_SESSION_KEY,
} = process.env;

export default (languageId, cb) => (ctx) => {
  let sessionValue = ctx.cookies.get(NODE_API_SESSION_KEY);

  if (!sessionValue) {
    setCookie(ctx);
  }

  const store = createStore();
  const {dispatch} = store;

  dispatch(appActionCreators.setLanguageId(languageId));
  dispatch(appActionCreators.setAlternate(ctx.path, ctx.querystring));
  dispatch(appActionCreators.appSetStaticHost(HOST_STATIC));
  dispatch(appActionCreators.appSetSessionKey(NODE_API_SESSION_KEY));
  dispatch(appActionCreators.appSetSessionValue(sessionValue));

  const props = {
    ctx,
    store,
    dispatch,
  };

  return cb(props);
}

function setCookie(ctx) {
  const value = uuidv4();

  let date = new Date();
  let d = date.getDate();

  date.setMonth(date.getMonth() + 1);

  if (date.getDate() !== d) {
    date.setDate(0);
  }

  ctx.cookies.set(NODE_API_SESSION_KEY, value, {
    path: '/',
    expires: date,
  });
}
