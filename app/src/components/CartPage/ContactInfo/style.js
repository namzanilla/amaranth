import styled from 'styled-components';

export const ContactInfoWrap = styled.div`
  //padding: 20px;
  border-radius: 4px;
  //background: #eee;
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
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      >div:first-child {
        width: 100px;
      }
      >div:last-child {
        width: 100%;
      }
    }
  }
`;

export const ContactInfoHeader = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 20px;
`;
