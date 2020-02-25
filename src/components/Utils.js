import React from 'react'
import styled from 'styled-components'
import Plot from 'react-plotly.js'
// import { grey } from 'material-colors'

import { red, grey } from '../plugins/slacPalette'

export const CenterDiv = styled.div`
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

const FillDiv = styled.div`
  position: relative;
  height: 100%;
  opacity: ${({ dimmed }) => dimmed ? 0.6 : 1};
`

const HandlerDiv = styled.div`
  height: 24px;
  border-radius: 4px 4px 0px 0px;
  background-color:  ${({ active }) => active ? red.normal : grey.normal};
  text-align: center;
  color: white;
  border-style: solid;
  border-width: 1px;
  border-color:  ${({ active }) => active ? red.normal : grey.normal};
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
  border-color: ${({ active }) => active ? red.normal : grey.normal};
`

export const DraggableDiv = props => {
  return (
    <FillDiv dimmed={props.dimmed}>
      <HandlerDiv className='drag-handler' active={props.active}>
        {props.title}
      </HandlerDiv>
      <ContentDiv active={props.active}>
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
