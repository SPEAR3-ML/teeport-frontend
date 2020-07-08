import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from 'lodash'

import { selectLayout } from '../redux/selectors'
import { updateLayout } from '../redux/actions'
import { DraggableDiv, FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import TaskControlBar from './TaskControlBar'
import useTask from '../hooks/useTask'
import useEvalHistoryPlot from '../hooks/useEvalHistoryPlot'
import useEvolutionPlot from '../hooks/useEvolutionPlot'
// import useEvalXHistoryPlot from '../hooks/useEvalXHistoryPlot'
import { generatePlotLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Task = () => {
  const { taskId } = useParams()
  const [task, sendMessage] = useTask(taskId)
  const layout = useSelector(selectLayout(taskId)) || []
  const dispatch = useDispatch()
  useEffect(() => {
    if (!_.size(layout)) {
      const newLayout = generatePlotLayout(2)
      dispatch(updateLayout(taskId, newLayout))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [EvalHistoryPlot, refreshHistPlot] = useEvalHistoryPlot(task)
  const [EvolutionPlot, refreshEvoPlot] = useEvolutionPlot(task)
  // const [EvalXHistoryPlot, refreshXHistPlot] = useEvalXHistoryPlot(task)
  // const Plots = [{
  //   title: 'Evaluation History',
  //   plot: EvalHistoryPlot,
  //   refresh: refreshHistPlot,
  // }, {
  //   title: 'Evolution Trace',
  //   plot: EvolutionPlot,
  //   refresh: refreshEvoPlot,
  // }, {
  //   title: 'Evaluation X History',
  //   plot: EvalXHistoryPlot,
  //   refresh: refreshXHistPlot,
  // }]
  const Plots = [{
    title: 'Evaluation History',
    plot: EvalHistoryPlot,
    refresh: refreshHistPlot,
  }, {
    title: 'Evolution Trace',
    plot: EvolutionPlot,
    refresh: refreshEvoPlot,
  }]

  return (
    <FlexFrame>
      <TaskControlBar task={task} sendMessage={sendMessage}/>
      <MemoScrollbar tag={taskId}>
        <ReactGridLayout
          className='layout'
          layout={layout}
          cols={12}
          rowHeight={24}
          draggableHandle='.drag-handler'
          onResize={(_, { i }) => {
            Plots[parseInt(i) - 1].refresh()
          }}
          onResizeStop={(_, { i }) => {
            Plots[parseInt(i) - 1].refresh()
          }}
          onLayoutChange={l => dispatch(updateLayout(taskId, l))}
        >
          {layout.map(l => {
            return (
              <div key={l.i}>
                <DraggableDiv title={Plots[parseInt(l.i) - 1].title}>
                  {Plots[parseInt(l.i) - 1].plot}
                </DraggableDiv>
              </div>
            )
          })}
        </ReactGridLayout>
      </MemoScrollbar>
    </FlexFrame>
  )
}

export default Task
