import { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'

const getXY = history => {
  let x = []
  let y = []

  if (!history) {
    return [x, y]
  }

  history.forEach(([, Y]) => {
    y = _.concat(y, Y)
  })
  x = _.range(_.size(y))

  return [x, y]
}

const useEvalHistoryFigure = task => {
  const [figure, setFigure] = useState({
    data: [
      {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
          color: 'red',
        },
      },
    ],
    layout: {
      autosize: true,
      title: 'Evaluation History',
    },
    frames: [],
    config: {},
  })
  const [revision, setRevision] = useState(0)
  const refreshFigure = useCallback(() => {
    setRevision(r => r + 1)
  }, [setRevision])

  useEffect(() => {
    const XY = getXY(task.history)
    setFigure(f => {
      f.data[0].x = XY[0]
      f.data[0].y = XY[1]
      return f
    })
    setRevision(r => r + 1)
  }, [task])

  return [figure, setFigure, refreshFigure, revision]
}

export default useEvalHistoryFigure
