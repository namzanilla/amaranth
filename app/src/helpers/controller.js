import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {StyleSheetManager} from 'styled-components';
import App from 'components/App';

export const getHtmlComponentProps = (store, sheet) => {
  const props = {};

  props.__html = renderToString(
    <Provider store={store}>
      <StyleSheetManager sheet={sheet.instance}>
        <App />
      </StyleSheetManager>
    </Provider>
  );

  props.styleElement = sheet.getStyleElement();
  props.state = store.getState();

  return props;
};
