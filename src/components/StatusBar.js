import React from 'react'
import _ from 'lodash'

const StatusBar = ({
  count, type, selected,
}) => {
  const selectedCount = _.size(selected)

  return (
    <div className='d-flex flex-row flex-grow-0 bg-dark py-1'
      style={{
        boxShadow: '0 -0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
        zIndex: 1,
      }}
    >
      <small className='flex-grow-1 text-light text-center'>
        {selectedCount
          ? `selected ${selectedCount} ${type}${selectedCount > 1 ? 's' : ''}`
          : `total ${count} ${type}${count > 1 ? 's' : ''}`
        }
      </small>
    </div>
  )
}

export default StatusBar
