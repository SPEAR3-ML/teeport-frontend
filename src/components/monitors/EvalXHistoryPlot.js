import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import { AutoResizePlot } from '../Utils'
import { getXVars } from '../../utils/helpers'

const EvalXHistoryPlot = ({ task, revision }) => {
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
        return _.clone(f)
      })
    }
  }, [task])

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

export default EvalXHistoryPlot
