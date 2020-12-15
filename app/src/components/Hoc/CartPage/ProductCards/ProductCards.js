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
          images = [],
          priceTotalStr,
        } = el;

        const [image] = images;
        let thumbSrc;

        if (image) {
          const {
            path,
            name,
            ext,
          } = image;

          thumbSrc = `${props.hostStatic}/${path}/${name}_320x320.${ext}`;
        }

        return (
          <ProductCard
            key={id}
            productId={id}
            name={name}
            thumbSrc={thumbSrc}
            count={count}
            history={props.history}
            priceTotalStr={priceTotalStr}
          />
        );
      })}
    </ProductCardsWrap>
  );
}
