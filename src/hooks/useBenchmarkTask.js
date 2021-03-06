import { useEffect, useReducer } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import qs from 'qs'
import _ from 'lodash'

import { URI_TASK_SERVER } from '../constants'

const initialState = {
  task: {},
  taskTS: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'task': {
      const newState = _.cloneDeep(state)
      newState.task = action.task
      newState.taskTS = action.timestamp
      return newState
    }
    case 'evaluate': { // not gonna happen since we only receive Y
      const newState = _.cloneDeep(state)
      if (newState.taskTS && (action.timestamp > newState.taskTS)) {
        newState.task.pending.push([action.data, null])
      }
      return newState
    }
    case 'evaluated': {
      const newState = _.cloneDeep(state)
      if (newState.taskTS && (action.timestamp > newState.taskTS)) {
        if (newState.task.history[newState.task.currentRun] === undefined) {
          newState.task.history.push([])
        }
        newState.task.history[newState.task.currentRun].push([[], action.data])
        // newState.task.history[newState.task.currentRun].push([newState.task.pending[0][0], action.data])
        // newState.task.pending.shift()
      }
      return newState
    }
    default:
      return state
  }
}

const useBenchmarkTask = taskId => {
  // console.log('useTask')
  const [state, dispatch] = useReducer(reducer, initialState)
  const [sendMessage, lastMessage, readyState] = useWebSocket(`${URI_TASK_SERVER}?${qs.stringify({
    type: 'monitor',
    taskId: JSON.stringify([taskId]),
    configs: JSON.stringify({ mode: 'y' }),
  })}`)

  useEffect(() => {
    if (lastMessage !== null) {
      if (readyState === ReadyState.OPEN) {
        const lastMsg = JSON.parse(lastMessage.data)
        switch (lastMsg.type) {
          case 'pauseTask':
          case 'startTask':
          case 'stopTask':
          case 'completeTask':
          case 'hello': {
            const msg = {
              type: 'getTask',
              id: taskId,
            }
            sendMessage(JSON.stringify(msg))
            break
          }
          case 'evaluate':
          case 'evaluated':
          case 'task': {
            dispatch(lastMsg)
            break
          }
          default: {
            console.warn(lastMsg)
          }
        }
      }
    }
  }, [taskId, lastMessage, readyState, sendMessage])

  return [state.task, sendMessage]
}

export default useBenchmarkTask
