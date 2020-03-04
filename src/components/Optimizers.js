import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { FlexFrame, FlexScrollContent } from './Utils'
import Optimizer from './Optimizer'
import useOptimizers from '../hooks/useOptimizers'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Optimizers = () => {
  const [optimizers, sendMessage] = useOptimizers()
  const layout = generateLayout(optimizers)

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
          {optimizers.map(optimizer => (
            <div key={optimizer.id}>
              <Optimizer optimizer={optimizer} sendMessage={sendMessage}/>
            </div>
          ))}
        </ReactGridLayout>
      </FlexScrollContent>
    </FlexFrame>
  )
}

export default Optimizers
