import styled from 'styled-components';

export const CategoriesWrap = styled.div`
  max-width: 1280px;
  padding: 0 20px;
  margin: 0 auto;
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
  text-align: center;
  span {
    display: block;
    padding: 16px 0;
    background: #ffe2e4;
    border-radius: 0 0 4px 4px;
    color: #000;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export const Image = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: #d2d2d2;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
  img {
    top: 0;
    left: ${(props) => props.left};
    bottom: 0;
    height: 100%;
    position: absolute;
  }
`;
