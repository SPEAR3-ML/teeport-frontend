import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { FlexFrame } from './Utils'
import Processor from './Processor'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Processors = ({ clients, sendMessage }) => {
  const processors = clients.filter(client => client.type === 'processor')
  const layout = generateLayout(processors)

  return (
    <FlexFrame>
      <PerfectScrollbar>
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
      </PerfectScrollbar>
    </FlexFrame>
  )
}

export default Processors
