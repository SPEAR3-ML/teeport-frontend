import { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

const useTask = taskId => {
  const [task, setTask] = useState({})
  const [pendingX, setPendingX] = useState([])
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
            task.history.push([pendingX, lastMsg.data])
            setTask(task)
            break
          }
          default: {
            console.warn(lastMsg)
          }
        }
      }
    }
  }, [taskId, lastMessage, readyState]) // eslint-disable-line react-hooks/exhaustive-deps

  return task
}

export default useTask
