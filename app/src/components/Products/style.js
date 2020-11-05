import styled from 'styled-components';

export const ProductsWrap = styled.div`
  max-width: 1280px;
  margin: ${(props) => props.margin ? props.margin : '0 auto'};
  padding: 0 20px;
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  
  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 640px) and (max-width: 959px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
