import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { FlexFrame, FlexScrollContent } from './Utils'
import TasksControlBar from './TasksControlBar'
import TaskCard from './TaskCard'
import useTasks from '../hooks/useTasks'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Tasks = () => {
  const [tasks, sendMessage] = useTasks()
  const layout = generateLayout(tasks)

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
          {tasks.map(task => (
            <div key={task.id}>
              <TaskCard task={task} sendMessage={sendMessage}/>
            </div>
          ))}
        </ReactGridLayout>
      </FlexScrollContent>
    </FlexFrame>
  )
}

export default Tasks
