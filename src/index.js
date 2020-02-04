import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import App from './components/App'
import store from './redux/store'

import * as serviceWorker from './utils/serviceWorker'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
