import React, { useState, useEffect, useCallback } from 'react'

import { AutoResizePlot } from '../components/Utils'

const getObj1Obj2GenIdx = (history, recent = 1) => {
  const generations = []
  for (let i = 0; i < recent; i++) {
    if (!history) {
      break
    }
    const genIdx = history.length - i
    if (genIdx < 1) {
      break
    }

    const Y = history[genIdx - 1][1]
    const obj1 = Y.map(p => p[0])
    const obj2 = Y.map(p => {
      if (p.length < 2) {
        return 0
      } else {
        return p[1]
      }
    })

    generations.push([obj1, obj2, genIdx])
  }
  return generations
}

const useEvolutionPlot = (task, recent = 5) => {
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
    },
    frames: [],
    config: {},
  })
  const [revision, setRevision] = useState(0)
  const refreshPlot = useCallback(() => {
    setRevision(r => r + 1)
  }, [setRevision])

  useEffect(() => {
    const generations = getObj1Obj2GenIdx(task.history, recent)
    setFigure(f => {
      f.data = []
      generations.forEach(([obj1, obj2, genIdx], i) => {
        f.data.push({
          x: obj1,
          y: obj2,
          type: 'scatter',
          mode: 'markers',
          name: `gen ${genIdx}`,
          marker: {
            opacity: Math.pow(0.4, i),
            color: 'red',
          },
        })
      })
      return f
    })
    setRevision(r => r + 1)
  }, [task, recent])

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

export default useEvolutionPlot
