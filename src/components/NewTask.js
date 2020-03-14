import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
// import styled from 'styled-components'

// import { grey } from '../plugins/slacPalette'
import useClients from '../hooks/useClients'

Modal.setAppElement('#root')

const NewTask = ({ show, setShow }) => {
  const [clients, sendMessage] = useClients()
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

  return (
    <Modal
      isOpen={show}
      contentLabel='New Task'
    >
      <h2>New Task</h2>
      <div>
        <button onClick={() => setShow(false)}>
          Close
        </button>
      </div>
      <div>
        <label>Choose an optimizer:</label>
        <Select
          value={selectedOptimizer}
          onChange={setSelectedOptimizer}
          options={optimizers}
          isClearable={true}
        />
      </div>
      <div>
        <label>Choose an evaluator:</label>
        <Select
          value={selectedEvaluator}
          onChange={setSelectedEvaluator}
          options={evaluators}
          isClearable={true}
        />
      </div>
      <div>
        <button
          disabled={!selectedOptimizer || !selectedEvaluator}
          onClick={() => {
            const msg = {
              type: 'newTask',
              optimizerId: selectedOptimizer.value,
              evaluatorId: selectedEvaluator.value,
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

export default NewTask
