import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const moveCaretAtEnd = e => {
  const _value = e.target.value
  e.target.value = ''
  e.target.value = _value
}

const EditableTextarea = ({ current, placeholder, onConfirm }) => {
  const [text, setText] = useState(current || '')
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <div className='d-flex flex-column flex-grow-1'>
        <InputGroup className='flex-grow-1'>
          <FormControl as='textarea'
            autoFocus
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby='basic-addon2'
            value={text}
            style={{
              resize: 'none',
              borderRadius: '4px 4px 0 0',
              marginBottom: -1,
            }}
            onChange={e => setText(e.target.value)}
            onFocus={moveCaretAtEnd}
          />
        </InputGroup>
        <ButtonGroup aria-label='Desc control'>
          <Button
            onClick={() => {
              setText(current || '')
              setEditing(false)
            }}
            variant='outline-secondary'
            style={{ borderRadius: '0 0 0 4px' }}
          >
            Cancel
          </Button>
          <Button disabled={text === (current || '')}
            onClick={() => {
              onConfirm(text)
              setEditing(false)
            }}
            variant='outline-secondary'
            style={{ borderRadius: '0 0 4px 0' }}
          >
            Confirm
          </Button>
        </ButtonGroup>
      </div>
    )
  } else {
    return (
      <div
        className='h-100 w-100 text-secondary bg-light rounded px-3 py-2 overflow-auto'
        onClick={() => setEditing(true)}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        <cite>{text}</cite>
      </div>
    )
  }
}

export default EditableTextarea
