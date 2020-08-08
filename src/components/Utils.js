import React, { forwardRef } from 'react'
import styled from 'styled-components'
import Plot from 'react-plotly.js'
import Button from 'react-bootstrap/Button'
// import { grey } from 'material-colors'

import { red, grey, blue, purple } from '../plugins/slacPalette'

export const CenterDiv = styled.div`
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

const FillDiv = styled.div`
  position: relative;
  border-radius: 4px 4px 0px 0px;
  height: 100%;
  opacity: ${({ dimmed }) => dimmed ? 0.6 : 1};
  box-shadow: ${({ selected }) => selected ? '0px 0px 2px 1px ' + blue.normal : '0px'};
`

const HandlerDiv = styled.div`
  height: 24px;
  border-radius: 4px 4px 0px 0px;
  background-color:  ${({ active, type }) => active ? red.normal
    : !type ? grey.normal : purple.dark
  };
  text-align: center;
  color: white;
  border-style: solid;
  border-width: 1px;
  border-color:  ${({ active, type }) => active ? red.normal
    : !type ? grey.normal : purple.dark
  };
  user-select: none;
`

const ContentDiv = styled.div`
  position: absolute;
  top: 24px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ active, type }) => active ? red.normal
    : !type ? grey.normal : purple.dark
  };
`

export const DraggableDiv = props => {
  return (
    <FillDiv dimmed={props.dimmed} selected={props.selected}>
      <HandlerDiv className='drag-handler' active={props.active} type={props.type}>
        {props.title}
      </HandlerDiv>
      <ContentDiv active={props.active} type={props.type}>
        {props.children}
      </ContentDiv>
    </FillDiv>
  )
}

export const AutoResizePlot = styled(Plot)`
  width: 100%;
  height: 100%;
`

export const FlexFrame = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`

export const FlexScrollContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`

export const ToggleNoCaret = forwardRef(({
  children, onClick, variant, size,
}, ref) => (
  <Button
    className='rounded'
    ref={ref}
    variant={variant}
    size={size}
    onClick={e => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
  </Button>
))
