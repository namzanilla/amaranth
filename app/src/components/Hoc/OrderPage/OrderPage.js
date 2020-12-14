import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {ContentWrap} from './style';
import H1 from 'components/H1';
import {isPlainObject} from 'helpers/_Object';
import {getLoadingText} from 'helpers/language';

export default (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    props.fetchOrder(props.orderId, props.orderHash)
      .then((result) => {
        onFetchOrder(props, result, setLoading, setError);
      }).catch(() => {
        onFetchOrder(props, undefined, setLoading, setError);
      });
  }, []);

  let contentJSX;

  if (loading) {
    contentJSX = null;
  } else {
    if (error) {
      // @todo error
    } else {
      contentJSX = (
        <ContentWrap>
          {getTranslate(0, props.languageId)}: {props.orderAmount} грн.
        </ContentWrap>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>{getTitle(loading, props.languageId, props.orderId)}</title>
      </Helmet>
      <H1
        child={getH1(loading, props.languageId, props.orderId)}
      />
      {contentJSX}
    </>
  );
};

function onFetchOrder(props, result, setLoading, setError) {
  if (!isPlainObject(result)) {
    setError(true);
    setLoading(false);

    return false;
  }

  const {amount} = result;

  if (!amount) {
    setError(true);
    setLoading(false);

    return false;
  } else {
    setLoading(false);
  }
}

function getTranslate(type, languageId) {
  if (type === 0) {
    return languageId === 1
      ? 'Сума замовлення'
      : 'Сумма заказа';
  }
}

function getTitle(loading, languageId, orderId) {
  if (loading) {
    return getLoadingText(languageId);
  } else {
    return languageId === 1
      ? `Замовлення #${orderId}`
      : `Заказ #${orderId}`;
  }
}

function getH1(loading, languageId, orderId) {
  return getTitle(loading, languageId, orderId);
}
