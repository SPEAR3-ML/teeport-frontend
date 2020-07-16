import React, { useState, useEffect } from 'react'
import Color from 'color'
import _ from 'lodash'

import { AutoResizePlot } from '../Utils'
import { getObj1Obj2GenIdx } from '../../utils/helpers'

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
      const generations = getObj1Obj2GenIdx(task.history, recent)
      generations.forEach(([obj1, obj2, genIdx], i) => {
        data.push({
          x: obj1,
          y: obj2,
          type: 'scatter',
          mode: 'markers',
          name: `${task.name} gen ${genIdx}`,
          marker: {
            opacity: Math.pow(0.4, i),
            color: color.string(),
          },
        })
      })
    })

    setFigure(f => {
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
