import styled from 'styled-components';

export const PaginationWrap = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  ul {
    list-style-type: none;
    display: inline-block;
  }
  li {
    display: inline-block;
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
  a {
    font-size: 13px;
    color: #FFA5AC;
    font-weight: bold;
    display: block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    &:hover {
      background: #FFE2E4;
      color: #000;
    }
    &.active {
      color: #000;
      cursor: default;
      background: #FFA5AC;
    }
  }
`;
