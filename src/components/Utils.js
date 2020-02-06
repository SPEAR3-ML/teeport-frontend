import React from 'react'
import styled from 'styled-components'
// import { grey } from 'material-colors'

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
  height: 16px;
  border-radius: 4px 4px 0px 0px;
  background-color: #A79E70;
`

const ContentDiv = styled.div`
  position: absolute;
  top: 16px;
  bottom: 0px;
  width: 100%;
  background-color: white;
`

export const DraggableDiv = props => {
  return (
    <FillDiv>
      <HandlerDiv className='drag-handler'>
      </HandlerDiv>
      <ContentDiv>
        {props.children}
      </ContentDiv>
    </FillDiv>
  )
}
