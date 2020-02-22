import React, { useState } from 'react'

import { DraggableDiv } from './Utils'

const Evaluator = ({ evaluator, sendMessage }) => {
  const [name, setName] = useState('')

  return (
    <DraggableDiv title={evaluator.name} active={true}>
      {new Date(evaluator.connectedAt).toString()}
      <h2>
        {evaluator.id}
      </h2>
      <button onClick={() => { console.log('copy') }}>
        Copy ID
      </button>
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
      <button onClick={() => { console.log('close') }}>
        Close
      </button>
    </DraggableDiv>
  )
}

export default Evaluator
