import React from 'react';
import {
  ModelImagesWrap,
  MainImage,
} from './style';

export default(props) => {
  if (!props.images || !props.images.length) {
    return (
      <ModelImagesWrap>
        <MainImage />
      </ModelImagesWrap>
    );
  }

  const {
    0: {
      path,
      name,
      ext,
    } = {},
  } = props.images;

  const imgSrc = `${props.hostStatic}/${path}/${name}_480x480.${ext}`;

  return (
    <ModelImagesWrap>
      <MainImage>
        <img src={imgSrc} alt=""/>
      </MainImage>
    </ModelImagesWrap>
  );
}
