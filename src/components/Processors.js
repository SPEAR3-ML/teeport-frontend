import React, { memo } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import Processor from './Processor'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Processors = ({ clients, sendMessage }) => {
  const processors = clients.filter(client => client.type === 'processor')
  const layout = generateLayout(processors)

  return (
    <FlexFrame>
      <MemoScrollbar tag='processors'>
        <ReactGridLayout
          className='layout'
          layout={layout}
          cols={12}
          rowHeight={24}
          isDraggable={false}
          isResizable={false}
        >
          {processors.map(processor => (
            <div key={processor.id}>
              <Processor processor={processor} sendMessage={sendMessage}/>
            </div>
          ))}
        </ReactGridLayout>
      </MemoScrollbar>
    </FlexFrame>
  )
}

export default memo(Processors)
