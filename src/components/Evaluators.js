import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { DraggableDiv, FlexFrame, FlexScrollContent } from './Utils'
import useEvaluators from '../hooks/useEvaluators'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Evaluators = () => {
  const [evaluators, sendMessage] = useEvaluators()
  const layout = generateLayout(evaluators)

  return (
    <FlexFrame>
      <FlexScrollContent>
        <ReactGridLayout
          className='layout'
          layout={layout}
          cols={12}
          rowHeight={24}
          isDraggable={false}
          isResizable={false}
        >
          {evaluators.map(evaluator => {
            return (
              <div key={evaluator.id}>
                <DraggableDiv title={evaluator.name} active={true}>
                  {new Date(evaluator.connectedAt).toString()}
                </DraggableDiv>
              </div>
            )
          })}
        </ReactGridLayout>
      </FlexScrollContent>
    </FlexFrame>
  )
}

export default Evaluators
