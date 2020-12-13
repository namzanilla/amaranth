import React from 'react';
import {ProductsWrap} from './style';
import ProductItem from './ProductItem';

export default (props) => {
  const productsJSX = props.list.map((el) => {
    const key = el.brand_model_id ? el.brand_model_id : el.id;

    return (
      <ProductItem
        key={key}
        productId={el.id}
        name={el.name}
        image={el.image}
        hostStatic={props.hostStatic}
        price={el.price}
        priceMin={el.price_min}
        priceMax={el.price_max}
        modelId={el.brand_model_id}
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
