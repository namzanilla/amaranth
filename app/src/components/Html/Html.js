import React from 'react';
import {Helmet} from 'react-helmet';
import * as assets from '../../../webpack-assets';

export default (props) => {
  const helmet = Helmet.renderStatic();
  const htmlAttributes = helmet.htmlAttributes.toComponent();
  const bodyAttributes = helmet.bodyAttributes.toComponent();
  const dangerouslySetInnerHTML = {__html: props.__html};
  const {
    app: {
      hostStatic,
    } = {},
  } = props.state;

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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
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
        <script src={`${hostStatic}/js/build/${assets.vendor.js}`} />
        <script src={`${hostStatic}/js/build/${assets.app.js}`} />
      </body>
    </html>
  );
};
