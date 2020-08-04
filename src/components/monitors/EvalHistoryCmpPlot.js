import React, { useState, useEffect } from 'react'
// import { d3 } from 'plotly.js'
// const palette = d3.scale.category10().range()
import Color from 'color'
import _ from 'lodash'

import { AutoResizePlot } from '../Utils'
import { getXObjsBests, getObjsVars, syncLegendStatusByName } from '../../utils/helpers'

import palette from '../../plugins/plotlyPalette'

const EvalHistoryCmpPlot = ({ taskIds, tasks, revision }) => {
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
    },
    frames: [],
    config: {
      displaylogo: false,
      toImageButtonOptions: {
        format: 'png', // one of png, svg, jpeg, webp
        filename: 'evaluation-history_cmp',
        height: 600,
        width: 1200,
        scale: 2,
      },
    },
  })

  useEffect(() => {
    const data = []
    tasks.forEach((task, idx) => {
      const [x, objs, bests] = getXObjsBests(task.history)
      if (x.length) {
        const color = Color(palette[idx % 10])
        for (let i = 0; i < objs.length; i++) {
          data.push({
            x,
            y: objs[i],
            type: 'scatter',
            mode: 'lines+markers',
            name: `${task.name} obj${i + 1}`,
            line: {
              color: color.darken(0.5 * i).fade(0.9).string(),
              // width: 1,
            },
            marker: {
              color: color.darken(0.5 * i).fade(0.1).string(),
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
            name: `${task.name} obj${i + 1} min`,
            line: {
              color: color.darken(0.5 * i).string(),
              dash: 'dashdot',
              // width: 3,
            },
            // legendgroup: `g${i + 1}-min`,
          })
        }
      }
    })
    setFigure(f => {
      syncLegendStatusByName(f.data, data)

      f.data = data
      return _.clone(f)
    })
  }, [tasks])

  const showPointsInfo = data => {
    if (data === undefined) {
      return
    }

    const [Y, X] = getObjsVars(tasks[0].history)
    const pointsInfo = data.points.map(d => [Y[d.x - 1], X[d.x - 1]])
    console.log(pointsInfo)
  }

  const hidePointsInfo = () => {
    console.log('haha')
  }

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
      onSelected={showPointsInfo}
      onDeselect={hidePointsInfo}
    />
  )
}

export default EvalHistoryCmpPlot
