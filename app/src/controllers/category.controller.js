import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Html from 'components/Html';
import * as appActionCreators from 'store/actions/app';
import * as categoryApi from 'api/category';
import * as categoryActionCreators from 'store/actions/category';
import * as productsActionCreators from 'store/actions/products';
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

  dispatch(appActionCreators.setSSR(true));

  const htmlComponentProps = getHtmlComponentProps(store, sheet);

  ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...htmlComponentProps} />);
}
