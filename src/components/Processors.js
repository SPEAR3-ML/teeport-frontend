import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { FlexFrame, FlexScrollContent } from './Utils'
import Processor from './Processor'
import useProcessors from '../hooks/useProcessors'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Processors = () => {
  const [processors, sendMessage] = useProcessors()
  const layout = generateLayout(processors)

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
          {processors.map(processor => (
            <div key={processor.id}>
              <Processor processor={processor} sendMessage={sendMessage}/>
            </div>
          ))}
        </ReactGridLayout>
      </FlexScrollContent>
    </FlexFrame>
  )
}

export default Processors
