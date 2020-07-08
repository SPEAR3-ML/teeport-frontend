import React, { useState, useEffect, useMemo, memo } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
// import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
// import 'react-perfect-scrollbar/dist/css/styles.css'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import TasksControlBar from './TasksControlBar'
import TaskCard from './TaskCard'
import NewTask from './NewTask'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Tasks = ({ tasks, sendMessageAsTaskManager, clients, sendMessageAsClientManager }) => {
  // console.log('tasks render!')
  const layout = useMemo(() => generateLayout(tasks), [tasks])
  const [showNewTask, setShowNewTask] = useState(false)
  const [className, setClassName] = useState('layout plain')

  useEffect(() => {
    const timer = setTimeout(() => {
      setClassName('layout')
    }, 1)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <FlexFrame>
      <TasksControlBar
        sendMessage={sendMessageAsTaskManager}
        onNewTask={() => setShowNewTask(true)}
        tasksNum={tasks ? tasks.length : 0}
      />
      <MemoScrollbar tag='tasks'>
        <ReactGridLayout
          className={className}
          layout={layout}
          cols={12}
          rowHeight={80}
          isDraggable={false}
          isResizable={false}
          measureBeforeMount={true}
        >
          {tasks.map(task => (
            <div key={task.id}>
              <TaskCard task={task} sendMessage={sendMessageAsTaskManager}/>
            </div>
          ))}
        </ReactGridLayout>
      </MemoScrollbar>
      <NewTask
        show={showNewTask} setShow={setShowNewTask}
        clients={clients} sendMessage={sendMessageAsClientManager}
      />
    </FlexFrame>
  )
}

// Tasks.whyDidYouRender = true

export default memo(Tasks)
