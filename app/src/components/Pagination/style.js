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
    display: block;
    padding: 8px 20px;
    background: #FFA5AC;
    color: #000;
    border-radius: 4px;
    &.active {
      background: #eee;
      cursor: default;
    }
  }
`;
