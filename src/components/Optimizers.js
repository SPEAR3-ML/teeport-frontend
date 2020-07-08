import React, { memo } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import Optimizer from './Optimizer'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Optimizers = ({ clients, sendMessage }) => {
  // console.log('optimizers render!')
  const optimizers = clients.filter(client => client.type === 'optimizer')
  const layout = generateLayout(optimizers)

  return (
    <FlexFrame>
      <MemoScrollbar tag='optimizers'>
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
      </MemoScrollbar>
    </FlexFrame>
  )
}

export default memo(Optimizers)
