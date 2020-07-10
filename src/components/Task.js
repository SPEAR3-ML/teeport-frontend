import React, { useState, memo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import _ from 'lodash'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { selectLayout } from '../redux/selectors'
import { updateLayout } from '../redux/actions'
import { DraggableDiv, FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import TaskControlBar from './TaskControlBar'
import EvalHistoryPlot from './EvalHistoryPlot'
import EvolutionPlot from './EvolutionPlot'
import useTask from '../hooks/useTask'
import { generatePlotsLayouts } from '../utils/helpers'

const GridLayout = WidthProvider(Responsive)

const getPlotView = (plot, task) => {
  switch (plot.title) {
    case 'Evaluation History':
      return <EvalHistoryPlot task={task} revision={plot.revision}/>
    case 'Evolution Trace':
      return <EvolutionPlot task={task} recent={plot.recent} revision={plot.revision}/>
    default:
      return null
  }
}

const TaskView = memo(({ taskId, task, sendMessage }) => {
  // console.log('task render!')
  const [plots, setPlots] = useState([{
    title: 'Evaluation History',
    revision: 0,
  }, {
    title: 'Evolution Trace',
    recent: 5,
    revision: 0,
  }])
  const layout = useSelector(selectLayout(taskId)) || generatePlotsLayouts(plots.length)
  const dispatch = useDispatch()

  return (
    <FlexFrame>
      <TaskControlBar task={task} sendMessage={sendMessage}/>
      <MemoScrollbar tag={taskId}>
        <GridLayout
          className='layout'
          layouts={layout}
          breakpoints={{ lg: 1920, md: 1280, sm: 720, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
          rowHeight={24}
          draggableHandle='.drag-handler'
          onResize={(__, { i }) => {
            setPlots(plots => {
              plots[parseInt(i) - 1].revision += 1
              return _.clone(plots)
            })
          }}
          onResizeStop={(__, { i }) => {
            setPlots(plots => {
              plots[parseInt(i) - 1].revision += 1
              return _.clone(plots)
            })
          }}
          onLayoutChange={(current, all) => dispatch(updateLayout(taskId, all))}
        >
          {layout.lg.map(l => {
            return (
              <div key={l.i}>
                <DraggableDiv title={plots[parseInt(l.i) - 1].title}>
                  {getPlotView(plots[parseInt(l.i) - 1], task)}
                </DraggableDiv>
              </div>
            )
          })}
        </GridLayout>
      </MemoScrollbar>
    </FlexFrame>
  )
})

const Task = () => {
  const { taskId } = useParams()
  const [task, sendMessage] = useTask(taskId)

  return (
    <TaskView
      taskId={taskId}
      task={task}
      sendMessage={sendMessage}
    />
  )
}

// Task.whyDidYouRender = true

export default Task
