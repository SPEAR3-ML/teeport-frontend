import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from 'lodash'

import { selectLayout } from '../redux/selectors'
import { updateLayout } from '../redux/actions'
import { DraggableDiv, FlexFrame, FlexScrollContent } from './Utils'
import TaskControlBar from './TaskControlBar'
import useTask from '../hooks/useTask'
import useEvalHistoryPlot from '../hooks/useEvalHistoryPlot'
import { generatePlotLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Task = () => {
  const { taskId } = useParams()
  const [task, sendMessage] = useTask(taskId)
  const layout = useSelector(selectLayout(taskId)) || []
  const dispatch = useDispatch()
  useEffect(() => {
    if (!_.size(layout)) {
      const newLayout = generatePlotLayout(1)
      dispatch(updateLayout(taskId, newLayout))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [EvalHistoryPlot, refreshPlot] = useEvalHistoryPlot(task)

  return (
    <FlexFrame>
      <TaskControlBar task={task} sendMessage={sendMessage}/>
      <FlexScrollContent>
        <ReactGridLayout
          className='layout'
          layout={layout}
          cols={12}
          rowHeight={24}
          draggableHandle='.drag-handler'
          onResize={(_, { i }) => {
            if (i === '1') {
              refreshPlot()
            }
          }}
          onResizeStop={(_, { i }) => {
            if (i === '1') {
              refreshPlot()
            }
          }}
          onLayoutChange={l => dispatch(updateLayout(taskId, l))}
        >
          {layout.map(l => {
            return (
              <div key={l.i}>
                {l.i === '1' ? <DraggableDiv title='Evaluation History'>
                  {EvalHistoryPlot}
                </DraggableDiv> : <DraggableDiv></DraggableDiv>}
              </div>
            )
          })}
        </ReactGridLayout>
      </FlexScrollContent>
    </FlexFrame>
  )
}

export default Task
