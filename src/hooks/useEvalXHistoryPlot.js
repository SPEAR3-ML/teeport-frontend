import React, { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'

import { AutoResizePlot } from '../components/Utils'

const getXVars = history => {
  let x = []
  let y = [] // decision variables
  const vars = []

  if (history && history.length) {
    history.forEach(([X]) => {
      y = _.concat(y, X)
    })
    x = _.range(1, _.size(y) + 1)
    for (let i = 0; i < y[0].length; i++) {
      const v = y.map(d => d[i])
      vars.push(v)
    }
  }

  return [x, vars]
}

const useEvalXHistoryPlot = task => {
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
          text: 'decision variable',
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
    const [x, vars] = getXVars(task.history)
    if (x.length) {
      const data = []
      for (let i = 0; i < vars.length; i++) {
        data.push({
          x,
          y: vars[i],
          type: 'scatter',
          mode: 'lines+markers',
          name: `var${i + 1}`,
          marker: {
            opacity: 0.4,
          },
        })
      }
      setFigure(f => {
        if (!f.data.length) {
          f.data = data
        } else {
          f.data.forEach((trace, i) => {
            trace.x = data[i].x
            trace.y = data[i].y
          })
        }
        return f
      })
      setRevision(r => r + 1)
    }
  }, [task])

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

export default useEvalXHistoryPlot
