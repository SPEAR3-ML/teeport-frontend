import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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

import EditableTitle from './EditableTitle'
import EditableTextarea from './EditableTextarea'
import CopyableBlock from './CopyableBlock'
import useLock from '../hooks/useLock'
import { github } from '../plugins/jsonThemes'

const TaskCard = ({ task, selected, sendMessage, toggleSelected }) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [locked, unlock] = useLock(1000)
  const [tab, setTab] = useState('info')
  const [focus, setFocus] = useState(false)
  const [status, setStatus] = useState(false) // update view scrollbar when status changes
  const isDone = task.status === 'completed' || task.status === 'cancelled'
  // const isInit = task.status === 'init'
  const archived = !!task.archivedAt
  let type = 0 // 0: optimization task, 1: benchmarking task
  // console.log(task.configs)
  try {
    if (task.configs.task.runNumber !== undefined) type = 1
  } catch (error) {
    // do nothing
  }

  return (
    <Card className='h-100'>
      <Card.Header>
        <EditableTitle
          current={task.name}
          placeholder='Task Name'
          onConfirm={name => {
            const msg = JSON.stringify({
              type: 'renameTask',
              taskId: task.id,
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
                <Form.Label>Algorithm ID</Form.Label>
                <CopyableBlock value={task.algorithmId}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Problem ID</Form.Label>
                <CopyableBlock value={task.problemId}/>
              </Form.Group>
            </Form.Row>
            <Form.Group className="mb-0">
              <Form.Label>Description</Form.Label>
            </Form.Group>
          </Form>
          <EditableTextarea
            current={task.descr}
            status={status}
            placeholder='Describe the task briefly'
            onConfirm={descr => {
              const msg = JSON.stringify({
                type: 'updateTaskDescr',
                taskId: task.id,
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
              data={task.configs}
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
              <Button variant='light'
                className='rounded-0 border-0'
                onClick={() => {
                  if (type === 1) {
                    history.push(`${pathname}/benchmark/${task.id}`)
                  } else {
                    history.push(`${pathname}/${task.id}`)
                  }
                }}
                disabled={archived}
                style={{ flexBasis: '20%' }}
              >
                Enter
              </Button>
              <Button variant='light'
                className='rounded-0 border-0'
                onClick={toggleSelected}
                style={{ flexBasis: '20%' }}
              >
                {selected ? 'Unselect' : 'Select'}
              </Button>
              <Button variant='light'
                className='rounded-0 border-0'
                onClick={() => {
                  const msg = JSON.stringify({
                    type: archived ? 'unarchiveTask' : 'archiveTask',
                    id: task.id,
                  })
                  sendMessage(msg)
                }}
                disabled={!isDone}
                style={{ flexBasis: '20%' }}
              >
                {archived ? 'Unarchive' : 'Archive'}
              </Button>
              <Button variant='outline-primary'
                className='rounded-0 border-0'
                onClick={() => {
                  if (locked) {
                    return unlock()
                  }

                  const msg = JSON.stringify({
                    type: 'deleteTask',
                    id: task.id,
                  })
                  sendMessage(msg)
                }}
                style={{ flexBasis: '20%' }}
              >
                {locked ? 'Delete' : 'Confirm'}
              </Button>
            </ButtonGroup>
          </div>
        </Collapse>
        <small className='w-100 text-muted text-center'>
          {'Created at ' + df(new Date(task.createdAt), 'yyyy-mm-dd HH:MM:ss')}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default TaskCard
