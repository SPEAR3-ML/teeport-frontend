import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from 'lodash'

import { selectLayout } from '../redux/selectors'
import { updateLayout } from '../redux/actions'
import { DraggableDiv } from './Utils'
import useTask from '../hooks/useTask'
import useEvalHistoryPlot from '../hooks/useEvalHistoryPlot'

const ReactGridLayout = WidthProvider(GridLayout)

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

const Task = () => {
  const { taskId } = useParams()
  const task = useTask(taskId)
  const layout = useSelector(selectLayout(taskId)) || []
  const dispatch = useDispatch()
  useEffect(() => {
    if (!_.size(layout)) {
      const newLayout = generateLayout(1)
      dispatch(updateLayout(taskId, newLayout))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [EvalHistoryPlot, refreshPlot] = useEvalHistoryPlot(task)

  return (
    <ReactGridLayout
      className='layout'
      layout={layout}
      cols={12}
      rowHeight={24}
      draggableHandle='.drag-handler'
      onResize={(_, { i }) => {
        if (i === '1') {
          refreshPlot()
        }
      }}
      onResizeStop={(_, { i }) => {
        if (i === '1') {
          refreshPlot()
        }
      }}
      onLayoutChange={l => dispatch(updateLayout(taskId, l))}
    >
      {layout.map(l => {
        return (
          <div key={l.i}>
            {l.i === '1' ? <DraggableDiv title={task.name}>
              {EvalHistoryPlot}
            </DraggableDiv> : <DraggableDiv></DraggableDiv>}
          </div>
        )
      })}
    </ReactGridLayout>
  )
}

export default Task
