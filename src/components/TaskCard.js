import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { DraggableDiv } from './Utils'

const TaskCard = ({ task, sendMessage }) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [name, setName] = useState('')

  return (
    <DraggableDiv title={task.name} active={task.status === 'running'}>
      <button onClick={() => { history.push(`${pathname}/${task.id}`) }}>
        Enter
      </button>
      {new Date(task.createdAt).toString()}
      <input type='text' value={name} onChange={e => setName(e.target.value)}/>
      <button onClick={() => {
        const msg = JSON.stringify({
          type: 'renameTask',
          taskId: task.id,
          name,
        })
        sendMessage(msg)
      }}>
        Rename
      </button>
    </DraggableDiv>
  )
}

export default TaskCard
