import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'

import About from './About'

const App = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`
  })

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to SPEAR3 ML Platform
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Algorithm Monitor
          </a>
          <Link to='/about'>About</Link>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
          </Switch>
          <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
              Click me
            </button>
          </div>
        </header>
      </div>
    </BrowserRouter>
  )
}

export default App
