import styled from 'styled-components';

export const CartWrap = styled.span`
  display: inline-block;
  width: 30px;
  height: 22px;
  position: relative;
  overflow: hidden;
  &:before, &:after {
    content: '';
    position: absolute;
    background: #000;
    height: 1px;
    width: 8px;
    top: 3px;
    transform: rotate(45deg);
  }
  &:before {
    left: 25%;
    transform: rotate(-45deg);
  }
  &:after {
    right: 25%;
  }
  span:nth-child(3) {
    position: absolute;
    bottom: 0;
    height: 3px;
    background: #000;
    left: 5px;
    width: 18px;
  }
  span:nth-child(2) {
    width: inherit;
    height: 24px;
    display: inline-block;
    position: absolute;
    top: 6px;
    left: 0;
    overflow: hidden;
    border-top: 1px solid #000;
    &:before, &:after {
      content: '';
      position: absolute;
      background: #E6FFE2;
      width: 15px;
      height: 48px;
      top: -25%;
    }
    &:before {
      left: 6px; 
      transform: rotate(-16deg);
    }
    &:after {
      right: 6px;
      transform: rotate(16deg);
    }
  }
  span:nth-child(1) {
    width: inherit;
    height: 24px;
    display: inline-block;
    margin-top: 6px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 1;
    &:before, &:after {
      content: '';
      position: absolute;
      background: #000;
      width: 4px;
      height: 48px;
      top: -25%;
    }
    &:before {
      left: 5px; 
      transform: rotate(-16deg);
    }
    &:after {
      right: 5px;
      transform: rotate(16deg);
    }
  }
`;
