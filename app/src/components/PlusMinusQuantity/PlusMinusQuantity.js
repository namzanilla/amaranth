import React from 'react';
import {
  PlusMinusQuantityWrap,
  Plus,
  Minus,
  Value,
} from './style';

export default (props) => {
  return (
    <PlusMinusQuantityWrap>
      <Minus
        onClick={onClickHandler(props.value)}
      >
        -
      </Minus>
      <Value>{props.value}</Value>
      <Plus
        onClick={onClickHandler(props.value)}
      >
        +
      </Plus>
    </PlusMinusQuantityWrap>
  );
}

function onClickHandler(value, props, type) {
  return function (e) {
    e.preventDefault();

    if (type === 0) {
      props.onPlusClick(value);
    } else {
      props.onMinusClick(value);
    }
  }
}
