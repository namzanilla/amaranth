import styled from 'styled-components';

export const CategoriesWrap = styled.div`
  max-width: 1280px;
  padding: 0 20px;
  margin: 0 auto;
  background:#ddd;
  overflow: hidden;
`;

export const CategoryItem = styled.a`
  float: left;
  background-color: #eee;
  display: block;
  
  @media (max-width: 479px) {
    width: calc(50% - 10px);
    margin-right: 20px;
    :nth-child(2n) {
      margin-right: 0;
      clear: right;
    }
  }
  @media (min-width: 480px) and (max-width: 639px) {
    width: calc(100% / 3 - 40px / 3);
    margin-right: 20px;
    :nth-child(3n) {
      margin-right: 0;
      clear: right;
    }
  }
  @media (min-width: 640px) and (max-width: 799px) {
    width: calc(25% - 15px);
    margin-right: 20px;
    :nth-child(4n) {
      margin-right: 0;
      clear: right;
    }
  }
  @media (min-width: 800px) {
    width: calc(20% - 80px / 5);
    margin-right: 20px;
    :nth-child(5n) {
      margin-right: 0;
      clear: right;
    }
  }
`;

export const Image = styled.div`
  width: 100%;
  padding-bottom: 100%;
  background-color: #d2d2d2;
`;
