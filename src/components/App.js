import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import Home from './Home'
import About from './About'

const AppDiv = styled.div`
  text-align: center;
`

const App = () => {
  return (
    <BrowserRouter>
      <AppDiv>
        <Link to='/about'>About</Link>
        <Link to='/'>Home</Link>
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </AppDiv>
    </BrowserRouter>
  )
}

export default App
