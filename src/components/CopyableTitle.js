import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const CopyableTitle = ({ title }) => {
  return (
    <Card.Title>
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
            navigator.clipboard.writeText(title)
          } else {
            alert('Copy failed, please copy the id manually')
          }
        }}>
          {title}
        </Button>
      </OverlayTrigger>
    </Card.Title>
  )
}

export default CopyableTitle
