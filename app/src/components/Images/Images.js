import React from 'react'
import {
  ImagesWrap,
  Image
} from './style'

export default(props) => {
  if (!props.images || !props.images.length) {
    return (
      <ImagesWrap>
        <Image />
      </ImagesWrap>
    )
  }

  const {
    0: {
      path,
      name,
      ext,
    } = {},
  } = props.images

  const imgSrc = `${props.hostStatic}/${path}/${name}_480x480.${ext}`

  return (
    <ImagesWrap>
      <Image>
        <img src={imgSrc} alt=""/>
      </Image>
    </ImagesWrap>
  )
}
