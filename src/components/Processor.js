import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import df from 'dateformat'

// import { DraggableDiv } from './Utils'

const Processor = ({ processor, sendMessage }) => {
  const [name, setName] = useState(processor.name)
  const [editName, setEditName] = useState(false)
  const [lock, setLock] = useState(true) // dangerous action lock

  useEffect(() => {
    if (lock) return

    const timer = setTimeout(() => {
      setLock(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [lock])

  return (
    <Card style={{ height: '100%' }}>
      <Card.Header>
        <Card.Title onClick={editName ? () => {} : () => setEditName(true)}
          style={{ lineHeight: '38px' }}
        >
          {!editName
            ? name
            : <InputGroup>
              <FormControl
                placeholder="Processor name"
                aria-label="Processor name"
                aria-describedby="basic-addon2"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={() => {
                  const msg = JSON.stringify({
                    type: 'renameClient',
                    clientId: processor.id,
                    name,
                  })
                  sendMessage(msg)
                  setEditName(false)
                }} disabled={processor.name === name}>
                  Rename
                </Button>
                <Button variant="outline-secondary"
                  onClick={e => {
                    setName(processor.name)
                    setEditName(false)
                  }}
                >
                  Cancel
                </Button>
              </InputGroup.Append>
            </InputGroup>
          }
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {df(new Date(processor.connectedAt), 'yyyy-mm-dd HH:MM:ss')}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
        <Card.Title>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 1000, hide: 100 }}
            overlay={<Tooltip id="button-tooltip-2">Click to copy id</Tooltip>}
          >
            <Button size='lg' variant='light' block onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(processor.id)
              } else {
                alert('Copy failed, please copy the id manually')
              }
            }}>
              {processor.private ? '' : processor.id}
            </Button>
          </OverlayTrigger>
        </Card.Title>
        <InputGroup style={{ flex: '1 1 auto' }}>
          <InputGroup.Prepend>
            <InputGroup.Text>Info</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl as="textarea" aria-label="Description"
            style={{ resize: 'none' }}
          />
        </InputGroup>
      </Card.Body>
      <Card.Footer>
        <Button size='lg' block onClick={() => {
          if (lock) {
            return setLock(false)
          }

          const msg = JSON.stringify({
            type: 'closeClient',
            id: processor.id,
          })
          sendMessage(msg)
        }}>
          {lock ? 'Close' : 'Confirm'}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default Processor
