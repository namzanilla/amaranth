import styled from 'styled-components';

export const CategoriesWrap = styled.div`
  max-width: 1280px;
  padding: 0 20px;
  margin: 0 auto;
  background:#ddd;
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

export const CategoryItem = styled.a`
  background-color: #eee;
`;

export const Image = styled.div`
  width: 100%;
  padding-bottom: 100%;
  background-color: #d2d2d2;
`;
