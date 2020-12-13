import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Html from 'components/Html';
import * as appActionCreators from 'store/actions/app';
import * as modelActionCreators from 'store/actions/model';
import {getHtmlComponentProps} from 'helpers/controller';

export default async (props) => {
  try {
    const {
      ctx,
      store,
      dispatch,
    } = props;
    const sheet = new ServerStyleSheet();
    const modelId = +ctx.params.modelId;

    dispatch(appActionCreators.setHoc('ModelPage'));
    dispatch(appActionCreators.setSSR(true));
    dispatch(modelActionCreators.setModelId(modelId));
    await dispatch(modelActionCreators.fetchModelById(modelId));

    const htmlComponentProps = getHtmlComponentProps(store, sheet);

    ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...htmlComponentProps} />);
  } catch (e) {
    console.error(e);
  }
}
