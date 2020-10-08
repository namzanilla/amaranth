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
          props.dispatch({
            type: 'APP_SET_HOC',
            payload: 'HomePage',
          });
        }}
      >Home</button>
    </>
  );
};
