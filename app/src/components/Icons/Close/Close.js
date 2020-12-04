import React from 'react';
import {CloseWrap} from './style';

export default (props) => {
  const attrs = {};

  if (props.onClick) {
    attrs.onClick = props.onClick;
  }

  if (props.className) {
    attrs.className = props.className;
  }

  return (
    <CloseWrap {...attrs} />
  );
};
