import styled from 'styled-components';

export const HocWrap = styled.div`
  display: ${(props) => props.display ? props.display : 'block'};
`;
