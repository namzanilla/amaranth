import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Html from 'components/Html';
import * as appActionCreators from 'store/actions/app';
import * as categoryActionCreators from 'store/actions/category';
import * as productsActionCreators from 'store/actions/products';
import * as productActionCreators from 'store/actions/product';
import {getHtmlComponentProps} from 'helpers/controller';

export default async (props) => {
  const {
    ctx,
    store,
    dispatch,
  } = props;
  const {
    app: {
      languageId,
    } = {},
  } = store.getState();
  const categoryId = parseInt(ctx.params.id);

  await dispatch(categoryActionCreators.fetchCategoryInfo(categoryId, languageId));

  const {
    app: {
      hoc,
    } = {},
  } = store.getState();

  if (hoc === 'NotFoundPage') {
    ctx.status = 404;
  } else {
    let page = parseInt(ctx.request.query.page);
    page = isNaN(page) || page < 1 ? 1 : page;

    dispatch(appActionCreators.setHoc('CategoryPage'));
    dispatch(productsActionCreators.productsSetPage(page));
    dispatch(categoryActionCreators.setCategoryId(categoryId));
    // await dispatch(productsActionCreators.productsFetch());
    await dispatch(productActionCreators.fetchProductList());
  }

  dispatch(appActionCreators.setSSR(true));

  const sheet = new ServerStyleSheet();
  const htmlComponentProps = getHtmlComponentProps(store, sheet);

  ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...htmlComponentProps} />);
}
