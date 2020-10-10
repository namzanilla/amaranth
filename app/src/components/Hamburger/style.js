import styled from 'styled-components';

export const HamburgerWrap = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  overflow: hidden;
  &:before, &:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background: #000;
  }
  &:before {
    top: 30%;
  }
  &:after {
    bottom: 30%;
  }
`;
