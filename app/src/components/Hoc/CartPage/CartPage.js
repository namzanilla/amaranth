import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import H1 from 'components/H1';
import CartDetails from './CartDetails';

export default (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.fetchCartDetails().then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  let contentJSX = null;

  if (!loading) {
    contentJSX = (
      <CartDetails
        history={props.history}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{getTitle(props.languageId, loading)}</title>
      </Helmet>
      <H1 child={getH1(props.languageId, loading)} />
      {contentJSX}
    </>
  );
}

const getTitle = (languageId, loading) => {
  if (loading) {
    return languageId === 1
      ? 'Завантаження...'
      : 'Загрузка...';
  }

  return languageId === 1
    ? 'Кошик'
    : 'Корзина';
};

const getH1 = (languageId, loading) => {
  return getTitle(languageId, loading);
};
