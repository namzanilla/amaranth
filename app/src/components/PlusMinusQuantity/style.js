import styled from 'styled-components';

export const PlusMinusQuantityWrap = styled.div`
  display: flex;
  >* {
    box-sizing: border-box;
    width: 32px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    font-size: 16px;
  }
`;

export const Plus = styled.button`
  background-color: #86FE73;
  border: 1px solid #000;
  color: #000;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
`;

export const Minus = styled.button`
  background-color: #FF747E;
  border: 1px solid #000;
  color: #000;
  border-radius: 4px 0 0 4px;
  
  cursor: pointer;
`;

export const Value = styled.div`
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background: #fff;
  color: #000;
  font-size: 13px;
`;
