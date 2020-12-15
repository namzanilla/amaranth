import React from 'react';
import {ProductCardWrap} from './style';
import PlusMinusQuantity from 'components/PlusMinusQuantity';
import CloseIcon from 'components/Icons/Close';

export default (props) => {
  return (
    <ProductCardWrap>
      <a className="image"
        href={getProductHref(props)}
        onClick={productOnClick(props)}
      >
        {props.thumbSrc ? <img src={props.thumbSrc} alt=""/> : null}
      </a>
      <a
        className="name"
        href={getProductHref(props)}
        onClick={productOnClick(props)}
      >
        {props.name}
      </a>
      <div className="price">{props.priceTotalStr}&nbsp;грн</div>
      <PlusMinusQuantity
        value={props.count}
        className="quantity"
        onMinusClick={onQuantityClickEvent(true, props)}
        onPlusClick={onQuantityClickEvent(false, props)}
      />
      <CloseIcon
        className="close"
        onClick={closeOnClick(props)}
      />
    </ProductCardWrap>
  );
}

function closeOnClick(props) {
  return function(e) {
    e.preventDefault();

    const data = {[props.productId]: -1};

    props.removeFromCart(data);
  }
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
