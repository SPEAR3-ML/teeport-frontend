import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
// import { grey } from 'material-colors'

import Titlebar from './Titlebar'
import Home from './Home'
import Tasks from './Tasks'
import Task from './Task'
import About from './About'

const Frame = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #D2C295;
`

const Content = styled.div`
  position: fixed;
  width: 100%;
  top: 48px;
  bottom: 0px;
  overflow-y: auto;
`

const App = () => {
  return (
    <BrowserRouter>
      <Frame>
        <Titlebar />
        <Content>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/tasks/:taskId'>
              <Task />
            </Route>
            <Route path='/tasks'>
              <Tasks />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Content>
      </Frame>
    </BrowserRouter>
  )
}

export default App
