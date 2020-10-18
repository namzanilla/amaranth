import styled from 'styled-components';

export const SwitchLanguageWrap = styled.div`
  display: inline-flex;
  background: ${props => props.background || '#fff'};
  border-radius: 4px;
  height: 30px;
  width: 40px;
  justify-content: center;
  align-items: center;
  color: silver;
  a {
    color: #000;
    text-transform: uppercase;
    font-size: 10px;
    text-decoration: none;
    &.active {
      display: none;
    }
  }
`;
