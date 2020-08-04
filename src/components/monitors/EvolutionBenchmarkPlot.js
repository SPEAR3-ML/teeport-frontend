import React, { useState, useEffect } from 'react'
import Color from 'color'
import _ from 'lodash'

import { AutoResizePlot } from '../Utils'
import {
  getCurrentFrontParetoFrontGenIdx, xyToSteps,
  syncLegendStatusByGroup,
} from '../../utils/helpers'

import palette from '../../plugins/plotlyPalette'

const EvolutionBenchmarkPlot = ({ taskId, task, recent, revision }) => {
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
          text: 'obj1',
        },
      },
      yaxis: {
        title: {
          text: 'obj2',
        },
      },
      hovermode: 'closest',
    },
    frames: [],
    config: {
      displaylogo: false,
      toImageButtonOptions: {
        format: 'png', // one of png, svg, jpeg, webp
        filename: `evolution_${taskId}`,
        height: 600,
        width: 600,
        scale: 2,
      },
    },
  })

  useEffect(() => {
    if (task.history === undefined) return
    const data = []
    task.history.forEach((history, idx) => {
      const [current, pareto, genIdx] = getCurrentFrontParetoFrontGenIdx(history)
      if (genIdx !== -1) {
        const color = Color(palette[0])
        if (task.status !== 'completed' && // task not completed
            idx === task.history.length - 1) { // the current run
          data.push({
            x: current[0],
            y: current[1],
            type: 'scatter',
            mode: 'markers',
            name: `current run (${idx})`,
            marker: {
              color: color.fade(0.2).string(),
            },
            legendgroup: 'current',
          })
          const steps = xyToSteps(pareto)
          data.push({
            x: steps[0],
            y: steps[1],
            type: 'scatter',
            mode: 'lines',
            name: 'current HV shape',
            // showlegend: false,
            line: {
              color: color.string(),
              dash: 'dashdot',
              // width: 1,
            },
            legendgroup: 'current',
          })
          data.push({
            x: pareto[0],
            y: pareto[1],
            type: 'scatter',
            mode: 'markers',
            name: 'current Pareto frontier',
            // showlegend: false,
            marker: {
              color: color.darken(0.5).string(),
              symbol: 'cross',
              size: 8,
            },
            legendgroup: 'current',
          })
        } else {
          const steps = xyToSteps(pareto)
          data.push({
            x: steps[0],
            y: steps[1],
            type: 'scatter',
            mode: 'lines',
            name: 'history runs',
            showlegend: !idx,
            line: {
              color: color.fade(0.8).string(),
              // dash: 'dashdot',
              width: 1,
            },
            legendgroup: 'history',
          })
          data.push({
            x: pareto[0],
            y: pareto[1],
            type: 'scatter',
            mode: 'markers',
            name: 'history Pareto frontiers',
            showlegend: !idx,
            marker: {
              color: color.darken(0.5).fade(0.8).string(),
              symbol: 'cross',
              // size: 8,
            },
            legendgroup: 'history',
          })
          // store the data for stats later
          // xList.push(x)
          // bestsList.push(bests)
        }
      }
    })
    setFigure(f => {
      syncLegendStatusByGroup(f.data, data)

      f.data = data
      return _.clone(f)
    })
  }, [task, recent])

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

export default EvolutionBenchmarkPlot
