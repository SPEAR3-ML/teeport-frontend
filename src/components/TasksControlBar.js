import React, { useRef, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import qs from 'qs'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ToggleButton from 'react-bootstrap/ToggleButton'
// import { grey } from 'material-colors'
import _ from 'lodash'

import { yellow } from '../plugins/slacPalette'

// const ControlBar = styled.div`
//   display: flex;
//   flex-flow: row;
//   align-items: center;
//   padding-left: 6px;
//   padding-right: 6px;
//   flex: 0 0 36px;
//   font-size: 12pt;
//   font-weight: 600;
//   background-color: ${yellow.dark};
//   color: white;
// `

// const Action = styled.button`
//   flex: 0 0 auto;
//   margin-left: 6px;
//   margin-right: 6px;
//   width: 128px;
//   height: 24px;
// `

const ControlBar = styled(Row)`
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${yellow.normal};
`

// const SplitAction = styled(Dropdown)`
//   margin-right: 6px;
// `

// const Action = styled(Button)`
//   margin-right: 6px;
// `

const HiddenInput = styled.input`
  display: none;
`

const TasksControlBar = ({
  sendMessage, onNewTask, onNewBenchmarkTask,
  tasksNum, selected, unselectAll,
}) => {
  const [radioValue, setRadioValue] = useState('1')

  const radios = [
    { name: 'By Created', value: '1' },
    { name: 'By Name', value: '2' },
  ]

  const history = useHistory()
  const dataImporter = useRef(null)

  const importTasks = useCallback(e => {
    try {
      const dataFile = e.target.files[0]
      e.target.value = null // reset the file input

      var reader = new FileReader()
      reader.onload = e => {
        const tasks = JSON.parse(e.target.result)
        const msg = {
          type: 'importTasks',
          tasks,
        }
        sendMessage(JSON.stringify(msg))
      }

      reader.readAsText(dataFile)
    } catch (err) {
      // do nothing
    }
  }, [sendMessage])

  const downloadTasks = useCallback(() => {
    const msg = {
      type: 'getTasks',
      ids: Object.keys(selected),
      mode: 'all',
    }
    sendMessage(JSON.stringify(msg))
  }, [sendMessage, selected])

  return (
    <Container fluid style={{ zIndex: 1 }}>
      <ControlBar className='shadow-sm'>
        <Col>
          <Dropdown as={ButtonGroup} style={{ marginRight: 6 }}>
            <Button variant="primary" size='sm' onClick={onNewTask}>New</Button>
            <Dropdown.Toggle split variant="primary" size='sm'/>
            <Dropdown.Menu>
              <Dropdown.Item onClick={onNewTask}>Regular Task</Dropdown.Item>
              <Dropdown.Item onClick={onNewBenchmarkTask}>Benchmark Task</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup} style={{ marginRight: 6 }}>
            <Button variant="info" size='sm' onClick={() => {
              history.push(`/tasks/comparison?${qs.stringify({
                taskIds: Object.keys(selected),
              })}`)
            }} disabled={_.isEmpty(selected)}>
              Compare
            </Button>
            <Dropdown.Toggle split variant="info" size='sm' disabled={_.isEmpty(selected)}/>
            <Dropdown.Menu>
              <Dropdown.Item onClick={unselectAll}>
                Unselect All
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <DropdownButton as={ButtonGroup} size='sm' variant="info" title="More" style={{ marginRight: 6 }}>
            <Dropdown.Item eventKey="1" onClick={() => {
              dataImporter.current.click()
            }}>
              Import Data
            </Dropdown.Item>
            <HiddenInput
              type='file'
              accept='.json'
              onChange={importTasks}
              ref={dataImporter}
            />
            <Dropdown.Item eventKey="2" onClick={downloadTasks} disabled={!tasksNum}>
              {_.isEmpty(selected) ? 'Export Data' : 'Export Selected'}
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs='auto'>
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant="warning"
                size='sm'
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </ControlBar>
    </Container>
  )
}

export default TasksControlBar
