import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Noe Display";
  src: url("../fonts/FontsFree-Net-Noe-Display-Medium.ttf");
}
  body {
    margin: 0;
    padding: 0;
    font-size:14px;
    font-family: "Lora", Helvetica, Sans-Serif;
  }
`;

export default GlobalStyle;
