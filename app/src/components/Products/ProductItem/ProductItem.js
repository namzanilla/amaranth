import React from 'react';
import {ProductItemWrap} from './style';

export default (props) => {
  const {
    productId,
    languageId,
    name,
    price,
  } = props;

  return (
    <ProductItemWrap>
      {name}
    </ProductItemWrap>
  );
}
