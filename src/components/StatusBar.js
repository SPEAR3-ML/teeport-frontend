import React from 'react'
// import { useHistory } from 'react-router-dom'
import _ from 'lodash'

const StatusBar = ({
  tasksNum, selected,
}) => {
  // const history = useHistory()
  const selectedTasksNum = _.size(selected)

  return (
    <div className='d-flex flex-row flex-grow-0 bg-dark py-1'
      style={{
        boxShadow: '0 -0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
        zIndex: 1,
      }}
    >
      <small className='flex-grow-1 text-light text-center'>
        {selectedTasksNum
          ? `selected ${selectedTasksNum} task${selectedTasksNum > 1 ? 's' : ''}`
          : `total ${tasksNum} task${tasksNum > 1 ? 's' : ''}`
        }
      </small>
    </div>
  )
}

export default StatusBar
