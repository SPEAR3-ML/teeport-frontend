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
    data: [
      {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
          // color: 'red',
        },
      },
    ],
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
          text: 'evaluated result',
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
    const XY = getXY(task.history)
    setFigure(f => {
      if (_.size(XY[1])) {
        if (typeof XY[1][0] === 'number') {
          if (!_.size(f.data)) {
            f.data.push({
              x: XY[0],
              y: XY[1],
              type: 'scatter',
              mode: 'lines+markers',
            })
          } else {
            f.data[0].x = XY[0]
            f.data[0].y = XY[1]
          }
        } else {
          const dim = _.size(XY[1][0])
          if (!_.size(f.data)) {
            for (let i = 0; i < dim; i++) {
              f.data.push({
                x: XY[0],
                y: XY[1].map(p => p[i]),
                type: 'scatter',
                mode: 'lines+markers',
                name: `obj${i + 1}`,
              })
            }
          } else {
            for (let i = 0; i < dim; i++) {
              f.data[i].x = XY[0]
              f.data[i].y = XY[1].map(p => p[i])
            }
          }
        }
      } else {
        if (_.size(f.data)) {
          f.data = []
        }
      }
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
