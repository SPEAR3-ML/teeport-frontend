import React, { useState } from 'react'

import { DraggableDiv } from './Utils'

const Algorithm = ({ algorithm, sendMessage }) => {
  const [name, setName] = useState('')

  return (
    <DraggableDiv title={algorithm.name} active={true}>
      {new Date(algorithm.connectedAt).toString()}
      <h2>
        {algorithm.id}
      </h2>
      <input type='text' value={name} onChange={e => setName(e.target.value)}/>
      <button onClick={() => {
        const msg = JSON.stringify({
          type: 'renameClient',
          clientId: algorithm.id,
          name,
        })
        sendMessage(msg)
      }}>
        Rename
      </button>
      <button onClick={() => {
        const msg = JSON.stringify({
          type: 'closeClient',
          id: algorithm.id,
        })
        sendMessage(msg)
      }}>
        Close
      </button>
    </DraggableDiv>
  )
}

export default Algorithm
