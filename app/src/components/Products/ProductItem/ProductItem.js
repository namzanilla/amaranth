import React from 'react';
import {ProductItemWrap} from './style';

export default (props) => {
  const {
    productId,
    languageId,
    name,
    price,
    history,
  } = props;

  return (
    <ProductItemWrap>
      <a
        href={getHref(productId, languageId)}
        onClick={onClick(productId, languageId, history)}
      >
        {name}
      </a>
    </ProductItemWrap>
  );
}

const getHref = (productId, languageId) => {
  return languageId === 1 ? `/p${productId}` : `/ru/p${productId}`;
}

const onClick = (productId, languageId, history) => (e) => {
  e.preventDefault();

  history.push({
    pathname: getHref(productId, languageId),
    search: '',
  });
}

