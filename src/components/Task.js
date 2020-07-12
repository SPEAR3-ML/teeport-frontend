import React, { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
// import _ from 'lodash'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { selectLayout, selectPlots } from '../redux/selectors'
import { updateLayout, updatePlots, refreshPlot } from '../redux/actions'
import { DraggableDiv, FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import TaskControlBar from './TaskControlBar'
import EvalHistoryPlot from './EvalHistoryPlot'
import EvolutionPlot from './EvolutionPlot'
import EvalXHistoryPlot from './EvalXHistoryPlot'
import useTask from '../hooks/useTask'
import { generateDefaultPlots, generatePlotsLayouts } from '../utils/helpers'

const GridLayout = WidthProvider(Responsive)

const getPlotView = (plot, task) => {
  switch (plot.title) {
    case 'Evaluation History':
      return <EvalHistoryPlot task={task} revision={plot.revision}/>
    case 'Evolution Trace':
      return <EvolutionPlot task={task} recent={plot.recent} revision={plot.revision}/>
    case 'Evaluation X History':
      return <EvalXHistoryPlot task={task} revision={plot.revision}/>
    default:
      return null
  }
}

const TaskView = memo(({ taskId, task, sendMessage }) => {
  // console.log('task render!')
  const _plots = useSelector(selectPlots(taskId)) || []
  const plots = _plots.length ? _plots : generateDefaultPlots()
  const layout = useSelector(selectLayout(taskId)) || generatePlotsLayouts(plots.length)
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize the plots and layout if necessary
    if (!_plots.length) {
      // console.log('default plots!')
      dispatch(updatePlots(taskId, generateDefaultPlots()))
      dispatch(updateLayout(taskId, generatePlotsLayouts(plots.length)))
    }
  }, []) // eslint-disable-line

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
            dispatch(refreshPlot(taskId, parseInt(i) - 1))
          }}
          onResizeStop={(__, { i }) => {
            dispatch(refreshPlot(taskId, parseInt(i) - 1))
          }}
          onLayoutChange={(current, all) => dispatch(updateLayout(taskId, all))}
        >
          {layout.lg.map((l, idx) => {
            return (
              <div key={l.i}>
                <DraggableDiv title={plots[idx].title}>
                  {getPlotView(plots[idx], task)}
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
