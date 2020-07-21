import React, { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
// import _ from 'lodash'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { selectLayouts, selectPlots } from '../redux/selectors'
import { updateLayouts, updatePlots, refreshPlot } from '../redux/actions'
import { DraggableDiv, FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import TaskControlBar from './TaskControlBar'
import EvalHistoryPlot from './monitors/EvalHistoryPlot'
import EvolutionPlot from './monitors/EvolutionPlot'
import EvalXHistoryPlot from './monitors/EvalXHistoryPlot'
import useTask from '../hooks/useTask'
import { generateDefaultPlots, generateLayouts } from '../utils/helpers'

const GridLayout = WidthProvider(Responsive)

const getPlotView = (plot, task, taskId) => {
  switch (plot.title) {
    case 'Evaluation History':
      return <EvalHistoryPlot task={task} taskId={taskId} revision={plot.revision}/>
    case 'Evolution Trace':
      return <EvolutionPlot task={task} taskId={taskId} recent={plot.recent} revision={plot.revision}/>
    case 'Evaluation X History':
      return <EvalXHistoryPlot task={task} taskId={taskId} revision={plot.revision}/>
    default:
      return null
  }
}

const TaskView = memo(({ taskId, task, sendMessage }) => {
  // console.log('task render!')
  const _plots = useSelector(selectPlots(taskId)) || []
  const plots = _plots.length ? _plots : generateDefaultPlots()
  const ids = plots.map(plot => plot.title)
  const layouts = useSelector(selectLayouts(taskId)) || generateLayouts(ids, 8)
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize the plots and layout if necessary
    if (!_plots.length) {
      // console.log('default plots!')
      dispatch(updatePlots(taskId, generateDefaultPlots()))
      dispatch(updateLayouts(taskId, generateLayouts(ids, 8)))
    }
  }, []) // eslint-disable-line

  return (
    <FlexFrame>
      <TaskControlBar task={task} sendMessage={sendMessage}/>
      <MemoScrollbar tag={taskId}>
        <GridLayout
          className='layout'
          layouts={layouts}
          breakpoints={{ lg: 1920, md: 1280, sm: 720, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
          rowHeight={40}
          draggableHandle='.drag-handler'
          onResize={(__, { i }) => {
            dispatch(refreshPlot(taskId, i))
          }}
          onResizeStop={(__, { i }) => {
            dispatch(refreshPlot(taskId, i))
          }}
          onLayoutChange={(current, all) => dispatch(updateLayouts(taskId, all))}
        >
          {plots.map(plot => (
            <div key={plot.title}>
              <DraggableDiv title={plot.title} type={0}>
                {getPlotView(plot, task, taskId)}
              </DraggableDiv>
            </div>
          ))}
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
