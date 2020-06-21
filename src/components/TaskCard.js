import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import JSONPretty from 'react-json-pretty'
import df from 'dateformat'

import { DraggableDiv } from './Utils'

const TaskCard = ({ task, sendMessage }) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [name, setName] = useState('')
  const [descr, setDescr] = useState(task.descr || '')
  const isDone = task.status === 'completed' || task.status === 'cancelled'
  const archived = !!task.archivedAt

  return (
    <DraggableDiv
      title={task.name}
      active={task.status === 'running'}
      dimmed={archived}
    >
      {df(new Date(task.createdAt), 'yyyy-mm-dd HH:MM:ss')}
      <h2>
        {task.id}
      </h2>
      <h4>
        Algorithm ID: {task.algorithmId}
      </h4>
      <h4>
        Problem ID: {task.problemId}
      </h4>
      <h4>
        Init Configs:
      </h4>
      <JSONPretty data={task.configs}/>
      <h4>
        Description:
      </h4>
      <div style={{ display: 'block', paddingLeft: 8, paddingRight: 8 }}>
        <textarea
          style={{ resize: 'none', width: '100%' }}
          value={descr}
          onChange={e => setDescr(e.target.value)}
          rows='4'
        />
        <button disabled={descr === (task.descr || '')} onClick={() => {
          setDescr(task.descr)
        }}>
          Cancel
        </button>
        <button disabled={descr === (task.descr || '')} onClick={() => {
          const msg = JSON.stringify({
            type: 'updateTaskDescr',
            taskId: task.id,
            descr,
          })
          sendMessage(msg)
        }}>
          Update
        </button>
      </div>
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
