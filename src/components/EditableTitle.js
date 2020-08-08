import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const EditableTitle = ({ current, placeholder, onConfirm }) => {
  const [title, setTitle] = useState(current)
  const [editing, setEditing] = useState(false)
  const [focus, setFocus] = useState(false)

  return (
    <Card.Title onClick={editing ? null : () => setEditing(true)}
      style={{ lineHeight: '38px' }}
    >
      {!editing
        ? title
        : <InputGroup
          onMouseEnter={() => setFocus(true)}
          onMouseLeave={() => setFocus(false)}
        >
          <FormControl
            autoFocus
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby='basic-addon2'
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={() => {
              if (!focus) {
                onConfirm(title)
                setFocus(false)
                setEditing(false)
              }
            }}
          />
          <InputGroup.Append>
            <Button variant='outline-secondary' onClick={() => {
              onConfirm(title)
              setFocus(false)
              setEditing(false)
            }} disabled={current === title}>
              Confirm
            </Button>
            <Button variant='outline-secondary'
              onClick={() => {
                setTitle(current)
                setFocus(false)
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
