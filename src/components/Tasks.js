import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { DraggableDiv, FlexFrame, FlexScrollContent } from './Utils'
import TasksControlBar from './TasksControlBar'
import useTasks from '../hooks/useTasks'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Tasks = () => {
  const [tasks, sendMessage] = useTasks()
  const layout = generateLayout(tasks)
  const { pathname } = useLocation()
  const history = useHistory()

  return (
    <FlexFrame>
      <TasksControlBar sendMessage={sendMessage}/>
      <FlexScrollContent>
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
      </FlexScrollContent>
    </FlexFrame>
  )
}

export default Tasks
