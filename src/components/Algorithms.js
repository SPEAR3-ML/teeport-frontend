import React from 'react'
import _ from 'lodash'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import styled from 'styled-components'

import { DraggableDiv } from './Utils'
import useAlgorithms from '../hooks/useAlgorithms'

const ReactGridLayout = WidthProvider(GridLayout)

const Frame = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`

const ScrollContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`

const generateLayout = (tasks, columnNum = 4) => {
  const layout = []
  const width = 12 / columnNum
  const height = 8
  for (let i = 0; i < _.size(tasks); i++) {
    const c = i % columnNum
    const r = Math.floor(i / columnNum)
    const item = {
      i: tasks[i].id,
      x: c * width,
      y: r * height,
      w: width,
      h: height,
      minW: 3,
      maxW: 12,
      minH: height,
      maxH: 4 * height,
    }
    layout.push(item)
  }
  return layout
}

const Algorithms = () => {
  const [algorithms, sendMessage] = useAlgorithms()
  const layout = generateLayout(algorithms)

  return (
    <Frame>
      <ScrollContent>
        <ReactGridLayout
          className='layout'
          layout={layout}
          cols={12}
          rowHeight={24}
          isDraggable={false}
          isResizable={false}
        >
          {algorithms.map(algorithm => {
            return (
              <div key={algorithm.id}>
                <DraggableDiv title={algorithm.name} active={true}>
                  {new Date(algorithm.connectedAt).toString()}
                </DraggableDiv>
              </div>
            )
          })}
        </ReactGridLayout>
      </ScrollContent>
    </Frame>
  )
}

export default Algorithms
