import styled from 'styled-components';

export const ContactInfoWrap = styled.div`
  border-radius: 4px;
  input {
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0 8px;
    height: 40px;
    line-height: 40px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #FFA5AC; 
  }
  .form {
    >div {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      align-items: center;
    }
  }
`;

export const ContactInfoHeader = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 20px;
`;
