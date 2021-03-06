import { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { URI_TASK_SERVER } from '../constants'

const useClients = () => {
  const [clients, setClients] = useState([])
  const [sendMessage, lastMessage, readyState] = useWebSocket(`${URI_TASK_SERVER}?type=clientManager`)

  useEffect(() => {
    if (lastMessage !== null) {
      if (readyState === ReadyState.OPEN) {
        const lastMsg = JSON.parse(lastMessage.data)
        switch (lastMsg.type) {
          case 'hello': {
            const msg = {
              type: 'getClients',
            }
            sendMessage(JSON.stringify(msg))
            break
          }
          case 'clients': {
            setClients(lastMsg.clients)
            break
          }
          case 'connected':
          case 'updated':
          case 'disconnected': {
            const msg = {
              type: 'getClients',
            }
            sendMessage(JSON.stringify(msg))
            break
          }
          case 'taskCreated': {
            break
          }
          default: {
            console.warn(lastMsg)
          }
        }
      }
    }
  }, [lastMessage, readyState, sendMessage])

  return [clients, sendMessage]
}

export default useClients
