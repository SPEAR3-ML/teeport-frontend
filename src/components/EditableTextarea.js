import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import TextareaAutosize from 'react-autosize-textarea'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

const moveCaretAtEnd = e => {
  const _value = e.target.value
  e.target.value = ''
  e.target.value = _value
}

const EditableTextarea = ({ current, placeholder, onConfirm, status }) => {
  const validCurrent = current || ''
  const [text, setText] = useState(validCurrent)
  const [editing, setEditing] = useState(false)
  const [focus, setFocus] = useState(false)
  const [textareFocus, setTextareaFocus] = useState(false) // sync focus status
  const [scrollContainer, setScrollContainer] = useState(null)
  const [viewScrollBar, setViewScrollBar] = useState(null)

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.scrollTop = Number.MAX_SAFE_INTEGER
    }
  }, [scrollContainer])

  // update view scroll when status changed
  useEffect(() => {
    if (viewScrollBar) {
      viewScrollBar.updateScroll()
    }
  }, [viewScrollBar, status])

  if (editing) {
    return (
      <div className='d-flex flex-column flex-grow-1'
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <div
          className='flex-grow-1 overflow-auto form-control'
          style={{
            padding: 0,
            borderRadius: '4px 4px 0 0',
            marginBottom: -1,
            borderColor: textareFocus ? '#e23e3e' : '#ced4da',
            boxShadow: textareFocus ? '0 0 0 0.2rem rgba(140, 21, 21, 0.25)' : null,
            outline: textareFocus ? 0 : 1,
            zIndex: textareFocus ? 2 : 0,
          }}
        >
          <PerfectScrollbar
            containerRef={setScrollContainer}
            options={{
              wheelPropagation: false,
            }}
          >
            <TextareaAutosize
              className='w-100 d-block border-0'
              autoFocus
              value={text}
              onChange={e => setText(e.target.value)}
              onFocus={e => {
                setTextareaFocus(true)
                moveCaretAtEnd(e)
                setFocus(true)
              }}
              onBlur={() => {
                setTextareaFocus(false)
                if (!focus) {
                  onConfirm(text)
                  setFocus(false)
                  setEditing(false)
                }
              }}
              style={{
                // lineHeight: 1.3,
                outline: 0,
                paddingTop: 6,
                paddingBottom: 6,
                paddingLeft: 12,
                paddingRight: 12,
              }}
            />
          </PerfectScrollbar>
        </div>
        <ButtonGroup aria-label='Desc control'>
          <Button
            onClick={() => {
              setText(validCurrent)
              setFocus(false)
              setEditing(false)
            }}
            variant='outline-secondary'
            style={{ borderRadius: '0 0 0 4px' }}
          >
            Cancel
          </Button>
          <Button disabled={text === validCurrent}
            onClick={() => {
              onConfirm(text)
              setFocus(false)
              setEditing(false)
            }}
            variant='outline-secondary'
            style={{ borderRadius: '0 0 4px 0' }}
          >
            Confirm
          </Button>
        </ButtonGroup>
      </div>
    )
  } else {
    return (
      <div
        className='flex-grow-1 text-secondary bg-light rounded overflow-auto'
        onClick={() => setEditing(true)}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        <PerfectScrollbar ref={setViewScrollBar}>
          <div style={{
            fontStyle: 'italic',
            // lineHeight: 1.3,
            marginTop: 7,
            marginBottom: 7,
            marginLeft: 13,
            marginRight: 13,
          }}>
            {text}
          </div>
        </PerfectScrollbar>
      </div>
    )
  }
}

export default EditableTextarea
