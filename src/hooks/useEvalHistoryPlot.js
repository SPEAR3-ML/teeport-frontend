import React, { useState, useEffect, useCallback } from 'react'
// import Plotly from 'plotly.js/lib/core'
import _ from 'lodash'

import { AutoResizePlot } from '../components/Utils'

// const palette = Plotly.d3.scale.category10().range()

const getXObjsBests = history => {
  let x = []
  let y = []
  const objs = []
  const bests = []

  if (history && history.length) {
    history.forEach(([, Y]) => {
      y = _.concat(y, Y)
    })
    x = _.range(1, _.size(y) + 1)
    for (let i = 0; i < y[0].length; i++) {
      const obj = y.map(p => p[i])
      objs.push(obj)
      const best = []
      let min = obj[0]
      for (let j = 0; j < obj.length; j++) {
        min = Math.min(min, obj[j])
        best.push(min)
      }
      bests.push(best)
    }
  }

  return [x, objs, bests]
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
    const [x, objs, bests] = getXObjsBests(task.history)
    if (x.length) {
      const data = []
      for (let i = 0; i < objs.length; i++) {
        data.push({
          x,
          y: objs[i],
          type: 'scatter',
          mode: 'lines+markers',
          name: `obj${i + 1}`,
          marker: {
            opacity: 0.4,
          },
        })
        data.push({
          x,
          y: bests[i],
          type: 'scatter',
          mode: 'lines',
          name: `obj${i + 1} min`,
          line: {
            dash: 'dashdot',
            // width: 3,
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
