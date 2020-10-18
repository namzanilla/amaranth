import styled from 'styled-components';

export const CloseWrap = styled.span`
  cursor: pointer;
  width: 10px;
  height: 10px;
  position: relative;
  overflow: hidden;
  display: inline-block;
  &:before, &:after {
    content: '';
    position: absolute;
    width: 200%;
    height: 2px;
    background: #000;
    left: -50%;
    top: 50%;
    margin-top: -1px;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;
