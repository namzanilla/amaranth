import React from 'react';
import {Helmet} from 'react-helmet';
import Categories from 'components/Categories';

export default ({history}) => {
  return (
    <>
      <Helmet>
        <title>categories title</title>
      </Helmet>
      <Categories history={history} />
    </>
  );
};
