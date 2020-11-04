import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import {Provider} from 'react-redux';
import createStore from 'store/createStore';
import App from 'components/App';
import Html from 'components/Html';

import * as appActionCreators from 'store/actions/app';
import * as categoryApi from 'api/category';
import * as categoryActionCreators from 'store/actions/category';
import * as productsActionCreators from 'store/actions/products';

export default (languageId) => async (ctx) => {
  const props = {};
  const store = createStore();
  const {dispatch} = store;
  const sheet = new ServerStyleSheet();
  const categoryId = parseInt(ctx.params.id);

  let page = parseInt(ctx.request.query.page);

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  dispatch(productsActionCreators.productsSetPage(page));

  const params = {
    id: categoryId,
    languageId,
  };

  try {
    const {data: info = {}} = await categoryApi.getInfoById(params);

    if (!info.h1) {
      dispatch(appActionCreators.setHoc('NotFoundPage'));
      ctx.status = 404;
      throw 'Not found';
    }

    dispatch(appActionCreators.setHoc('CategoryPage'));
    dispatch(categoryActionCreators.setCategoryId(categoryId));
    dispatch(categoryActionCreators.setCategoryInfo(languageId, info));

    dispatch(productsActionCreators.productsSetDidUnmount(false));
    await dispatch(productsActionCreators.productsFetch());

  } catch (e) {
    console.log(e);
  }

  dispatch(appActionCreators.setLanguageId(languageId));
  dispatch(appActionCreators.setAlternate(ctx.path, ctx.querystring));
  dispatch(appActionCreators.setSSR(true));

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
