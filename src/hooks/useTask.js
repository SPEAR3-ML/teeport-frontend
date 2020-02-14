import { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

const useTask = taskId => {
  const [task, setTask] = useState({})
  const [sendMessage, lastMessage, readyState] = useWebSocket('ws://localhost:8080/?type=monitor')

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
          default: {
            console.warn(lastMsg)
          }
        }
      }
    }
  }, [taskId, lastMessage, readyState, sendMessage])

  return task
}

export default useTask
