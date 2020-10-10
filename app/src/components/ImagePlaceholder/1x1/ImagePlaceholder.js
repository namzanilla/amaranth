import React from 'react';
import {
  ImagePlaceholderWrap,
} from './style';

export default (props) => {
  const {
    size,
    background,
    lineBackground,
  } = props;

  return (
    <ImagePlaceholderWrap
      width={size}
      height={size}
      background={background}
      lineBackground={lineBackground}
    />
  );
}
