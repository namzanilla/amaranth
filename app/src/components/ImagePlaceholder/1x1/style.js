import styled from 'styled-components';

export const ImagePlaceholderWrap = styled.div`
  width: ${props => props.width || '200px'};
  height: ${props => props.height || '200px'};
  background: ${props => props.background || '#ddd'};
  position: relative;
  margin-left: 300px;
  overflow: hidden;
  border-radius: ${props => props.borderRadius || 'unset'};
  &:before, &:after {
    content: '';
    position: absolute;
    width: 200%;
    height: 2px;
    background: ${props => props.lineBackground || '#eee'};
    top: 50%;
    margin-top: -1px;
    left: -50%;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;
