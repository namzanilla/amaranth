import React from 'react';
import {
  OverlayWrap,
} from './style';

export default (props) => {
  const {isVisible} = props;
  const display = isVisible ? 'block' : 'none';
  const attrs = {display};

  if (props.onClick) {
    attrs.onClick = props.onClick;
  }

  return (
    <OverlayWrap
      {...attrs}
    />
  );
}
