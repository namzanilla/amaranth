import React, {useEffect} from 'react';
import {ProductsWrap} from './style';
import ProductItem from './ProductItem';

export default (props) => {
  useEffect(() => {
    props.productsSetDidUnmount(false);

    return () => {
      props.productsSetDidUnmount(true);
      props.productsSetInitialState();
    }
  }, []);

  const productsJSX = props.list.map((el) => {
    const {
      id,
      name,
      price,
    } = el;

    return (
      <ProductItem
        key={id}
        productId={id}
        languageId={props.languageId}
        name={name}
        price={price}
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
