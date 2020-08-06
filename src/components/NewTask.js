import React, { useState } from 'react'
// import Modal from 'react-modal'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
// import Select from 'react-select'
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
// import styled from 'styled-components'

// import { grey } from '../plugins/slacPalette'

// Modal.setAppElement('#root')

const NewTask = ({ show, setShow, clients, sendMessage }) => {
  const optimizerClients = clients.filter(client => {
    return client.type === 'optimizer' && !client.private
  })
  const optimizers = optimizerClients.map(client => ({
    value: client.id,
    label: client.name,
  }))
  const [selectedOptimizer, setSelectedOptimizer] = useState(null)
  const evaluatorClients = clients.filter(client => {
    return client.type === 'evaluator' && !client.private
  })
  const evaluators = evaluatorClients.map(client => ({
    value: client.id,
    label: client.name,
  }))
  const [selectedEvaluator, setSelectedEvaluator] = useState(null)
  const [configs, setConfigs] = useState(JSON.stringify({
    task: {
      name: null,
    },
  }, null, '\t'))
  const [valid, setValid] = useState(false)

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridOptimizer">
              <Form.Label>Optimizer</Form.Label>
              <DropdownButton as={ButtonGroup} variant="light"
                title={selectedOptimizer ? selectedOptimizer.label : 'Select'}
                style={{ width: '100%' }}
              >
                <FormControl
                  autoFocus
                  className="mx-3 w-auto"
                  placeholder="Type to filter..."
                  onChange={() => {}}
                />
                <Dropdown.Divider />
                {optimizers.map(optimizer => (
                  <Dropdown.Item key={optimizer.value} eventKey={optimizer.value}
                    active={selectedOptimizer && selectedOptimizer.value === optimizer.value}
                    onClick={() => {
                      const active = selectedOptimizer && selectedOptimizer.value === optimizer.value
                      const _configs = JSON.parse(configs)
                      if (active) {
                        setSelectedOptimizer(null)
                        delete _configs.optimizer
                      } else {
                        setSelectedOptimizer(optimizer)
                        const _optimizer = clients.filter(client => {
                          return client.id === optimizer.value
                        })[0]
                        _configs.optimizer = _optimizer.configs
                      }
                      setConfigs(JSON.stringify(_configs, null, '\t'))
                    }}
                  >
                    <div className="mb-n1">
                      {optimizer.label}
                    </div>
                    <small className="text-info">
                      {optimizer.value}
                    </small>
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEvaluator">
              <Form.Label>Evaluator</Form.Label>
              <DropdownButton as={ButtonGroup} variant="light"
                title={selectedEvaluator ? selectedEvaluator.label : 'Select'}
                style={{ width: '100%' }}
              >
                <FormControl
                  autoFocus
                  className="mx-3 w-auto"
                  placeholder="Type to filter..."
                  onChange={() => {}}
                />
                <Dropdown.Divider />
                {evaluators.map(evaluator => (
                  <Dropdown.Item key={evaluator.value} eventKey={evaluator.value}
                    active={selectedEvaluator && selectedEvaluator.value === evaluator.value}
                    onClick={() => {
                      const active = selectedEvaluator && selectedEvaluator.value === evaluator.value
                      const _configs = JSON.parse(configs)
                      if (active) {
                        setSelectedEvaluator(null)
                        delete _configs.evaluator
                      } else {
                        setSelectedEvaluator(evaluator)
                        const _evaluator = clients.filter(client => {
                          return client.id === evaluator.value
                        })[0]
                        _configs.evaluator = _evaluator.configs
                      }
                      setConfigs(JSON.stringify(_configs, null, '\t'))
                    }}
                  >
                    <div className="mb-n1">
                      {evaluator.label}
                    </div>
                    <small className="text-info">
                      {evaluator.value}
                    </small>
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridConfigs" className="mb-0">
            <Form.Label>Task Configs</Form.Label>
            <AceEditor
              mode='json'
              theme='github'
              value={configs}
              onLoad={editor => {
                editor.renderer.setScrollMargin(8, 8, 8, 8)
              }}
              onChange={setConfigs}
              onValidate={a => setValid(a.every(({ type }) => type !== 'error'))}
              name='TASK_CONFIGS'
              // autoScrollEditorIntoView={true}
              maxLines={12}
              minLines={12}
              // height='128px'
              width='100%'
              editorProps={{ $blockScrolling: true }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' size='lg'
          block
          disabled={!selectedOptimizer || !selectedEvaluator || !valid}
          onClick={() => {
            const msg = {
              type: 'newTask',
              optimizerId: selectedOptimizer.value,
              evaluatorId: selectedEvaluator.value,
              configs: JSON.parse(configs),
            }
            sendMessage(JSON.stringify(msg))

            setShow(false)
            setSelectedOptimizer(null)
            setSelectedEvaluator(null)
            setConfigs(JSON.stringify({
              task: {
                name: null,
              },
            }, null, '\t'))
          }}>
          Create Task
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewTask
