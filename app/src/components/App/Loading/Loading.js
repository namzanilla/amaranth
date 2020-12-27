import React, {useEffect, useState} from 'react'
import Spinner from 'components/Spinner'
import {
  LoadingWrap,
  InnerLayer,
} from './style'

export default (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible !== props.isVisible) {
      setIsVisible(props.isVisible)

      if (props.isVisible) {
        
        setSpinnerIsVisible(true)
      }

      if (!props.isVisible) {
        setTimeout(() => setSpinnerIsVisible(false), 400)
      }
    }
  }, [props.isVisible])

  return (
    <LoadingWrap
      visibility={props.isVisible ? 'visible' : 'hidden'}
    >
      <InnerLayer
        opacity={props.isVisible ? 1 : 0}
      >
        {spinnerIsVisible ? <Spinner /> : null}
      </InnerLayer>
    </LoadingWrap>
  )
}
