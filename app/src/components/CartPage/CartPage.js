import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import H1 from 'components/H1';
import CartDetails from './CartDetails';

export default (props) => {
  useEffect(() => {
    props.fetchCartDetails();
  }, []);

  return (
    <>
      <Helmet>
        <title>{getH1(props.languageId)}</title>
      </Helmet>
      <H1 child={getH1(props.languageId)} />
      <CartDetails />
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
