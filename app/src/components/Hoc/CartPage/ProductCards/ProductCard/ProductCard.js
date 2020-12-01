import React from 'react';
import {ProductCardWrap} from './style';
import PlusMinusQuantity from 'components/PlusMinusQuantity';

export default (props) => {
  return (
    <ProductCardWrap>
      <a className="image"
        href={getProductHref(props)}
        onClick={productOnClick(props)}
      />
      <div className="name">
        <a
          href={getProductHref(props)}
          onClick={productOnClick(props)}
        >
          {props.name}
        </a>
      </div>
      <div className="price">{props.priceTotalStr}&nbsp;грн</div>
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

function productOnClick(props) {
  return function (e) {
    e.preventDefault();

    const pathname = getProductHref(props);

    props.history.push({
      pathname,
      search: '',
    });
  }
}

function getProductHref(props) {
  return props.languageId === 1
    ? `/p${props.productId}`
    : `/ru/p${props.productId}`;
}

const onQuantityClickEvent = (isMinus, props) => (e, value) => {
  e.preventDefault();

  if (isMinus && value === 1) return false;

  const data = {[props.productId]: 1};

  isMinus
    ? props.removeFromCart(data)
    : props.addIntoCart(data);
}
