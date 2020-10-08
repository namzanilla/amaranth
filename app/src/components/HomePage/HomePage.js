import React from 'react';
import {Helmet} from 'react-helmet';
import Header from 'components/Header';

export default (props) => {
  const {history} = props;

  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Header
        history={history}
      />
      <button
        onClick={() => {
          history.push('/io');
        }}
      >Click</button>
    </>
  );
};
