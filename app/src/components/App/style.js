import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  html {
  	font-size: 16px;
  }
  html, body {
  	height: 100%;
  }
  html, body, ul, li {
  	margin: 0;
  	padding: 0;
  }
  a {
    text-decoration: none;
  }
  body {
    background-color: #fff;
    color: #000;
    font: normal normal normal 1em/1.5 arial, sans-serif;
  }
`;
