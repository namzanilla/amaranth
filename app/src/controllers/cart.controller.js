import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Html from 'components/Html';
import * as appActionCreators from 'store/actions/app';
import {getHtmlComponentProps} from 'helpers/controller';

export default async (props) => {
  const {
    ctx,
    store,
    dispatch,
  } = props;

  const sheet = new ServerStyleSheet();

  dispatch(appActionCreators.setHoc('CartPage'));

  const htmlComponentProps = getHtmlComponentProps(store, sheet);

  ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...htmlComponentProps} />);
}
