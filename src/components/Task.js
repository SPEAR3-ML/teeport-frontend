import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Plot from 'react-plotly.js'
import styled from 'styled-components'
import _ from 'lodash'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { selectLayout } from '../redux/selectors'
import { updateLayout } from '../redux/actions'
import { DraggableDiv } from './Utils'
import useTask from '../hooks/useTask'

const ReactGridLayout = WidthProvider(GridLayout)

const AutoResizePlot = styled(Plot)`
  width: 100%;
  height: 100%;
`

const generateLayout = (size, columnNum = 2) => {
  const layout = []
  const width = 12 / columnNum
  const height = 12
  for (let i = 0; i < size; i++) {
    const c = i % columnNum
    const r = Math.floor(i / columnNum)
    const item = {
      i: `${i + 1}`,
      x: c * width,
      y: r * height,
      w: width,
      h: height,
      minW: 3,
      maxW: 12,
      minH: height,
      maxH: 4 * height,
    }
    layout.push(item)
  }
  return layout
}

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

const Task = () => {
  const { taskId } = useParams()
  const task = useTask(taskId)
  const layout = useSelector(selectLayout(taskId))
  const dispatch = useDispatch()
  useEffect(() => {
    if (!_.size(layout)) {
      const newLayout = generateLayout(1)
      dispatch(updateLayout(taskId, newLayout))
    }
  }, [taskId, layout, dispatch])

  const { history } = task
  const [x, y] = getXY(history)
  const [revision, setRevision] = useState(0)
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
  useEffect(() => {
    if (_.size(x) !== _.size(figure.data[0].x)) {
      figure.data[0].x = x
      figure.data[0].y = y
      setFigure(figure)
      setRevision(revision + 1)
    }
  }, [figure, x, y, revision])

  return (
    <ReactGridLayout
      className='layout'
      layout={layout}
      cols={12}
      rowHeight={24}
      draggableHandle='.drag-handler'
      onResize={(_, { i }) => {
        if (i === '1') {
          setRevision(revision + 1)
        }
      }}
      onResizeStop={(_, { i }) => {
        if (i === '1') {
          setRevision(revision + 1)
        }
      }}
      onLayoutChange={l => dispatch(updateLayout(taskId, l))}
    >
      {layout.map(l => {
        return (
          <div key={l.i}>
            {l.i === '1' ? <DraggableDiv title={task.name}>
              <AutoResizePlot
                revision={revision}
                useResizeHandler={true}
                data={figure.data}
                layout={figure.layout}
                frames={figure.frames}
                config={figure.config}
                onInitialized={fig => setFigure(fig)}
                onUpdated={fig => setFigure(fig)}
              />
            </DraggableDiv> : <DraggableDiv></DraggableDiv>}
          </div>
        )
      })}
    </ReactGridLayout>
  )
}

export default Task
