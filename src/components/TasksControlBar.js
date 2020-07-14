import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
// import { grey } from 'material-colors'
import _ from 'lodash'

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

const HiddenInput = styled.input`
  display: none;
`

const TasksControlBar = ({ sendMessage, onNewTask, tasksNum, selected }) => {
  const dataImporter = useRef(null)

  const importTasks = useCallback(e => {
    try {
      const dataFile = e.target.files[0]
      e.target.value = null // reset the file input

      var reader = new FileReader()
      reader.onload = e => {
        const tasks = JSON.parse(e.target.result)
        const msg = {
          type: 'importTasks',
          tasks,
        }
        sendMessage(JSON.stringify(msg))
      }

      reader.readAsText(dataFile)
    } catch (err) {
      // do nothing
    }
  }, [sendMessage])

  const downloadTasks = useCallback(() => {
    const msg = {
      type: 'getTasks',
    }
    sendMessage(JSON.stringify(msg))
  }, [sendMessage])

  return (
    <ControlBar>
      <Action onClick={onNewTask}>
        New Task
      </Action>
      <Action onClick={() => console.log('New Benchmark')}>
        New Benchmark
      </Action>
      <Action onClick={() => {
        dataImporter.current.click()
      }}>
        Import Data
      </Action>
      <HiddenInput
        type='file'
        accept='.json'
        onChange={importTasks}
        ref={dataImporter}
      />
      <Action onClick={downloadTasks} disabled={!tasksNum}>
        Export Data
      </Action>
      <Action onClick={() => { console.log(selected) }} disabled={_.isEmpty(selected)}>
        Enter
      </Action>
    </ControlBar>
  )
}

export default TasksControlBar
