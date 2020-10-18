import React from 'react';
import {CloseWrap} from './style';

export default (props) => {
  const attrs = {};

  if (props.onClick) {
    attrs.onClick = props.onClick;
  }

  return (
    <CloseWrap {...attrs} />
  );
};
