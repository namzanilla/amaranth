import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import {Provider} from 'react-redux';
import createStore from 'store/createStore';
import App from 'components/App';
import Html from 'components/Html';
import * as appActionCreators from 'store/actions/app';
import * as productActionCreators from 'store/actions/product';

export default (languageId) => async (ctx) => {
  const props = {};
  const store = createStore();
  const {dispatch} = store;
  const sheet = new ServerStyleSheet();

  let {
    params: {
      id: productId,
    } = {},
  } = ctx;

  productId = parseInt(productId)

  dispatch(appActionCreators.setLanguageId(languageId));
  dispatch(appActionCreators.setHoc('ProductPage'));
  dispatch(appActionCreators.setAlternate(ctx.path, ctx.querystring));
  dispatch(appActionCreators.setSSR(true));

  dispatch(productActionCreators.setProductId(productId));
  await dispatch(productActionCreators.fetchProductById(productId));

  props.__html = renderToString(
    <Provider store={store}>
      <StyleSheetManager sheet={sheet.instance}>
        <App />
      </StyleSheetManager>
    </Provider>
  );

  props.styleElement = sheet.getStyleElement();
  props.state = store.getState();

  ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...props} />);
}
