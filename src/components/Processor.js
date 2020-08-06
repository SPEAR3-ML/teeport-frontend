import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import df from 'dateformat'

import EditableTitle from './EditableTitle'
import useLock from '../hooks/useLock'

const Processor = ({ processor, sendMessage }) => {
  const [locked, unlock] = useLock(1000)

  return (
    <Card style={{ height: '100%' }}>
      <Card.Header>
        <EditableTitle
          current={processor.name}
          placeholder='Processor Name'
          onConfirm={name => {
            const msg = JSON.stringify({
              type: 'renameClient',
              clientId: processor.id,
              name,
            })
            sendMessage(msg)
          }}
        />
        <Card.Subtitle className='mb-2 text-muted'>
          {df(new Date(processor.connectedAt), 'yyyy-mm-dd HH:MM:ss')}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
        <Card.Title>
          <OverlayTrigger
            placement='bottom'
            delay={{ show: 1000, hide: 100 }}
            overlay={<Tooltip id='button-tooltip-2'>Click to copy id</Tooltip>}
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
          <FormControl as='textarea' aria-label='Description'
            style={{ resize: 'none' }}
          />
        </InputGroup>
      </Card.Body>
      <Card.Footer>
        <Button size='lg' block onClick={() => {
          if (locked) {
            return unlock()
          }

          const msg = JSON.stringify({
            type: 'closeClient',
            id: processor.id,
          })
          sendMessage(msg)
        }}>
          {locked ? 'Close' : 'Confirm'}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default Processor
