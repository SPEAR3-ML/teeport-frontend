import React from 'react'
import styled from 'styled-components'
// import { grey } from 'material-colors'

import { yellow } from '../plugins/slacPalette'

const ControlBar = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  padding-left: 6px;
  padding-right: 6px;
  flex: 0 0 36px;
  font-size: 12pt;
  font-weight: 600;
  background-color: ${yellow.dark};
  color: white;
`

const Action = styled.button`
  flex: 0 0 auto;
  margin-left: 6px;
  margin-right: 6px;
  width: 128px;
  height: 24px;
`

const downloadAllTaskData = sendMessage => {
  const msg = {
    type: 'getTasks',
  }
  sendMessage(JSON.stringify(msg))
}

const TasksControlBar = ({ sendMessage, onNewTask }) => {
  return (
    <ControlBar>
      <Action onClick={onNewTask}>
        New Task
      </Action>
      <Action onClick={() => console.log('New Benchmark')}>
        New Benchmark
      </Action>
      <Action onClick={() => console.log('Import Data')}>
        Import Data
      </Action>
      <Action onClick={() => {
        downloadAllTaskData(sendMessage)
      }}>
        Export Data
      </Action>
    </ControlBar>
  )
}

export default TasksControlBar
