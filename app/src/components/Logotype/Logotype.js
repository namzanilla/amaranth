import React from 'react';
import {
  LogotypeWrap,
} from './style';

export default (props) => {
  const {background} = props;

  return (
    <LogotypeWrap
      background={background}
    >
      <span>f</span>
      <span>r</span>
      <span>u</span>
      <span>c</span>
      <span>t</span>
      <span>u</span>
      <span>s</span>
    </LogotypeWrap>
  );
}
