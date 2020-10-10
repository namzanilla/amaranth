import styled from 'styled-components';

export const OverlayWrap = styled.div`
  position: fixed;
  display: ${props => props.display || 'none'};
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.5);
`;
