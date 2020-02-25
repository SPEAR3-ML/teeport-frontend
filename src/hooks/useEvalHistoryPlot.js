import React, { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'

import { AutoResizePlot } from '../components/Utils'

const getXY = history => {
  let x = []
  let y = []

  if (!history) {
    return [x, y]
  }

  history.forEach(([, Y]) => {
    y = _.concat(y, Y)
  })
  x = _.range(1, _.size(y) + 1)

  return [x, y]
}

const useEvalHistoryPlot = task => {
  const [figure, setFigure] = useState({
    data: [],
    layout: {
      autosize: true,
      margin: {
        l: 64,
        r: 64,
        b: 64,
        t: 64,
        pad: 4,
      },
      xaxis: {
        title: {
          text: 'evaluation index',
        },
      },
      yaxis: {
        title: {
          text: 'evaluation result',
        },
      },
      // title: 'Evaluation History',
    },
    frames: [],
    config: {},
  })
  const [revision, setRevision] = useState(0)
  const refreshPlot = useCallback(() => {
    setRevision(r => r + 1)
  }, [setRevision])

  useEffect(() => {
    const [x, Y] = getXY(task.history)
    if (x.length) {
      const data = []
      for (let i = 0; i < Y[0].length; i++) {
        data.push({
          x,
          y: Y.map(p => p[i]),
          type: 'scatter',
          mode: 'lines+markers',
          name: `obj${i + 1}`,
          marker: {
            opacity: 0.4,
          },
        })
      }
      setFigure(f => {
        f.data = data
        return f
      })
      setRevision(r => r + 1)
    }
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
