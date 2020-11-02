import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import {Provider} from 'react-redux';
import createStore from 'store/createStore';
import App from 'components/App';
import Html from 'components/Html';
import * as appActionCreators from 'store/actions/app';

export default (languageId) => async (ctx) => {
  const props = {};
  const store = createStore();
  const {dispatch} = store;
  const sheet = new ServerStyleSheet();

  dispatch(appActionCreators.setLanguageId(languageId));
  dispatch(appActionCreators.setHoc('HomePage'));
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
