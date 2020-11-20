import styled from 'styled-components';

export const CartDetailsWrap = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const CartDetailsGrid = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  
  @media (min-width: 959px) and (max-width: 959px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
