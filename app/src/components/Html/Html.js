import React from 'react';
import {Helmet} from 'react-helmet';
import * as assets from '../../../webpack-assets';

export default (props) => {
  const helmet = Helmet.renderStatic();
  const htmlAttributes = helmet.htmlAttributes.toComponent();
  const bodyAttributes = helmet.bodyAttributes.toComponent();
  const dangerouslySetInnerHTML = {__html: props.__html};

  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {props.styleElement ? props.styleElement : null}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body {...bodyAttributes}>
        <div
          id={`app`}
          dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__=${JSON.stringify(props.state)}`
          }}
        />
        <script src={`/build/${assets.vendor.js}`} />
        <script src={`/build/${assets.app.js}`} />
      </body>
    </html>
  );
};
