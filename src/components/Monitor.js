import React from 'react'
import Plotly from 'plotly.js-basic-dist-min'
import createPlotlyComponent from 'react-plotly.js/factory'
import styled from 'styled-components'

const Plot = createPlotlyComponent(Plotly)

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
