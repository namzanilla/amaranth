import styled from 'styled-components';

export const LogotypeWrap = styled.span`
  width: 80px;
  background: ${props => props.background || '#fff'};
  height: 30px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  font-size: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  text-decoration: inherit;
  color: #000;
  text-transform: uppercase;
`;
