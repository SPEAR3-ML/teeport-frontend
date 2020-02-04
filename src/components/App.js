import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import About from './About'
import { selectCount } from '../redux/selectors'
import { increaseCount } from '../redux/actions'

const AppDiv = styled.div`
  text-align: center;
`

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const AppLink = styled.a`
  color: #09d3ac;
`

const App = () => {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`
  })

  return (
    <BrowserRouter>
      <AppDiv>
        <AppHeader>
          <p>
            Welcome to SPEAR3 ML Platform
          </p>
          <AppLink
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Algorithm Monitor
          </AppLink>
          <Link to='/about'>About</Link>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
          </Switch>
          <div>
            <p>You clicked {count} times</p>
            <button onClick={() => dispatch(increaseCount())}>
              Click me
            </button>
          </div>
        </AppHeader>
      </AppDiv>
    </BrowserRouter>
  )
}

export default App
