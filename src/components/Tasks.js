import React, { useState, useEffect } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { FlexFrame } from './Utils'
import TasksControlBar from './TasksControlBar'
import TaskCard from './TaskCard'
import NewTask from './NewTask'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Tasks = ({ tasks, sendMessageAsTaskManager, clients, sendMessageAsClientManager }) => {
  const layout = generateLayout(tasks)
  const [showNewTask, setShowNewTask] = useState(false)
  const [scrollContainer, setScrollContainer] = useState(null)
  const [className, setClassName] = useState('layout plain')

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.scrollTop = localStorage.getItem('tasksScrollTop') || 0
    }

    return () => {
      if (scrollContainer) {
        localStorage.setItem('tasksScrollTop', scrollContainer.scrollTop)
      }
    }
  }, [scrollContainer])

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
      <PerfectScrollbar
        containerRef={setScrollContainer}
      >
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
      </PerfectScrollbar>
      <NewTask
        show={showNewTask} setShow={setShowNewTask}
        clients={clients} sendMessage={sendMessageAsClientManager}
      />
    </FlexFrame>
  )
}

export default Tasks
