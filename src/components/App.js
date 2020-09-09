import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Fuse from 'fuse.js'
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
// import { yellow } from '../plugins/slacPalette'
import { BASENAME } from '../constants'

const Frame = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  position: fixed;
  width: 100%;
  top: 56px;
  bottom: 0px;
`

const options = {
  includeScore: false,
  minMatchCharLength: 1,
  keys: [
    'algorithmId',
    'problemId',
    'name',
    'descr',
  ],
}

const App = () => {
  const [search, setSearch] = useState('')
  const [filteredTasks, setFilteredTasks] = useState([])
  const [tasks, sendMessageAsTaskManager] = useTasks()
  const [clients, sendMessageAsClientManager] = useClients()

  useEffect(() => {
    if (search) {
      const fuse = new Fuse(tasks, options)
      const result = fuse.search(search)
      const filteredTasks = result.map(obj => obj.item)
      setFilteredTasks(filteredTasks)
    } else {
      setFilteredTasks(tasks)
    }
  }, [search, tasks])

  return (
    <BrowserRouter basename={BASENAME}>
      <Frame className='bg-info'>
        <Titlebar
          search={search}
          setSearch={setSearch}
        />
        <Content>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/tasks/comparison'>
              <TaskComparison />
            </Route>
            <Route path='/tasks/benchmark/:taskId'>
              <TaskBenchmark />
            </Route>
            <Route path='/tasks/:taskId'>
              <Task />
            </Route>
            <Route path='/tasks'>
              <Tasks
                tasks={filteredTasks} sendMessageAsTaskManager={sendMessageAsTaskManager}
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
