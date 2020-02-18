import React, { useState, useEffect, useCallback } from 'react'
import Plot from 'react-plotly.js'
import styled from 'styled-components'
import _ from 'lodash'

const AutoResizePlot = styled(Plot)`
  width: 100%;
  height: 100%;
`

const getXY = history => {
  let x = []
  let y = []

  if (!history) {
    return [x, y]
  }

  history.forEach(([, Y]) => {
    y = _.concat(y, Y)
  })
  x = _.range(_.size(y))

  return [x, y]
}

const useEvalHistoryPlot = task => {
  const [figure, setFigure] = useState({
    data: [
      {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
          color: 'red',
        },
      },
    ],
    layout: {
      autosize: true,
      title: 'Evaluation History',
    },
    frames: [],
    config: {},
  })
  const [revision, setRevision] = useState(0)
  const refreshPlot = useCallback(() => {
    setRevision(r => r + 1)
  }, [setRevision])

  useEffect(() => {
    const XY = getXY(task.history)
    setFigure(f => {
      f.data[0].x = XY[0]
      f.data[0].y = XY[1]
      return f
    })
    setRevision(r => r + 1)
  }, [task])

  // useEffect(() => {
  //   console.log(revision)
  // }, [revision])

  return [
    <AutoResizePlot
      revision={revision}
      useResizeHandler={true}
      data={figure.data}
      layout={figure.layout}
      frames={figure.frames}
      config={figure.config}
      onInitialized={setFigure}
      onUpdated={setFigure}
    />,
    refreshPlot,
  ]
}

export default useEvalHistoryPlot
