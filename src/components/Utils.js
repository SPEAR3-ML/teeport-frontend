import React from 'react'
import styled from 'styled-components'
// import { grey } from 'material-colors'

import { grey } from '../plugins/slacPalette'

export const CenterDiv = styled.div`
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

const FillDiv = styled.div`
  position: relative;
  height: 100%;
`

const HandlerDiv = styled.div`
  height: 24px;
  border-radius: 4px 4px 0px 0px;
  background-color: ${grey.normal};
  text-align: center;
  color: white;
  border-style: solid;
  border-width: 1px;
  border-color: ${grey.normal};
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
  border-color: ${grey.normal};
`

export const DraggableDiv = props => {
  return (
    <FillDiv>
      <HandlerDiv className='drag-handler'>
        {props.title}
      </HandlerDiv>
      <ContentDiv>
        {props.children}
      </ContentDiv>
    </FillDiv>
  )
}
