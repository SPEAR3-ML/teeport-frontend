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
        navigator.clipboard.writeText(processor.id)
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
      <button onClick={() => { console.log('close') }}>
        Close
      </button>
    </DraggableDiv>
  )
}

export default Processor
