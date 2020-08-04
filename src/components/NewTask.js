import React, { useState } from 'react'
// import Modal from 'react-modal'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'
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
        <div style={{ marginBottom: 16 }}>
          <h6>Choose an optimizer</h6>
          <Select
            styles={{ menu: styles => ({ ...styles, zIndex: 999 }) }}
            value={selectedOptimizer}
            onChange={selected => {
              setSelectedOptimizer(selected)
              const _configs = JSON.parse(configs)
              if (selected !== null) {
                const optimizer = clients.filter(client => {
                  return client.id === selected.value
                })[0]
                _configs.optimizer = optimizer.configs
              } else {
                delete _configs.optimizer
              }
              setConfigs(JSON.stringify(_configs, null, '\t'))
            }}
            options={optimizers}
            isClearable={true}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <h6>Choose an evaluator</h6>
          <Select
            styles={{ menu: styles => ({ ...styles, zIndex: 999 }) }}
            value={selectedEvaluator}
            onChange={selected => {
              setSelectedEvaluator(selected)
              const _configs = JSON.parse(configs)
              if (selected !== null) {
                const evaluator = clients.filter(client => {
                  return client.id === selected.value
                })[0]
                _configs.evaluator = evaluator.configs
              } else {
                delete _configs.evaluator
              }
              setConfigs(JSON.stringify(_configs, null, '\t'))
            }}
            options={evaluators}
            isClearable={true}
          />
        </div>
        <div>
          <h6>Task configs</h6>
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant='primary'
          disabled={!selectedOptimizer || !selectedEvaluator || !valid}
          onClick={() => {
            const msg = {
              type: 'newTask',
              optimizerId: selectedOptimizer.value,
              evaluatorId: selectedEvaluator.value,
              configs: JSON.parse(configs),
            }
            sendMessage(JSON.stringify(msg))
          }}
        >
          Create Task
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewTask
