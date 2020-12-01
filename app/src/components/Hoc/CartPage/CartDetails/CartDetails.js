import React from 'react';
import ContactInfo from '../ContactInfo';
import Button from 'components/Form/Button';
import ProductCards from './../ProductCards';
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
        <ProductCards
          history={props.history}
        />
        <div>
          {getTotalPriceText(props.languageId)}: {props.totalPrice} грн.
        </div>
        <div>
          <Button
            onClick={createOrderButtonOnClick(props)}
          >
            {getOrderButtonText(props.languageId)}
          </Button>
        </div>
      </CartDetailsGrid>
    </CartDetailsWrap>
  );
}

function createOrderButtonOnClick(props) {
  return (e) => {
    e.preventDefault();

    props.createOrder().then((result = {}) => {
      const {orderId, orderHash} = result;

      if (orderId) {
        props.setCartInitialState();

        props.history.push({
          pathname: props.languageId === 1
            ? `/order/${orderId}/${orderHash}`
            : `/ru/order/${orderId}/${orderHash}`,
          search: '',
        });
      }
    });
  }
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
