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
      image,
    } = el;

    return (
      <ProductItem
        key={id}
        productId={id}
        name={name}
        image={image}
        hostStatic={props.hostStatic}
        price={price}
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
