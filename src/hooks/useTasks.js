import { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import df from 'dateformat'

import { URI_TASK_SERVER } from '../constants'

const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [sendMessage, lastMessage, readyState] = useWebSocket(`${URI_TASK_SERVER}?type=taskManager`)

  useEffect(() => {
    if (lastMessage !== null) {
      if (readyState === ReadyState.OPEN) {
        const lastMsg = JSON.parse(lastMessage.data)
        switch (lastMsg.type) {
          case 'hello': {
            const msg = {
              type: 'getTasksOverview',
            }
            sendMessage(JSON.stringify(msg))
            break
          }
          case 'tasksOverview': {
            setTasks(lastMsg.tasks)
            break
          }
          case 'tasks': {
            const allTasks = lastMsg.tasks
            const element = document.createElement('a')
            const file = new Blob([JSON.stringify(allTasks, null, 2)], { type: 'application/json' })
            element.href = URL.createObjectURL(file)
            const dtString = df(new Date(), 'yymmdd_HHMMss')
            element.download = `tasks_${dtString}.json`
            // document.body.appendChild(element)
            element.click()
            break
          }
          case 'startTask':
          case 'stopTask':
          case 'pauseTask':
          case 'completeTask':
          case 'updateTask':
          case 'updateTasks':
          case 'taskCreated': {
            const msg = {
              type: 'getTasksOverview',
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

  return [tasks, sendMessage]
}

export default useTasks
