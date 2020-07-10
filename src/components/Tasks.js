import React, { useState, useEffect, useMemo, memo } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import TasksControlBar from './TasksControlBar'
import TaskCard from './TaskCard'
import NewTask from './NewTask'
import { generateTasksLayouts } from '../utils/helpers'

const GridLayout = WidthProvider(Responsive)

const Tasks = ({ tasks, sendMessageAsTaskManager, clients, sendMessageAsClientManager }) => {
  // console.log('tasks render!')
  const layouts = useMemo(() => generateTasksLayouts(tasks), [tasks])
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
        <GridLayout
          className={className}
          layouts={layouts}
          breakpoints={{ lg: 1440, md: 960, sm: 560, xs: 320, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
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
        </GridLayout>
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
