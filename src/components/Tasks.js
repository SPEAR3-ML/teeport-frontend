import React from 'react'
import Plot from 'react-plotly.js'
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
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {
              color: 'red',
            },
          },
          {
            type: 'bar',
            x: [1, 2, 3],
            y: [2, 5, 3],
          },
        ]}
        layout={{
          width: 320,
          height: 240,
          title: 'A Fancy Plot',
        }}
      />
    </AboutDiv>
  )
}

export default Tasks
