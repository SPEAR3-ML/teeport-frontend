import React, { useState } from 'react'

import { DraggableDiv } from './Utils'

const Processor = ({ processor, sendMessage }) => {
  const [name, setName] = useState('')

  return (
    <DraggableDiv title={processor.name} active={true}>
      {new Date(processor.connectedAt).toString()}
      <h2>
        {processor.id}
      </h2>
      <button onClick={() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(processor.id)
        } else {
          alert('Copy failed, please copy the id manually')
        }
      }}>
        Copy ID
      </button>
      <input type='text' value={name} onChange={e => setName(e.target.value)}/>
      <button onClick={() => {
        const msg = JSON.stringify({
          type: 'renameClient',
          clientId: processor.id,
          name,
        })
        sendMessage(msg)
      }}>
        Rename
      </button>
      <button onClick={() => {
        const msg = JSON.stringify({
          type: 'closeClient',
          id: processor.id,
        })
        sendMessage(msg)
      }}>
        Close
      </button>
    </DraggableDiv>
  )
}

export default Processor
