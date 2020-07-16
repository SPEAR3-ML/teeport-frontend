import React, { memo, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'qs'
import { Responsive, WidthProvider } from 'react-grid-layout'
import _ from 'lodash'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { DraggableDiv, FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import TaskComparisonControlBar from './TaskComparisonControlBar'
import EvalHistoryCmpPlot from './monitors/EvalHistoryCmpPlot'
import EvolutionCmpPlot from './monitors/EvolutionCmpPlot'
import useMultiTask from '../hooks/useMultiTask'
import { generateDefaultPlots, generateLayouts } from '../utils/helpers'

const GridLayout = WidthProvider(Responsive)

const getPlotView = (plot, tasks, taskIds) => {
  switch (plot.title) {
    case 'Evaluation History':
      return <EvalHistoryCmpPlot tasks={tasks} taskIds={taskIds} revision={plot.revision}/>
    case 'Evolution Trace':
      return <EvolutionCmpPlot tasks={tasks} taskIds={taskIds} recent={plot.recent} revision={plot.revision}/>
    default:
      return null
  }
}

const TaskComparisonView = memo(({ taskIds, tasks, sendMessage }) => {
  // console.log('task comp render!')
  const [plots, setPlots] = useState(generateDefaultPlots())
  const [layouts, setLayouts] = useState(generateLayouts(plots.map(plot => plot.title), 8))

  return (
    <FlexFrame>
      <TaskComparisonControlBar tasks={tasks} sendMessage={sendMessage}/>
      <MemoScrollbar>
        <GridLayout
          className='layout'
          layouts={layouts}
          breakpoints={{ lg: 1920, md: 1280, sm: 720, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
          rowHeight={40}
          draggableHandle='.drag-handler'
          onResize={(__, { i }) => {
            const idx = plots.findIndex(plot => plot.title === i)
            plots[idx].revision += 1
            setPlots(_.clone(plots))
          }}
          onResizeStop={(__, { i }) => {
            const idx = plots.findIndex(plot => plot.title === i)
            plots[idx].revision += 1
            setPlots(_.clone(plots))
          }}
          onLayoutChange={(current, all) => {
            setLayouts(all)
          }}
        >
          {plots.map(plot => (
            <div key={plot.title}>
              <DraggableDiv title={plot.title}>
                {getPlotView(plot, tasks, taskIds)}
              </DraggableDiv>
            </div>
          ))}
        </GridLayout>
      </MemoScrollbar>
    </FlexFrame>
  )
})

const TaskComparison = () => {
  const { search } = useLocation()
  const taskIds = useMemo(() => qs.parse(search, {
    ignoreQueryPrefix: true, // search has a leading question mark!
  }).taskIds, [search])
  const [tasks, sendMessage] = useMultiTask(taskIds)

  // return (
  //   <div>
  //   </div>
  // )
  return (
    <TaskComparisonView
      taskIds={taskIds}
      tasks={tasks}
      sendMessage={sendMessage}
    />
  )
}

export default TaskComparison
