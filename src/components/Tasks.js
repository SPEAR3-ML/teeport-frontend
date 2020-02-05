import React from 'react'
import styled from 'styled-components'

const CenterDiv = styled.div`
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

const AboutDiv = styled(CenterDiv)`
  color: #4D4F53;
`

const Tasks = () => {
  return (
    <AboutDiv>
      Tasks
    </AboutDiv>
  )
}

export default Tasks
