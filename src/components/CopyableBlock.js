import React, { useState, useRef, useEffect } from 'react'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'

import { setClipboard } from '../utils/helpers'

const CopyableBlock = ({ value }) => {
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)
  const [tip, setTip] = useState('Click to copy')
  const target = useRef(null)

  const unknown = value === undefined || value === null

  useEffect(() => {
    // if not hovered
    if (!hover) {
      return setShow(false)
    }

    // if tooltip is not showing, show it after 0.8s
    if (!show) {
      const timer = setTimeout(() => {
        if (unknown) {
          setTip('This field is missing')
        } else {
          setTip('Click to copy')
        }
        setShow(true)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [hover, show, unknown])

  return (
    <>
      <Button size='lg' variant='light' block
        ref={target}
        className={unknown ? 'text-primary' : ''}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          if (unknown) {
            setTip('I refuse to copy this!')
          } else {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(value)
            } else { // polyfill for http protocol
              setClipboard(value)
              // alert('Copy failed, please copy the content manually')
            }
            setTip('Copied to clipboard!')
          }
          setShow(true)
        }}
      >
        {unknown ? 'Unknown' : value}
      </Button>
      <Overlay target={target.current}
        show={show} placement='bottom'
        shouldUpdatePosition={true}
      >
        {props => (<Tooltip {...props}>{tip}</Tooltip>)}
      </Overlay>
    </>
  )
}

export default CopyableBlock
