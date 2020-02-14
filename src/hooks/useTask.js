import { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import _ from 'lodash'

const useTask = taskId => {
  const [pendingX, setPendingX] = useState([])
  const [history, setHistory] = useState([])
  const [task, setTask] = useState({})
  const [sendMessage, lastMessage, readyState] = useWebSocket(`ws://localhost:8080/?type=monitor&taskId=${taskId}`)

  useEffect(() => {
    if (lastMessage !== null) {
      if (readyState === ReadyState.OPEN) {
        const lastMsg = JSON.parse(lastMessage.data)
        switch (lastMsg.type) {
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
          case 'evaluate': {
            setPendingX(lastMsg.data)
            break
          }
          case 'evaluated': {
            history.push([pendingX, lastMsg.data])
            setHistory(history)
            break
          }
          default: {
            console.warn(lastMsg)
          }
        }
      }
    }
  }, [taskId, history, pendingX, lastMessage, readyState, sendMessage])

  task.history = _.concat(task.history || [], history)

  return task
}

export default useTask
