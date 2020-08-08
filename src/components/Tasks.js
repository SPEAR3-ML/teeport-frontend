import React, { useState, useEffect, memo } from 'react'
import sort from 'fast-sort'
import _ from 'lodash'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import TasksControlBar from './TasksControlBar'
import ResponsiveGrid from './ResponsiveGrid'
import TaskCard from './TaskCard'
import NewTask from './NewTask'
import NewBenchmarkTask from './NewBenchmarkTask'
import StatusBar from './StatusBar'

const Tasks = ({ tasks, sendMessageAsTaskManager, clients, sendMessageAsClientManager }) => {
  // console.log('tasks render!')
  const [showNewTask, setShowNewTask] = useState(false)
  const [showNewBenchmarkTask, setShowNewBenchmarkTask] = useState(false)
  const [selected, setSelected] = useState({})
  const [sortedBy, setSortedBy] = useState('created')
  const [descend, setDescend] = useState(true)
  const [sortedTasks, setSortedTasks] = useState([])

  useEffect(() => {
    let sortedTasks
    if (sortedBy === 'created' && descend) {
      sortedTasks = sort(_.clone(tasks)).desc('createdAt')
    } else if (sortedBy === 'created') {
      sortedTasks = sort(_.clone(tasks)).asc('createdAt')
    } else if (sortedBy === 'name' && descend) {
      sortedTasks = sort(_.clone(tasks)).desc(t => t.name.toLowerCase())
    } else {
      sortedTasks = sort(_.clone(tasks)).asc(t => t.name.toLowerCase())
    }
    setSortedTasks(sortedTasks)
  }, [sortedBy, descend, tasks])

  return (
    <FlexFrame>
      <TasksControlBar
        sendMessage={sendMessageAsTaskManager}
        onNewTask={() => setShowNewTask(true)}
        onNewBenchmarkTask={() => setShowNewBenchmarkTask(true)}
        tasksNum={tasks ? tasks.length : 0}
        selected={selected}
        unselectAll={() => setSelected({})}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
        descend={descend}
        setDescend={setDescend}
      />
      <MemoScrollbar tag='tasks'>
        <ResponsiveGrid
          rowHeight={480}
          breakpoints={{ lg: 1440, md: 960, sm: 560, xs: 320, xxs: 0 }}
        >
          {sortedTasks.map(task => (
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
      <StatusBar
        tasksNum={tasks ? tasks.length : 0}
        selected={selected}
      />
    </FlexFrame>
  )
}

// Tasks.whyDidYouRender = true

export default memo(Tasks)
