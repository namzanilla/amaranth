import styled from 'styled-components';

export const SwitchLanguageWrap = styled.div`
  display: inline-flex;
  background: ${props => props.background || '#fff'};
  box-sizing: border-box;
  padding: 0 8px;
  border-radius: 4px;
  height: 30px;
  width: 80px;
  justify-content: space-between;
  align-items: center;
  color: silver;
  a {
    color: #000;
    text-transform: uppercase;
    font-size: 10px;
    text-decoration: none;
    &.active {
      color: silver;
      cursor: default;
    }
  }
`;
