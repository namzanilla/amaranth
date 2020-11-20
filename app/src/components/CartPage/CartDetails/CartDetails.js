import React from 'react';
import ContactInfo from '../ContactInfo';
import Button from 'components/Form/Button';
import ProductCards from '../ProductCards';
import {
  CartDetailsWrap,
  CartDetailsGrid,
} from './style';

export default (props) => {
  if (!props.totalPrice) {
    return (
      <CartDetailsWrap>
        {getEmptyCartText(props.languageId)}
      </CartDetailsWrap>
    );
  }

  return (
    <CartDetailsWrap>
      <CartDetailsGrid>
        <ContactInfo />
        <ProductCards />
        <div>
          {getTotalPriceText(props.languageId)}: {props.totalPrice} грн.
        </div>
        <div>
          <Button>{getOrderButtonText(props.languageId)}</Button>
        </div>
      </CartDetailsGrid>
    </CartDetailsWrap>
  );
}

function getEmptyCartText(languageId) {
  return languageId === 1
    ? 'Ваш кошик порожній'
    : 'Ваша корзина пуста';
}

function getTotalPriceText(languageId) {
  return languageId === 1
    ? 'Сума замовлення'
    : 'Сумма заказа';
}

function getOrderButtonText(languageId) {
  return languageId === 1
    ? 'Оформити замовлення'
    : 'Оформить заказ';
}
