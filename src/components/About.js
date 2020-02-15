import React from 'react'
import styled from 'styled-components'

import { CenterDiv } from './Utils'
import { grey } from '../plugins/slacPalette'

const AboutDiv = styled(CenterDiv)`
  color: ${grey.normal};
`

const About = () => {
  return (
    <AboutDiv>
      SPEAR3 2019-2020
    </AboutDiv>
  )
}

export default About
