import React from 'react';
import {ButtonWrap} from './style';

export default (props) => {
  return (
    <ButtonWrap
      onClick={(e) => {
        props.onClick ? props.onClick(e) : e.preventDefault();
      }}
    >
      {props.children}
    </ButtonWrap>
  );
}
