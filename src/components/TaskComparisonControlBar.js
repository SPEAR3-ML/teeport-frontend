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
  width: 104px;
  height: 24px;
`

const TaskComparisonControlBar = ({ tasks, sendMessage }) => {
  const history = useHistory()

  return (
    <ControlBar>
      <Action onClick={() => { history.push('/tasks') }}>
        Back
      </Action>
    </ControlBar>
  )
}

export default TaskComparisonControlBar
