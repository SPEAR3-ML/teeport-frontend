import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import { AutoResizePlot } from '../components/Utils'
import { getXObjsBests, getObjsVars } from '../utils/helpers'
// const palette = Plotly.d3.scale.category10().range()

const EvalHistoryPlot = ({ task, revision }) => {
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
        return _.clone(f)
      })
    }
  }, [task])

  const showPointsInfo = data => {
    if (data === undefined) {
      return
    }

    const [Y, X] = getObjsVars(task.history)
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

export default EvalHistoryPlot
