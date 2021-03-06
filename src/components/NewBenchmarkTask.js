import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
// import styled from 'styled-components'

// import { grey } from '../plugins/slacPalette'

Modal.setAppElement('#root')

const NewBenchmarkTask = ({ show, setShow, clients, sendMessage }) => {
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
      runNumber: 10,
    },
  }, null, '\t'))
  const [valid, setValid] = useState(false)

  return (
    <Modal
      isOpen={show}
      contentLabel='New Benchmark Task'
    >
      <h2>New Benchmark Task</h2>
      <div>
        <button onClick={() => setShow(false)}>
          Close
        </button>
      </div>
      <div>
        <label>Choose an optimizer:</label>
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
      <div>
        <label>Choose an evaluator:</label>
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
        <label>Task configs:</label>
        <AceEditor
          mode='json'
          theme='github'
          value={configs}
          onChange={setConfigs}
          onValidate={a => setValid(a.every(({ type }) => type !== 'error'))}
          name='TASK_CONFIGS'
          height='128px'
          width='100%'
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      <div>
        <button
          disabled={!selectedOptimizer || !selectedEvaluator || !valid}
          onClick={() => {
            const msg = {
              type: 'newBenchmarkTask',
              optimizerId: selectedOptimizer.value,
              evaluatorId: selectedEvaluator.value,
              configs: JSON.parse(configs),
            }
            sendMessage(JSON.stringify(msg))
          }}
        >
          Start Task
        </button>
      </div>
    </Modal>
  )
}

export default NewBenchmarkTask
