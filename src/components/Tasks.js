import React, { useState, memo } from 'react'
import _ from 'lodash'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import TasksControlBar from './TasksControlBar'
import ResponsiveGrid from './ResponsiveGrid'
import TaskCard from './TaskCard'
import NewTask from './NewTask'
import NewBenchmarkTask from './NewBenchmarkTask'

const Tasks = ({ tasks, sendMessageAsTaskManager, clients, sendMessageAsClientManager }) => {
  // console.log('tasks render!')
  const [showNewTask, setShowNewTask] = useState(false)
  const [showNewBenchmarkTask, setShowNewBenchmarkTask] = useState(false)
  const [selected, setSelected] = useState({})

  return (
    <FlexFrame>
      <TasksControlBar
        sendMessage={sendMessageAsTaskManager}
        onNewTask={() => setShowNewTask(true)}
        onNewBenchmarkTask={() => setShowNewBenchmarkTask(true)}
        tasksNum={tasks ? tasks.length : 0}
        selected={selected}
        unselectAll={() => setSelected({})}
      />
      <MemoScrollbar tag='tasks'>
        <ResponsiveGrid
          rowHeight={480}
          breakpoints={{ lg: 1440, md: 960, sm: 560, xs: 320, xxs: 0 }}
        >
          {tasks.map(task => (
            <div key={task.id} id={task.id}>
              <TaskCard
                task={task}
                selected={!!selected[task.id]}
                sendMessage={sendMessageAsTaskManager}
                toggleSelected={() => {
                  if (selected[task.id]) {
                    delete selected[task.id]
                  } else {
                    selected[task.id] = true
                  }
                  setSelected(_.clone(selected))
                }}
              />
            </div>
          ))}
        </ResponsiveGrid>
      </MemoScrollbar>
      <NewTask
        show={showNewTask} setShow={setShowNewTask}
        clients={clients} sendMessage={sendMessageAsClientManager}
      />
      <NewBenchmarkTask
        show={showNewBenchmarkTask} setShow={setShowNewBenchmarkTask}
        clients={clients} sendMessage={sendMessageAsClientManager}
      />
    </FlexFrame>
  )
}

// Tasks.whyDidYouRender = true

export default memo(Tasks)
