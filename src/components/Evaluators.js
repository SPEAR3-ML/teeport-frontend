import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { FlexFrame } from './Utils'
import Evaluator from './Evaluator'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Evaluators = ({ clients, sendMessage }) => {
  const evaluators = clients.filter(client => client.type === 'evaluator')
  const layout = generateLayout(evaluators)

  return (
    <FlexFrame>
      <PerfectScrollbar>
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
      </PerfectScrollbar>
    </FlexFrame>
  )
}

export default Evaluators
