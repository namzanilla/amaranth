import styled from 'styled-components';

export const AggsWrap = styled.div`

`;

export const AggItemsWrap = styled.div`
  
`;

export const AggItems = styled.div`
  
`;

export const AggItem = styled.a`
  display: inline-block;
  margin: 4px 4px 0 0;
  border-radius: 4px;
  background: ${props => props.isActive ? '#FFA5AC' : '#FFE2E4'};
  padding: 4px;
  color: #000;
  
`;
