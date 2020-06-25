import React, { useState } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { FlexFrame, FlexScrollContent } from './Utils'
import TasksControlBar from './TasksControlBar'
import TaskCard from './TaskCard'
import NewTask from './NewTask'
import useTasks from '../hooks/useTasks'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Tasks = () => {
  const [tasks, sendMessage] = useTasks()
  const layout = generateLayout(tasks)
  const [showNewTask, setShowNewTask] = useState(false)

  return (
    <FlexFrame>
      <TasksControlBar
        sendMessage={sendMessage}
        onNewTask={() => setShowNewTask(true)}
        tasksNum={tasks ? tasks.length : 0}
      />
      <FlexScrollContent>
        <ReactGridLayout
          className='layout'
          layout={layout}
          cols={12}
          rowHeight={80}
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
      <NewTask show={showNewTask} setShow={setShowNewTask}/>
    </FlexFrame>
  )
}

export default Tasks
