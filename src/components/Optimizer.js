import React, { useState } from 'react'
import JSONPretty from 'react-json-pretty'
import df from 'dateformat'

import { DraggableDiv } from './Utils'

const Optimizer = ({ optimizer, sendMessage }) => {
  const [name, setName] = useState('')
  const [descr, setDescr] = useState(optimizer.descr || '')
  const active = optimizer.taskId !== null

  return (
    <DraggableDiv title={optimizer.name} active={active}>
      {df(new Date(optimizer.connectedAt), 'yyyy-mm-dd HH:MM:ss')}
      <div>
        <h2>
          {optimizer.private ? '' : optimizer.id}
        </h2>
        <button onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(optimizer.id)
          } else {
            alert('Copy failed, please copy the id manually')
          }
        }}>
          Copy ID
        </button>
      </div>
      <h4>
        Class ID: {optimizer.classId}
      </h4>
      <h4>
        Default Configs:
      </h4>
      <JSONPretty data={optimizer.configs}/>
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
        <button disabled={descr === (optimizer.descr || '')} onClick={() => {
          setDescr(optimizer.descr)
        }}>
          Cancel
        </button>
        <button disabled={descr === (optimizer.descr || '')} onClick={() => {
          const msg = JSON.stringify({
            type: 'updateClientDescr',
            clientId: optimizer.id,
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
            clientId: optimizer.id,
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
          id: optimizer.id,
        })
        sendMessage(msg)
      }}>
        Close
      </button>
    </DraggableDiv>
  )
}

export default Optimizer
