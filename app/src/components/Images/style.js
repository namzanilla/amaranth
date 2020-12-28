import styled from 'styled-components'

export const ImagesWrap = styled.div`
  max-width: 480px;
`

export const Image = styled.div`
  padding-bottom: 100%;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
`
