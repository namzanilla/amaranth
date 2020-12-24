import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Html from 'components/Html';

// actions
import * as appActionCreators from 'store/actions/app';
import * as modelActionCreators from 'store/actions/model';

// helpers
import {getHtmlComponentProps} from 'helpers/controller';
import * as modelHelper from 'helpers/model';


// const
import {
  AGG_TYPE_7,
  AGG_TYPE_3_PIPE_7,
} from 'const/model';

export default async (props) => {
  try {
    const {
      ctx,
      store,
      dispatch,
    } = props;
    const sheet = new ServerStyleSheet();
    const modelId = +ctx.params.modelId;

    await dispatch(modelActionCreators.fetchModelById(modelId));

    const state = store.getState();
    const {
      model: {
        agg: {
          type: aggType,
        } = {},
      } = {},
    } = state;

    if (aggType === AGG_TYPE_3_PIPE_7) {
      const paramFirst = modelHelper.getFirstParamFromPathname(ctx.request.path);

      if (paramFirst) {
        await dispatch(modelActionCreators.setAggParam('paramFirst', paramFirst));
        await dispatch(modelActionCreators.fetch_AGG_TYPE_3_PIPE_7_SECOND(modelId, paramFirst));
      }
    }

    dispatch(appActionCreators.setHoc('ModelPage'));
    dispatch(appActionCreators.setSSR(true));
    dispatch(modelActionCreators.setModelId(modelId));


    const htmlComponentProps = getHtmlComponentProps(store, sheet);

    ctx.body = '<!doctype html>'+renderToStaticMarkup(<Html {...htmlComponentProps} />);
  } catch (e) {
    console.error(e);
  }
}
