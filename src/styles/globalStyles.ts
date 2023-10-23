import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: "Noe Display";
  src: url("../fonts/FontsFree-Net-Noe-Display-Medium.ttf");
  }
  body {
    color: #242424;
    margin: 0;
    padding: 0;
    font-size:14px;
    font-family: "DM Sans", "Lora", Helvetica, Sans-Serif;
    min-height: 100vh;
  }

  input {
  outline: none;
  }
`;

export default GlobalStyle;
