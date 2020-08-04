import { useEffect, useReducer } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import qs from 'qs'
import _ from 'lodash'

import { URI_TASK_SERVER } from '../constants'

const initialState = {
  tasks: [],
  tasksTS: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'tasks': {
      const newState = _.cloneDeep(state)
      newState.tasks = action.tasks
      newState.tasksTS = action.timestamp
      return newState
    }
    case 'evaluate': { // not gonna happen since we only receive Y
      const idx = state.tasks.map(task => task.id).indexOf(action.taskId)
      if (idx !== -1) {
        const newState = _.cloneDeep(state)
        if (newState.tasksTS && (action.timestamp > newState.tasksTS)) {
          newState.tasks[idx].pending.push([action.data, null])
        }
        return newState
      }
      return state
    }
    case 'evaluated': {
      const idx = state.tasks.map(task => task.id).indexOf(action.taskId)
      if (idx !== -1) {
        const newState = _.cloneDeep(state)
        if (newState.tasksTS && (action.timestamp > newState.tasksTS)) {
          newState.tasks[idx].history.push([[], action.data])
          // newState.tasks[idx].history.push([newState.tasks[idx].pending[0][0], action.data])
          // newState.tasks[idx].pending.shift()
        }
        return newState
      }
      return state
    }
    default:
      return state
  }
}

const useMultiTask = taskIds => {
  // console.log('useMultiTask')
  const [state, dispatch] = useReducer(reducer, initialState)
  const [sendMessage, lastMessage, readyState] = useWebSocket(`${URI_TASK_SERVER}?${qs.stringify({
    type: 'monitor',
    taskId: JSON.stringify(taskIds),
  })}`)

  useEffect(() => {
    if (lastMessage !== null) {
      if (readyState === ReadyState.OPEN) {
        const lastMsg = JSON.parse(lastMessage.data)
        switch (lastMsg.type) {
          case 'hello': {
            const msg = {
              type: 'getTasks',
              ids: taskIds,
            }
            sendMessage(JSON.stringify(msg))
            break
          }
          case 'evaluate':
          case 'evaluated':
          case 'tasks': {
            dispatch(lastMsg)
            break
          }
          case 'pauseTask':
          case 'startTask':
          case 'stopTask':
          case 'completeTask': {
            break
          }
          default: {
            console.warn(lastMsg)
          }
        }
      }
    }
  }, [taskIds, lastMessage, readyState, sendMessage])

  return [state.tasks, sendMessage]
}

export default useMultiTask
