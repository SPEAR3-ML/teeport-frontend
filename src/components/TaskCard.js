import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import JSONPretty from 'react-json-pretty'
import df from 'dateformat'

import EditableTitle from './EditableTitle'
import EditableTextarea from './EditableTextarea'
import CopyableBlock from './CopyableBlock'
import useLock from '../hooks/useLock'

const TaskCard = ({ task, selected, sendMessage, toggleSelected }) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [locked, unlock] = useLock(1000)
  const [tab, setTab] = useState('info')
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
        <Card.Subtitle className='mb-2 text-muted'>
          {df(new Date(task.createdAt), 'yyyy-mm-dd HH:MM:ss')}
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
        : <Card.Body className='overflow-auto d-flex flex-column'>
          <JSONPretty data={task.configs}
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
      <Card.Footer className='d-flex flex-row'>
        <ButtonGroup className='flex-grow-1' aria-label='Task control'>
          <Button size='lg' onClick={() => {
            if (type === 1) {
              history.push(`${pathname}/benchmark/${task.id}`)
            } else {
              history.push(`${pathname}/${task.id}`)
            }
          }} disabled={archived}>
            Enter
          </Button>
          <Button size='lg' onClick={() => {
            const msg = JSON.stringify({
              type: archived ? 'unarchiveTask' : 'archiveTask',
              id: task.id,
            })
            sendMessage(msg)
          }} disabled={!isDone}>
            {archived ? 'Unarchive' : 'Archive'}
          </Button>
          <Button size='lg' onClick={toggleSelected}>
            {selected ? 'Unselect' : 'Select'}
          </Button>
          <Button size='lg' onClick={() => {
            if (locked) {
              return unlock()
            }

            const msg = JSON.stringify({
              type: 'deleteTask',
              id: task.id,
            })
            sendMessage(msg)
          }}>
            {locked ? 'Delete' : 'Confirm'}
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  )
}

export default TaskCard
