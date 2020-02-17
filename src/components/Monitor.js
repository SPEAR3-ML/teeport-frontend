import React from 'react'
import Plot from 'react-plotly.js'
import styled from 'styled-components'

const AutoResizePlot = styled(Plot)`
  width: 100%;
  height: 100%;
`

const Monitor = ({ figure, setFigure, revision }) => {
  return (
    <AutoResizePlot
      revision={revision}
      useResizeHandler={true}
      data={figure.data}
      layout={figure.layout}
      frames={figure.frames}
      config={figure.config}
      onInitialized={setFigure}
      onUpdated={setFigure}
    />
  )
}

export default Monitor
