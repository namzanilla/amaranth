import styled from 'styled-components';

export const LoadingWrap = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 901;
  visibility: ${(props) => props.visibility};
  transition: visibility .3s linear 0s;
`;

export const InnerLayer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, .7);
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 901;
  opacity: ${(props) => props.opacity};
  transition: opacity .3s linear;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -32px;
    margin-left: -32px;
  }
`;
