import React from 'react';
import {ProductCardWrap} from './style';
import PlusMinusQuantity from 'components/PlusMinusQuantity';

export default (props) => {
  return (
    <ProductCardWrap>
      <div className="image" />
      <div className="name">{props.name}</div>
      <div className="price">{props.count * props.price}&nbsp;грн</div>
      <PlusMinusQuantity
        value={props.count}
        className="quantity"
        onMinusClick={onQuantityClickEvent(true, props)}
        onPlusClick={onQuantityClickEvent(false, props)}
      />
      <div className="close" />
    </ProductCardWrap>
  );
}

const onQuantityClickEvent = (isMinus, props) => (e, value) => {
  e.preventDefault();

  if (isMinus && value === 1) return false;

  const data = {[props.productId]: 1};

  isMinus
    ? props.removeFromCart(data)
    : props.addIntoCart(data);
}
