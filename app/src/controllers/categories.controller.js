import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Html from 'components/Html';
import * as appActionCreators from 'store/actions/app';
import * as categoryActionCreators from 'store/actions/category';
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

  dispatch(appActionCreators.setHoc('CategoriesPage'));

  await dispatch(categoryActionCreators.fetchCategoryList(languageId));

  const htmlComponentProps = getHtmlComponentProps(store, sheet);

  ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...htmlComponentProps} />);
}
