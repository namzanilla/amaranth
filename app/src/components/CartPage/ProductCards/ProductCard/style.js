import styled from 'styled-components';

export const ProductCardWrap = styled.div`
  border-radius: 4px;
  position: relative;
  display: flex;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .quantity {
    position: absolute;
    left: 140px;
    bottom: 0;
  }
  .image {
    width: 120px;
    min-width: 120px;
    height: 120px;
    background-color: #ddd;
    margin-right: 20px;
    border-radius: 4px 0 0 4px;
  }
  .price {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .name {
    font-size: 12px;
    margin-top: 20px;
  }
  .close {
    
  }
`;
