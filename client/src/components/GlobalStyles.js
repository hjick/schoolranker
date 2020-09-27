import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../index.css";

const GlobalStyles = createGlobalStyle`
    ${reset};
   

    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        padding: 0;
        margin: 0;
        box-sizing:border-box;
    }
    body {
        color: #424242;
        font-family: 'Roboto','Noto Sans KR', sans-serif;
        font-weight: 300;
    }
   input,button {
       outline: none;
       font-family: 'Roboto','Noto Sans KR', sans-serif;
       font-weight: 400;
   }
    
   
    `;
export default GlobalStyles;
