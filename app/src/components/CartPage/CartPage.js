import React from 'react';
import {Helmet} from 'react-helmet';
import H1 from 'components/H1';

export default (props) => {
  return (
    <>
      <Helmet>
        <title>cart title</title>
      </Helmet>
      <H1 child={getH1(props.languageId)} />
    </>
  );
}

const getH1 = (languageId) => {
  if (1 === languageId) {
    return 'Кошик';
  } else if (2 === languageId) {
    return 'Корзина';
  }
};
