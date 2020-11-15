import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import createStore from 'store/createStore';
import Html from 'components/Html';
import {getLangIdByUrlPath} from 'helpers/language';
import * as appActionCreators from 'store/actions/app';
import {getHtmlComponentProps} from 'helpers/controller';

const {
  HOST_STATIC,
  NODE_API_SESSION_KEY,
} = process.env;

export default async (ctx) => {
  const store = createStore();
  const {dispatch} = store;
  const sheet = new ServerStyleSheet();

  const languageId = getLangIdByUrlPath(ctx.path);

  dispatch(appActionCreators.setLanguageId(languageId));
  dispatch(appActionCreators.setHoc('NotFoundPage'));
  dispatch(appActionCreators.setAlternate(ctx.path, ctx.querystring));
  dispatch(appActionCreators.appSetStaticHost(HOST_STATIC));
  dispatch(appActionCreators.appSetSessionKey(NODE_API_SESSION_KEY));

  const htmlComponentProps = getHtmlComponentProps(store, sheet);

  ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...htmlComponentProps} />);
}
