import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background:  #151922;
    color: #FFF;
    width: 100vw;
    height: 100vh;

    > div {
      display: flex;
    }
  }

  body, input, button {
    font-family: Nunito, sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }

  button {
    cursor: pointer;
  }
`
