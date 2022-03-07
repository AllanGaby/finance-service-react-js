import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body { height: 100%;}

  body {    
    background-color: ${props => props.theme.backgroud};
    color: ${props => props.theme.text};
    overflow-x: none;
  }

  * { 
    border: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
  }

  button {
    cursor: pointer;
    background-color: transparent;
  }

  textarea:focus, input:focus{
    outline: none;
  }  
    
`
