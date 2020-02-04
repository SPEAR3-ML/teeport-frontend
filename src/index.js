import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

// import './index.css'
import App from './components/App'
import store from './redux/store'

import * as serviceWorker from './utils/serviceWorker'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`

render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
