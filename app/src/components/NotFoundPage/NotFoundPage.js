import React from 'react';
import {Helmet} from 'react-helmet';
import Header from 'components/Header';

export default (props) => {
  const {history} = props;

  return (
    <>
      <Helmet>
        <title>NotFoundPage</title>
      </Helmet>
      <Header
        history={history}
      />

    </>
  );
};
