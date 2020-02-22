import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { DraggableDiv, FlexFrame, FlexScrollContent } from './Utils'
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
          {processors.map(processor => {
            return (
              <div key={processor.id}>
                <DraggableDiv title={processor.name} active={true}>
                  {new Date(processor.connectedAt).toString()}
                </DraggableDiv>
              </div>
            )
          })}
        </ReactGridLayout>
      </FlexScrollContent>
    </FlexFrame>
  )
}

export default Processors
