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

export default (languageId) => async (ctx) => {
  const props = {};
  const store = createStore();
  const {dispatch} = store;
  const sheet = new ServerStyleSheet();
  const categoryId = parseInt(ctx.params.id);
  const params = {
    id: categoryId,
    languageId,
  };

  try {
    const {data: info} = await categoryApi.getInfoById(params);

    dispatch(categoryActionCreators.setCategoryInfo(languageId, info));
  } catch (e) {
    console.log(e);
  }

  dispatch(appActionCreators.setLanguageId(languageId));
  dispatch(appActionCreators.setHoc('CategoryPage'));
  dispatch(appActionCreators.setAlternate(ctx.path, ctx.querystring));

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
