import styled from 'styled-components';

export const SwitchLanguageWrap = styled.a`
  display: inline-flex;
  background: ${props => props.background || '#fff'};
  border-radius: 4px;
  height: 30px;
  width: 40px;
  color: #000;
  text-transform: uppercase;
  font-size: 10px;
  justify-content: center;
  align-items: center;
`;
