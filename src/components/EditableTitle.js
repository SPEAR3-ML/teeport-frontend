import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const EditableTitle = ({ current, placeholder, onConfirm }) => {
  const [title, setTitle] = useState(current)
  const [editing, setEditing] = useState(false)

  return (
    <Card.Title onClick={editing ? null : () => setEditing(true)}
      style={{ lineHeight: '38px' }}
    >
      {!editing
        ? title
        : <InputGroup>
          <FormControl
            autoFocus
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby='basic-addon2'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <InputGroup.Append>
            <Button variant='outline-secondary' onClick={() => {
              onConfirm(title)
              setEditing(false)
            }} disabled={current === title}>
              Confirm
            </Button>
            <Button variant='outline-secondary'
              onClick={() => {
                setTitle(current)
                setEditing(false)
              }}
            >
              Cancel
            </Button>
          </InputGroup.Append>
        </InputGroup>
      }
    </Card.Title>
  )
}

export default EditableTitle
