import React, { useState, useEffect } from 'react'
// import { d3 } from 'plotly.js'
// const palette = d3.scale.category10().range()
import Color from 'color'
import _ from 'lodash'

import { AutoResizePlot } from '../Utils'
import { getXObjsBests, calcMeanUpperLower, syncLegendStatus } from '../../utils/helpers'

import palette from '../../plugins/plotlyPalette'

const EvalHistoryBenchmarkPlot = ({ taskId, task, revision }) => {
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
      legend: {
        // orientation: 'h',
      },
      // title: 'Evaluation History',
      // datarevision: 0,
    },
    frames: [],
    config: {
      displaylogo: false,
      toImageButtonOptions: {
        format: 'png', // one of png, svg, jpeg, webp
        filename: 'evaluation-history_benchmark',
        height: 600,
        width: 1200,
        scale: 2,
      },
    },
  })

  useEffect(() => {
    const data = []
    const xList = []
    const bestsList = []
    if (task.history === undefined) return
    task.history.forEach((history, idx) => {
      const [x, objs, bests] = getXObjsBests(history)
      if (x.length) {
        if (['cancelled', 'completed'].indexOf(task.status) === -1 && // task not finished
            idx === task.history.length - 1) { // the current run
          for (let i = 0; i < objs.length; i++) {
            const color = Color(palette[i % 10])
            data.push({
              x,
              y: objs[i],
              type: 'scatter',
              mode: 'lines+markers',
              name: `obj${i + 1} current run (${idx})`,
              showlegend: true,
              line: {
                color: color.fade(0.9).string(),
                // width: 1,
              },
              marker: {
                color: color.fade(0.1).string(),
                size: 5,
              },
              legendgroup: 'current',
            })
            data.push({
              x,
              y: bests[i],
              type: 'scatter',
              mode: 'lines',
              name: `obj${i + 1} current run (${idx})`,
              showlegend: false,
              line: {
                color: color.string(),
                dash: 'dashdot',
                // width: 3,
              },
              legendgroup: 'current',
            })
          }
        } else {
          for (let i = 0; i < objs.length; i++) {
            const color = Color(palette[i % 10])
            data.push({
              x,
              y: bests[i],
              type: 'scatter',
              mode: 'lines',
              name: `obj${i + 1} history runs`,
              showlegend: !idx,
              // opacity: 0.2,
              line: {
                color: color.fade(0.8).string(),
                // dash: 'dashdot',
                width: 1,
              },
              legendgroup: 'history',
            })
          }
          // store the data for stats later
          xList.push(x)
          bestsList.push(bests)
        }
      }
    })
    // Add the mean and sigma curve for the history runs
    if (!_.isEmpty(bestsList)) {
      const [mean, upper, lower] = calcMeanUpperLower(bestsList)
      const x = xList[0]
      for (let i = 0; i < mean.length; i++) {
        const color = Color(palette[i % 10])
        // mean
        data.push({
          x,
          y: mean[i],
          type: 'scatter',
          mode: 'lines',
          name: `obj${i + 1} mean`,
          line: {
            color: color.string(),
            // dash: 'dashdot',
            // width: 1,
          },
          legendgroup: 'stats',
        })
        // std
        data.push({
          x: x.concat(x.slice().reverse()),
          y: upper[i].concat(lower[i].reverse()),
          type: 'scatter',
          fill: 'tozeroy',
          name: `obj${i + 1} std`,
          fillcolor: color.fade(0.8).string(),
          line: {
            color: 'transparent',
          },
          legendgroup: 'stats',
        })
      }
    }
    setFigure(f => {
      // keep the legend show/hide status
      syncLegendStatus(f.data, data)

      f.data = data
      return _.clone(f)
    })
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

export default EvalHistoryBenchmarkPlot
