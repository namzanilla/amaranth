import React from 'react';
import {
  ImagePlaceholderWrap,
} from './style';

export default (props) => {
  const {
    size,
    background,
    borderRadius,
    lineBackground,
  } = props;

  return (
    <ImagePlaceholderWrap
      width={size}
      height={size}
      borderRadius={borderRadius}
      background={background}
      lineBackground={lineBackground}
    />
  );
}
