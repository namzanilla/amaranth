import React from 'react';
import {Helmet} from 'react-helmet';
import Categories from 'components/Categories';
import H1 from 'components/H1';

export default (props) => {
  return (
    <>
      <Helmet>
        <title>categories title</title>
      </Helmet>
      <H1
        child={getH1(props.languageId)}
      />
      <Categories history={props.history} />
    </>
  );
};

const getH1 = (languageId) => {
  if (1 === languageId) {
    return 'Каталог товарів';
  } else if (2 === languageId) {
    return 'Каталог товаров';
  }
};
