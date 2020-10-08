import styled from 'styled-components';

export const Wrap = styled.header`
  max-width: 1280px;
  margin: 0 auto;
  background: #eee;
  display: flex;
  justify-content: space-between;
  > * {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
  }
`;
