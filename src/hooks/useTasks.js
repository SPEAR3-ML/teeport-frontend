import { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [sendMessage, lastMessage, readyState] = useWebSocket('ws://localhost:8080/?type=manager')

  useEffect(() => {
    if (lastMessage !== null) {
      if (readyState === ReadyState.OPEN) {
        const lastMsg = JSON.parse(lastMessage.data)
        switch (lastMsg.type) {
          case 'hello': {
            const msg = {
              type: 'getTasks',
            }
            sendMessage(JSON.stringify(msg))
            break
          }
          case 'tasks': {
            setTasks(lastMsg.tasks)
            break
          }
          case 'taskCreated': {
            const msg = {
              type: 'getTasks',
            }
            sendMessage(JSON.stringify(msg))
            break
          }
          default: {
            console.warn(lastMsg)
          }
        }
      }
    }
  }, [lastMessage, readyState, sendMessage])

  return tasks
}

export default useTasks
