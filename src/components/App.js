import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
// import { grey } from 'material-colors'

import Titlebar from './Titlebar'
import Home from './Home'
import Tasks from './Tasks'
import Task from './Task'
import TaskComparison from './TaskComparison'
import TaskBenchmark from './TaskBenchmark'
import Optimizers from './Optimizers'
import Evaluators from './Evaluators'
import Processors from './Processors'
import About from './About'
import useTasks from '../hooks/useTasks'
import useClients from '../hooks/useClients'
import { yellow } from '../plugins/slacPalette'

const Frame = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: ${yellow.normal};
`

const Content = styled.div`
  position: fixed;
  width: 100%;
  top: 48px;
  bottom: 0px;
`

const App = () => {
  const [tasks, sendMessageAsTaskManager] = useTasks()
  const [clients, sendMessageAsClientManager] = useClients()

  return (
    <BrowserRouter basename='/teeport'>
      <Frame>
        <Titlebar />
        <Content>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/tasks/comparison'>
              <TaskComparison />
            </Route>
            <Route path='/tasks/benchmark/:taskGroupId'>
              <TaskBenchmark />
            </Route>
            <Route path='/tasks/:taskId'>
              <Task />
            </Route>
            <Route path='/tasks'>
              <Tasks
                tasks={tasks} sendMessageAsTaskManager={sendMessageAsTaskManager}
                clients={clients} sendMessageAsClientManager={sendMessageAsClientManager}
              />
            </Route>
            <Route path='/optimizers'>
              <Optimizers clients={clients} sendMessage={sendMessageAsClientManager}/>
            </Route>
            <Route path='/evaluators'>
              <Evaluators clients={clients} sendMessage={sendMessageAsClientManager}/>
            </Route>
            <Route path='/processors'>
              <Processors clients={clients} sendMessage={sendMessageAsClientManager}/>
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

// App.whyDidYouRender = true

export default App
