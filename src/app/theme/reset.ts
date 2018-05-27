import {injectGlobal} from 'styled-components'

export const reset = () => {
  return injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    * {
      box-sizing: border-box;
    }
    body {
      font-family: Roboto, sans-serif;
      margin: 0;
      padding: 0;
    }
  `
}
