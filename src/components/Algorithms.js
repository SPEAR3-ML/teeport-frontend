import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { FlexFrame, FlexScrollContent } from './Utils'
import Algorithm from './Algorithm'
import useAlgorithms from '../hooks/useAlgorithms'
import { generateLayout } from '../utils/helpers'

const ReactGridLayout = WidthProvider(GridLayout)

const Algorithms = () => {
  const [algorithms, sendMessage] = useAlgorithms()
  const layout = generateLayout(algorithms)

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
          {algorithms.map(algorithm => (
            <div key={algorithm.id}>
              <Algorithm algorithm={algorithm} sendMessage={sendMessage}/>
            </div>
          ))}
        </ReactGridLayout>
      </FlexScrollContent>
    </FlexFrame>
  )
}

export default Algorithms
