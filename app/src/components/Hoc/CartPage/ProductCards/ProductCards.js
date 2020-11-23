import React from 'react';
import ProductCard from './ProductCard';
import {ProductCardsWrap} from './style';

export default (props) => {
  const {list = []} = props;

  return (
    <ProductCardsWrap>
      {list.map((el) => {
        const {
          id,
          name,
          count,
          price,
        } = el;

        return (
          <ProductCard
            key={id}
            productId={id}
            name={name}
            count={count}
            price={price}
          />
        );
      })}
    </ProductCardsWrap>
  );
}
