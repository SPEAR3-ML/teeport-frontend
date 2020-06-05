import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { FlexFrame, FlexScrollContent } from './Utils'
import Evaluator from './Evaluator'
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
          rowHeight={60}
          isDraggable={false}
          isResizable={false}
        >
          {evaluators.map(evaluator => (
            <div key={evaluator.id}>
              <Evaluator evaluator={evaluator} sendMessage={sendMessage}/>
            </div>
          ))}
        </ReactGridLayout>
      </FlexScrollContent>
    </FlexFrame>
  )
}

export default Evaluators
