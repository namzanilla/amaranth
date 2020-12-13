import React from 'react';
import {ProductItemWrap} from './style';

export default (props) => {
  const {
    hostStatic,
    image,
    productId,
    languageId,
    name,
    price,
    priceMin,
    priceMax,
    modelId,
    history,
  } = props;

  let imageJSX;
  if (image) {
    imageJSX = (
      <a
        href={getHref(productId, languageId)}
        onClick={onClick(productId, languageId, history)}
        className="image"
      >
        <img src={`${hostStatic}${image}`} alt="" />
      </a>
    );
  } else {
    imageJSX = (
      <a
        href={getHref(productId, languageId)}
        onClick={onClick(productId, modelId, languageId, history)}
        className="image"
      />
    );
  }

  let footerJSX;

  if (modelId) {
    footerJSX = (
      <div className="modelFooter">
        от <span className="price">{priceMin}</span>
        &nbsp;до <span className="price">{priceMax}</span>
        &nbsp;грн
      </div>
    );
  } else {
    const {[productId]: inCart} = props.products;
    const buttonText = getButtonText(languageId, inCart);
    const buttonAttrs = getButtonAttrs(languageId, inCart, productId, props);

    footerJSX = (
      <div className="productFooter">
        <span className="price">
          {price} <span>грн</span>
        </span>
        <button
          {...buttonAttrs}
        >
          {buttonText}
        </button>
      </div>
    );
  }

  return (
    <ProductItemWrap>
      {imageJSX}
      <a
        href={getHref(productId, modelId, languageId)}
        onClick={onClick(productId, modelId,  languageId, history)}
        className="name"
      >
        {name}
      </a>
      {footerJSX}
    </ProductItemWrap>
  );
}

function getButtonAttrs(languageId, inCart, productId, props) {
  const buttonAttrs = {};
  buttonAttrs.onClick = addIntoCart(productId, props);

  if (inCart) {
    buttonAttrs.className = 'active';
  }

  return buttonAttrs;
}

function getButtonText(languageId, inCart) {
  if (inCart) {
    return languageId === 1 ? 'В кошику' : 'В корзине';
  } else {
    return languageId === 1 ? 'Купити' : 'Купить';
  }
}

const getHref = (productId, modelId, languageId) => {
  if (productId) {
    return languageId === 1 ? `/p${productId}` : `/ru/p${productId}`;
  }

  return languageId === 1 ? `/m${modelId}` : `/ru/m${modelId}`;
}

const onClick = (productId, modelId, languageId, history) => (e) => {
  e.preventDefault();

  history.push({
    pathname: getHref(productId, modelId, languageId),
    search: '',
  });
}

const addIntoCart = (productId, props) => (e) => {
  e.preventDefault();

  props.addIntoCart({[productId]: 1}, props.sessionValue);
}
