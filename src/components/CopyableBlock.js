import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'

const CopyableBlock = ({ value }) => {
  return (
    <OverlayTrigger
      placement='bottom'
      delay={{ show: 1000, hide: 100 }}
      overlay={
        <Tooltip id='button-tooltip-2'>
          Click to copy
        </Tooltip>
      }
    >
      <Button size='lg' variant='light' block onClick={() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(value)
        } else {
          alert('Copy failed, please copy the id manually')
        }
      }}>
        {value}
      </Button>
    </OverlayTrigger>
  )
}

export default CopyableBlock
