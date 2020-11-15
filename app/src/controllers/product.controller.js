import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Html from 'components/Html';
import * as appActionCreators from 'store/actions/app';
import * as productActionCreators from 'store/actions/product';
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
      id: productId,
    } = {},
  } = ctx;
  productId = parseInt(productId)

  // @TODO 404 if productId not exists

  dispatch(appActionCreators.setHoc('ProductPage'));
  dispatch(appActionCreators.setSSR(true));
  dispatch(productActionCreators.setProductId(productId));
  await dispatch(productActionCreators.fetchProductById(productId));

  const htmlComponentProps = getHtmlComponentProps(store, sheet);

  ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...htmlComponentProps} />);
}
