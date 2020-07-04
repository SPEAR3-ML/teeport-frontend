import React, { memo } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { FlexFrame } from './Utils'
import Optimizer from './Optimizer'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Optimizers = ({ clients, sendMessage }) => {
  // console.log('optimizers render!')
  const optimizers = clients.filter(client => client.type === 'optimizer')
  const layout = generateLayout(optimizers)

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
          {optimizers.map(optimizer => (
            <div key={optimizer.id}>
              <Optimizer optimizer={optimizer} sendMessage={sendMessage}/>
            </div>
          ))}
        </ReactGridLayout>
      </PerfectScrollbar>
    </FlexFrame>
  )
}

export default memo(Optimizers)
