import React, { useState, useEffect } from 'react'
import Color from 'color'
import _ from 'lodash'

import { AutoResizePlot } from '../Utils'
import {
  getCurrentFrontParetoFrontGenIdx,
  xyToSteps,
  syncLegendStatusByName,
} from '../../utils/helpers'

import palette from '../../plugins/plotlyPalette'

const EvolutionCmpPlot = ({ taskIds, tasks, recent, revision }) => {
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
        filename: 'evolution_cmp',
        height: 600,
        width: 600,
        scale: 2,
      },
    },
  })

  useEffect(() => {
    const data = []
    tasks.forEach((task, idx) => {
      const color = Color(palette[idx % 10])
      const [current, pareto, genIdx] = getCurrentFrontParetoFrontGenIdx(task.history)
      if (genIdx === -1) return

      data.push({
        x: current[0],
        y: current[1],
        type: 'scatter',
        mode: 'markers',
        name: `${task.name} current (${genIdx})`,
        marker: {
          color: color.fade(0.2).string(),
        },
      })
      const steps = xyToSteps(pareto)
      data.push({
        x: steps[0],
        y: steps[1],
        type: 'scatter',
        mode: 'lines',
        name: `${task.name} HV shape`,
        line: {
          color: color.string(),
          dash: 'dashdot',
          // width: 1,
        },
      })
      data.push({
        x: pareto[0],
        y: pareto[1],
        type: 'scatter',
        mode: 'markers',
        name: `${task.name} Pareto frontier`,
        marker: {
          color: color.darken(0.5).string(),
          symbol: 'cross',
          size: 8,
        },
      })
    })

    setFigure(f => {
      syncLegendStatusByName(f.data, data)

      f.data = data
      return _.clone(f)
    })
  }, [tasks, recent])

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

export default EvolutionCmpPlot
