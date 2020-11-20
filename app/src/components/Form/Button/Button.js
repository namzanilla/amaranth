import React from 'react';
import {ButtonWrap} from './style';

export default (props) => {
  return (
    <ButtonWrap>
      {props.children}
    </ButtonWrap>
  );
}
