import React from 'react';
import {
  PlusMinusQuantityWrap,
  Plus,
  Minus,
  Value,
} from './style';

export default (props) => {
  const wrapAttrs = {};
  const {className} = props;

  if (className) {
    wrapAttrs.className = className;
  }

  return (
    <PlusMinusQuantityWrap {...wrapAttrs}>
      <Minus
        onClick={onClickHandler(props, 0)}
      >
        -
      </Minus>
      <Value>{props.value}</Value>
      <Plus
        onClick={onClickHandler(props)}
      >
        +
      </Plus>
    </PlusMinusQuantityWrap>
  );
}

function onClickHandler(props, type) {
  return function (e) {
    if (type === 0) {
      props.onMinusClick(e, props.value);
    } else {
      props.onPlusClick(e, props.value);
    }
  }
}
