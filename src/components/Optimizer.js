import React, { useState } from 'react'

import { DraggableDiv } from './Utils'

const Optimizer = ({ optimizer, sendMessage }) => {
  const [name, setName] = useState('')

  return (
    <DraggableDiv title={optimizer.name} active={true}>
      {new Date(optimizer.connectedAt).toString()}
      <h2>
        {optimizer.id}
      </h2>
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
