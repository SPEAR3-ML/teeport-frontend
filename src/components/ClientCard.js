import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import JSONPretty from 'react-json-pretty'
import df from 'dateformat'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { XCircle } from 'react-bootstrap-icons'

import EditableTitle from './EditableTitle'
import EditableTextarea from './EditableTextarea'
import CopyableBlock from './CopyableBlock'
import useLock from '../hooks/useLock'
import { github } from '../plugins/jsonThemes'
import { capitalize } from '../utils/helpers'

const ClientCard = ({ client, sendMessage }) => {
  const [locked, unlock] = useLock(1000)
  const [tab, setTab] = useState('info')
  const [focus, setFocus] = useState(false)
  const [status, setStatus] = useState(false) // update view scrollbar when status changes

  return (
    <Card
      className='h-100 border-0'
    >
      <Card.Header>
        <EditableTitle
          current={client.name}
          placeholder={`${capitalize(client.type)} Name`}
          onConfirm={name => {
            const msg = JSON.stringify({
              type: 'renameClient',
              clientId: client.id,
              name,
            })
            sendMessage(msg)
          }}
        />
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
                <CopyableBlock value={client.private ? '' : client.id}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>{`${capitalize(client.type)} ID`}</Form.Label>
                <CopyableBlock value={client.classId}/>
              </Form.Group>
            </Form.Row>
            <Form.Group className="mb-0">
              <Form.Label>Description</Form.Label>
            </Form.Group>
          </Form>
          <EditableTextarea
            current={client.descr}
            status={status}
            placeholder={`Describe the ${client.type} briefly`}
            onConfirm={descr => {
              const msg = JSON.stringify({
                type: 'updateClientDescr',
                clientId: client.id,
                descr,
              })
              sendMessage(msg)
            }}
          />
        </Card.Body>
        : <Card.Body className='px-0 py-0'>
          <PerfectScrollbar
            options={{
              wheelPropagation: true, // set to false to stop propagation
            }}
          >
            <JSONPretty
              className='mt-3 mx-4'
              data={client.configs}
              theme={github}
            />
          </PerfectScrollbar>
        </Card.Body>}
      <Card.Footer
        className='d-flex flex-column'
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <Collapse
          in={focus}
          onEntered={() => setStatus(true)}
          onExited={() => setStatus(false)}
        >
          <div
            style={{
              marginLeft: -20,
              marginRight: -20,
              marginTop: -12,
              marginBottom: 12,
            }}
          >
            <ButtonGroup className='d-flex'>
              <Button variant='outline-primary'
                className='rounded-0 border-0'
                onClick={() => {
                  if (locked) {
                    return unlock()
                  }

                  const msg = JSON.stringify({
                    type: 'closeClient',
                    id: client.id,
                  })
                  sendMessage(msg)
                }}
                style={{ flexBasis: '20%' }}
              >
                <XCircle />
                <div className='small'>
                  {locked ? 'Close' : 'Confirm'}
                </div>
              </Button>
            </ButtonGroup>
          </div>
        </Collapse>
        <small className='w-100 text-muted text-center'>
          {'Connected at ' + df(new Date(client.connectedAt), 'yyyy-mm-dd HH:MM:ss')}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default ClientCard
