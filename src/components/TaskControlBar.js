import React from 'react'
import { useHistory } from 'react-router-dom'
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
  width: 80px;
  height: 24px;
`

const downloadHistoryData = task => {
  const element = document.createElement('a')
  const file = new Blob([JSON.stringify(task.history, null, 2)], { type: 'application/json' })
  element.href = URL.createObjectURL(file)
  element.download = `history_${task.id}.json`
  // document.body.appendChild(element)
  element.click()
}

const TaskControlBar = ({ task, sendMessage }) => {
  const history = useHistory()
  const isRunning = task.status === 'running'
  const isInit = task.status === 'init'
  const isDone = task.status === 'completed' || task.status === 'cancelled'

  return (
    <ControlBar>
      <Action onClick={() => { history.push('/tasks') }}>
        Back
      </Action>
      <Action onClick={() => {
        const msg = {
          type: isRunning ? 'pauseTask' : 'startTask',
          id: task.id,
        }
        sendMessage(JSON.stringify(msg))
      }} disabled={isDone}>
        { isRunning ? 'Pause' : (isInit ? 'Start' : 'Resume') }
      </Action>
      <Action onClick={() => {
        const msg = {
          type: 'stopTask',
          id: task.id,
        }
        sendMessage(JSON.stringify(msg))
      }} disabled={isDone}>
        Stop
      </Action>
      <Action onClick={() => {
        console.log('replay')
      }} disabled={!isDone}>
        Replay
      </Action>
      <Action onClick={() => {
        downloadHistoryData(task)
      }} disabled={!isDone}>
        Download
      </Action>
    </ControlBar>
  )
}

export default TaskControlBar
