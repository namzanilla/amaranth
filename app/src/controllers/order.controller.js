import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Html from 'components/Html';
import * as appActionCreators from 'store/actions/app';
import * as orderActionCreators from 'store/actions/order';
import {getHtmlComponentProps} from 'helpers/controller';

export default async (props) => {
  const {
    ctx,
    store,
    dispatch,
  } = props;
  const sheet = new ServerStyleSheet();
  let {
    params: {
      orderId,
      orderHash,
    } = {},
  } = ctx;

  orderId = parseInt(orderId);

  dispatch(appActionCreators.setHoc('OrderPage'));
  dispatch(orderActionCreators.setOrderId(orderId));
  dispatch(orderActionCreators.setOrderHash(orderHash));

  const htmlComponentProps = getHtmlComponentProps(store, sheet);

  ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...htmlComponentProps} />);
}
