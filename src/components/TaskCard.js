import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { DraggableDiv } from './Utils'

const TaskCard = ({ task, sendMessage }) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [name, setName] = useState('')
  const isDone = task.status === 'completed' || task.status === 'cancelled'
  const archived = !!task.archivedAt

  return (
    <DraggableDiv
      title={task.name}
      active={task.status === 'running'}
      dimmed={archived}
    >
      {new Date(task.createdAt).toString()}
      <h2>
        {task.id}
      </h2>
      <button onClick={() => { history.push(`${pathname}/${task.id}`) }} disabled={archived}>
        Enter
      </button>
      <input type='text' value={name} onChange={e => setName(e.target.value)} disabled={archived}/>
      <button onClick={() => {
        const msg = JSON.stringify({
          type: 'renameTask',
          taskId: task.id,
          name,
        })
        sendMessage(msg)
      }} disabled={archived}>
        Rename
      </button>
      <button onClick={() => {
        const msg = JSON.stringify({
          type: archived ? 'unarchiveTask' : 'archiveTask',
          id: task.id,
        })
        sendMessage(msg)
      }} disabled={!isDone}>
        {archived ? 'Unarchive' : 'Archive'}
      </button>
      <button onClick={() => {
        const msg = JSON.stringify({
          type: 'deleteTask',
          id: task.id,
        })
        sendMessage(msg)
      }} disabled={!isDone || archived}>
        Delete
      </button>
    </DraggableDiv>
  )
}

export default TaskCard
