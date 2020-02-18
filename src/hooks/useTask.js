import { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import _ from 'lodash'

const useTask = taskId => {
  const [task, setTask] = useState({})
  const [pending, setPending] = useState([])
  const [sendMessage, lastMessage, readyState] = useWebSocket(`ws://zeta:8080/?type=monitor&taskId=${taskId}`)

  useEffect(() => {
    if (lastMessage !== null) {
      if (readyState === ReadyState.OPEN) {
        const lastMsg = JSON.parse(lastMessage.data)
        switch (lastMsg.type) {
          case 'evaluate': {
            setPending([lastMsg.data])
            break
          }
          case 'hello':
          case 'task':
          case 'evaluated': {
            break
          }
          default: {
            console.warn(lastMsg)
          }
        }
      }
    }
  }, [lastMessage, readyState])

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
          case 'task': {
            setTask(lastMsg.task)
            break
          }
          case 'evaluated': {
            setTask(t => {
              const newTask = _.cloneDeep(t)
              newTask.history.push([pending[0], lastMsg.data])
              return newTask
            })
            break
          }
          case 'evaluate': {
            break
          }
          default: {
            console.warn(lastMsg)
          }
        }
      }
    }
  }, [taskId, pending, lastMessage, readyState, sendMessage])

  return [task, sendMessage]
}

export default useTask
