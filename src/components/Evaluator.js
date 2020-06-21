import React, { useState } from 'react'
import JSONPretty from 'react-json-pretty'
import df from 'dateformat'

import { DraggableDiv } from './Utils'

const Evaluator = ({ evaluator, sendMessage }) => {
  const [name, setName] = useState('')
  const [descr, setDescr] = useState(evaluator.descr || '')
  const active = evaluator.taskId !== null && evaluator.taskId.length

  return (
    <DraggableDiv title={evaluator.name} active={active}>
      {df(new Date(evaluator.connectedAt), 'yyyy-mm-dd HH:MM:ss')}
      <div>
        <h2>
          {evaluator.private ? '' : evaluator.id}
        </h2>
        <button onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(evaluator.id)
          } else {
            alert('Copy failed, please copy the id manually')
          }
        }}>
          Copy ID
        </button>
      </div>
      <h4>
        Class ID: {evaluator.classId}
      </h4>
      <h4>
        Default Configs:
      </h4>
      <JSONPretty data={evaluator.configs}/>
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
        <button disabled={descr === (evaluator.descr || '')} onClick={() => {
          setDescr(evaluator.descr)
        }}>
          Cancel
        </button>
        <button disabled={descr === (evaluator.descr || '')} onClick={() => {
          const msg = JSON.stringify({
            type: 'updateClientDescr',
            clientId: evaluator.id,
            descr,
          })
          sendMessage(msg)
        }}>
          Update
        </button>
      </div>
      <div>
        <input type='text' value={name} onChange={e => setName(e.target.value)}/>
        <button onClick={() => {
          const msg = JSON.stringify({
            type: 'renameClient',
            clientId: evaluator.id,
            name,
          })
          sendMessage(msg)
        }}>
          Rename
        </button>
      </div>
      <button onClick={() => {
        const msg = JSON.stringify({
          type: 'closeClient',
          id: evaluator.id,
        })
        sendMessage(msg)
      }}>
        Close
      </button>
    </DraggableDiv>
  )
}

export default Evaluator
