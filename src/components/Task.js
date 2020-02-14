import React, { useState, useEffect } from 'react'
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
import useTasks from '../hooks/useTasks'

const ReactGridLayout = WidthProvider(GridLayout)

const AutoResizePlot = styled(Plot)`
  width: 100%;
  height: 100%;
`

const generateLayout = (size, columnNum = 4) => {
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

const Tasks = () => {
  const [tasksSize, setTasksSize] = useState(0)
  const tasks = useTasks()
  const layout = useSelector(selectLayout)
  const dispatch = useDispatch()
  useEffect(() => {
    if (_.size(tasks) !== tasksSize) {
      setTasksSize(_.size(tasks))
      const newLayout = generateLayout(_.size(tasks))
      dispatch(updateLayout(newLayout))
    }
  }, [tasks, tasksSize, dispatch])

  const [revision, setRevision] = useState(0)
  const [figure, setFigure] = useState({
    data: [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
          color: 'red',
        },
      },
      {
        type: 'bar',
        x: [1, 2, 3],
        y: [2, 5, 3],
      },
    ],
    layout: {
      autosize: true,
      title: 'A Fancy Plot',
    },
    frames: [],
    config: {},
  })

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
      onLayoutChange={l => dispatch(updateLayout(l))}
    >
      {layout.map(l => {
        return (
          <div key={l.i}>
            {l.i === '1' ? <DraggableDiv>
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

export default Tasks
