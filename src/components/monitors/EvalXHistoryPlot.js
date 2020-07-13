import React, { useState, useEffect } from 'react'
import Color from 'color'
import _ from 'lodash'

import { AutoResizePlot } from '../Utils'
import { getXVars } from '../../utils/helpers'

import palette from '../../plugins/plotlyPalette'

const EvalXHistoryPlot = ({ taskId, task, revision }) => {
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
    config: {
      displaylogo: false,
      toImageButtonOptions: {
        format: 'png', // one of png, svg, jpeg, webp
        filename: `evaluation-x-history_${taskId}`,
        height: 600,
        width: 1200,
        scale: 2,
      },
    },
  })

  useEffect(() => {
    const [x, vars] = getXVars(task.history)
    if (x.length) {
      const data = []
      for (let i = 0; i < vars.length; i++) {
        const color = Color(palette[i % 10])
        data.push({
          x,
          y: vars[i],
          type: 'scattergl',
          // mode: 'lines+markers',
          mode: 'lines',
          name: `var${i + 1}`,
          line: {
            color: color.fade(0.1).string(),
            // width: 1,
          },
          // marker: {
          //   color: color.fade(0.8).string(),
          //   size: 5,
          // },
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
          f.data = _.clone(f.data)
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
