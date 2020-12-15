import React from 'react';
import {ProductsWrap} from './style';
import ProductItem from './ProductItem';

export default (props) => {
  const productsJSX = props.list.map((el) => {
    const key = el.modelId ? el.modelId : el.id;

    return (
      <ProductItem
        key={key}
        productId={el.id}
        name={el.name}
        image={el.image}
        images={el.images}
        hostStatic={props.hostStatic}
        price={el.price}
        priceMin={el.priceMin}
        priceMax={el.priceMax}
        modelId={el.modelId}
        history={props.history}
      />
    );
  });

  return (
    <ProductsWrap
        margin={props.margin}
    >
      {productsJSX}
    </ProductsWrap>
  );
}
