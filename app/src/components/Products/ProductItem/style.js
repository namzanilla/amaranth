import styled from 'styled-components';

export const ProductItemWrap = styled.div`
  //background: #eee;
  border-radius: 4px;
  overflow: hidden;
  a.name {
    display: block;
    font-size: 14px;
    margin: 16px 0;
    color: #000;
  }
  a.image {
    display: block;
    padding-bottom: 100%;
    background-color: #eee;
    position: relative;
    img {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
    }
  }
  >div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .price {
    font-size: 24px;
    font-weight: bold;
    span {
      font-size: 12px;
      font-weight: normal;
    }
  }
`;
