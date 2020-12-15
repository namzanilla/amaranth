import styled from 'styled-components';

export const ProductItemWrap = styled.div`
  background: #ffe2e4;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  font-size: 14px;
  position: relative;
  padding-bottom: 33px;
  a.name {
    display: block;
    padding: 16px;
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
    &.productFooter {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &.modelFooter {
      position: absolute;
      z-index: 1;
      height: 32px;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      border-bottom: 1px solid #ffe2e4;
      display: flex;
      align-items: center;
      padding: 0 16px;
      justify-content: flex-end;
      > span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden; 
      }
    }
  }
  .price {
    font-size: 14px;
    font-style: italic;
    color: #FF747E;
  }
`;
