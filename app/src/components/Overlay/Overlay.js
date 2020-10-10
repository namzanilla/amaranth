import React from 'react';
import {
  OverlayWrap,
} from './style';

export default (props) => {
  const {isVisible} = props;
  const display = isVisible ? 'block' : 'none';

  return (
    <OverlayWrap
      display={display}
      onClick={overlayOnClick(props)}
    />
  );
}

const overlayOnClick = (props) => {
  return () => {
    props.hide();
  };
}
