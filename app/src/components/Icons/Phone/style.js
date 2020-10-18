import styled from 'styled-components';

export const PhoneWrap = styled.span`
  display: inline-block;
  width: 15px;
  height: 30px;
  position: relative;
  background: #73FEEF;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #000;
  &:before, &:after {
    content: '';
    position: absolute;
  }
  &:before {
    width: 2px;
    height: 2px;
    background: #000;
    border-radius: 50%;
    left: 50%;
    margin-left: -1px;
    bottom: 1px;
  }
  &:after {
    width: 4px;
    height: 1px;
    background: #000;
    top: 1px;
    left: 50%;
    margin-left: -2px;
  }
`;
