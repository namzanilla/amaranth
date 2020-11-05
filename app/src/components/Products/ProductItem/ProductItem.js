import React from 'react';
import {ProductItemWrap} from './style';

export default (props) => {
  const {
    imageSrc,
    productId,
    languageId,
    name,
    price,
    history,
  } = props;

  return (
    <ProductItemWrap>
      <div>

      </div>
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

