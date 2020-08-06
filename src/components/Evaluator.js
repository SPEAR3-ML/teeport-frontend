import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import JSONPretty from 'react-json-pretty'
import df from 'dateformat'

import EditableTitle from './EditableTitle'
import CopyableBlock from './CopyableBlock'
import useLock from '../hooks/useLock'

const Evaluator = ({ evaluator, sendMessage }) => {
  const [locked, unlock] = useLock(1000)
  const [descr, setDescr] = useState(evaluator.descr || '')
  const [editing, setEditing] = useState(false)
  const [tab, setTab] = useState('info')
  // const active = evaluator.taskId !== null && evaluator.taskId.length

  return (
    <Card className='h-100'>
      <Card.Header>
        <EditableTitle
          current={evaluator.name}
          placeholder='Evaluator Name'
          onConfirm={name => {
            const msg = JSON.stringify({
              type: 'renameClient',
              clientId: evaluator.id,
              name,
            })
            sendMessage(msg)
          }}
        />
        <Card.Subtitle className='mb-2 text-muted'>
          {df(new Date(evaluator.connectedAt), 'yyyy-mm-dd HH:MM:ss')}
        </Card.Subtitle>
        <Nav variant='tabs' activeKey={tab}
          onSelect={t => setTab(t)}
        >
          <Nav.Item>
            <Nav.Link eventKey='info'>Info</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='configs'>Configs</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      {tab === 'info'
        ? <Card.Body className='d-flex flex-column'>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>ID</Form.Label>
                <CopyableBlock value={evaluator.private ? '' : evaluator.id}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Problem ID</Form.Label>
                <CopyableBlock value={evaluator.classId}/>
              </Form.Group>
            </Form.Row>
            <Form.Group className="mb-0">
              <Form.Label>Description</Form.Label>
            </Form.Group>
          </Form>
          {!editing
            ? <div
              className='h-100 w-100 text-secondary bg-light rounded px-3 py-2 overflow-auto'
              onClick={() => setEditing(true)}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              <cite>{descr}</cite>
            </div>
            : <div className='d-flex flex-column flex-grow-1'>
              <InputGroup className='flex-grow-1'>
                <FormControl as='textarea' aria-label='Description'
                  style={{
                    resize: 'none',
                    borderRadius: '4px 4px 0 0',
                    marginBottom: -1,
                  }}
                  value={descr}
                  onChange={e => setDescr(e.target.value)}
                />
              </InputGroup>
              <ButtonGroup aria-label='Desc control'>
                <Button
                  onClick={() => {
                    setDescr(evaluator.descr || '')
                    setEditing(false)
                  }}
                  variant='outline-secondary'
                  style={{ borderRadius: '0 0 0 4px' }}
                >
                  Cancel
                </Button>
                <Button disabled={descr === (evaluator.descr || '')}
                  onClick={() => {
                    const msg = JSON.stringify({
                      type: 'updateClientDescr',
                      clientId: evaluator.id,
                      descr,
                    })
                    sendMessage(msg)
                    setEditing(false)
                  }}
                  variant='outline-secondary'
                  style={{ borderRadius: '0 0 4px 0' }}
                >
                  Confirm
                </Button>
              </ButtonGroup>
            </div>
          }
        </Card.Body>
        : <Card.Body className='overflow-auto d-flex flex-column'>
          <JSONPretty data={evaluator.configs}
            theme={{
              main: 'line-height:1.3;color:#000000;background:#ffffff;overflow:auto;',
              error: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;',
              key: 'color:#000000;',
              string: 'color:#d14;',
              value: 'color:#099;',
              boolean: 'color:#000000;font-weight:bold;',
            }}
          />
        </Card.Body>}
      <Card.Footer>
        <Button size='lg' block onClick={() => {
          if (locked) {
            return unlock()
          }

          const msg = JSON.stringify({
            type: 'closeClient',
            id: evaluator.id,
          })
          sendMessage(msg)
        }}>
          {locked ? 'Close' : 'Confirm'}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default Evaluator
