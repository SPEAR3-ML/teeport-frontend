import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import JSONPretty from 'react-json-pretty'
import df from 'dateformat'

import { DraggableDiv } from './Utils'

const TaskCard = ({ task, selected, sendMessage, toggleSelected }) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [name, setName] = useState('')
  const [descr, setDescr] = useState(task.descr || '')
  const isDone = task.status === 'completed' || task.status === 'cancelled'
  const isInit = task.status === 'init'
  const archived = !!task.archivedAt
  let type = 0 // 0: optimization task, 1: benchmarking task
  // console.log(task.configs)
  try {
    if (task.configs.task.runNumber !== undefined) type = 1
  } catch (error) {
    // do nothing
  }

  return (
    <DraggableDiv
      title={task.name}
      type={type}
      active={task.status === 'running'}
      dimmed={archived}
      selected={selected}
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
      <button onClick={() => {
        if (type === 1) {
          history.push(`${pathname}/benchmark/${task.id}`)
        } else {
          history.push(`${pathname}/${task.id}`)
        }
      }} disabled={archived}>
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
      }} disabled={!isInit && (!isDone || archived)}>
        Delete
      </button>
      <button onClick={toggleSelected}>
        {selected ? 'Unselect' : 'Select'}
      </button>
    </DraggableDiv>
  )
}

export default TaskCard
