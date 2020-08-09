import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'

import { setClipboard } from '../utils/helpers'

const CopyableBlock = ({ value }) => {
  const unknown = value === undefined || value === null
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
      <Button size='lg' variant='light' block
        className={unknown ? 'text-primary' : ''}
        onClick={unknown ? null : () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(value)
          } else { // polyfill for http protocol
            setClipboard(value)
            // alert('Copy failed, please copy the content manually')
          }
        }}
      >
        {unknown ? 'Unknown' : value}
      </Button>
    </OverlayTrigger>
  )
}

export default CopyableBlock
