import styled from 'styled-components';

export const HamburgerWrap = styled.a`
  display: inline-flex;
  width: 40px;
  height: 40px;
  background: #FFCBA5;
  justify-content: center;
  align-items: center;
`;

export const SubHeaderWrap = styled.div`
  background-color: #FFA5AC;
  position: sticky;
  top: 0;
  >div {
    max-width: 1280px;
    padding: 0 20px;
    height: 40px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
