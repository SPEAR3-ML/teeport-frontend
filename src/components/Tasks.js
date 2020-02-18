import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import _ from 'lodash'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { DraggableDiv } from './Utils'
import useTasks from '../hooks/useTasks'

const ReactGridLayout = WidthProvider(GridLayout)

const generateLayout = (tasks, columnNum = 4) => {
  const layout = []
  const width = 12 / columnNum
  const height = 8
  for (let i = 0; i < _.size(tasks); i++) {
    const c = i % columnNum
    const r = Math.floor(i / columnNum)
    const item = {
      i: tasks[i].id,
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
  const tasks = useTasks()
  const layout = generateLayout(tasks)
  const { pathname } = useLocation()
  const history = useHistory()

  return (
    <ReactGridLayout
      className='layout'
      layout={layout}
      cols={12}
      rowHeight={24}
      isDraggable={false}
      isResizable={false}
    >
      {tasks.map(task => {
        return (
          <div key={task.id}>
            <DraggableDiv title={task.name} active={task.status === 'running'}>
              <button onClick={() => { history.push(`${pathname}/${task.id}`) }}>
                Enter
              </button>
              {new Date(task.createdAt).toString()}
            </DraggableDiv>
          </div>
        )
      })}
    </ReactGridLayout>
  )
}

export default Tasks
