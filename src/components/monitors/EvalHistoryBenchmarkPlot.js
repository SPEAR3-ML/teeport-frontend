import React, { useState, useEffect } from 'react'
// import { d3 } from 'plotly.js'
// const palette = d3.scale.category10().range()
import Color from 'color'
import _ from 'lodash'

import { AutoResizePlot } from '../Utils'
import { getXObjsBests } from '../../utils/helpers'

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
    let objCount = 0
    if (task.history === undefined) return
    task.history.forEach((history, idx) => {
      const [x, objs, bests] = getXObjsBests(history)
      if (x.length) {
        for (let i = 0; i < objs.length; i++) {
          const color = Color(palette[objCount % 10])
          data.push({
            x,
            y: objs[i],
            type: 'scatter',
            mode: 'lines+markers',
            name: `run ${idx} obj${i + 1}`,
            line: {
              color: color.fade(0.9).string(),
              // width: 1,
            },
            marker: {
              color: color.fade(0.1).string(),
              size: 5,
            },
            // legendgroup: `g${i + 1}`,
          })
          // data.push({
          //   x,
          //   y: objs[i],
          //   type: 'scatter',
          //   mode: 'lines',
          //   // name: `obj${i + 1}`,
          //   line: {
          //     color: 'rgba(255, 0, 0, 0.2)',
          //     width: 0.5,
          //   },
          //   legendgroup: `g${i + 1}`,
          //   showlegend: false,
          // })
          data.push({
            x,
            y: bests[i],
            type: 'scatter',
            mode: 'lines',
            name: `run ${idx} obj${i + 1} min`,
            line: {
              color: color.string(),
              dash: 'dashdot',
              // width: 3,
            },
            // legendgroup: `g${i + 1}-min`,
          })
          objCount += 1
        }
      }
    })
    setFigure(f => {
      f.data = data
      return _.clone(f)
      // if (f.data.length !== data.length) {
      //   f.data = data
      // } else {
      //   f.data.forEach((trace, i) => {
      //     trace.x = data[i].x
      //     trace.y = data[i].y
      //   })
      //   f.layout.datarevision += 1
      //   // f.layout = _.clone(f.layout)
      // }
      // return _.clone(f)
    })
  }, [task])

  // useEffect(() => {
  //   console.log(revision)
  // }, [revision])

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
