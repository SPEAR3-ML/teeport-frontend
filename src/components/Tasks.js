import React, { useState } from 'react'
import Plot from 'react-plotly.js'
import styled from 'styled-components'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { DraggableDiv } from './Utils'

const ReactGridLayout = WidthProvider(GridLayout)

const AutoResizePlot = styled(Plot)`
  width: 100%;
  height: 100%;
`

const Tasks = () => {
  const [revision, setRevision] = useState(0)
  const [figure, setFigure] = useState({
    data: [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
          color: 'red',
        },
      },
      {
        type: 'bar',
        x: [1, 2, 3],
        y: [2, 5, 3],
      },
    ],
    layout: {
      autosize: true,
      title: 'A Fancy Plot',
    },
    frames: [],
    config: {},
  })

  const layout = [
    { i: '1', x: 0, y: 0, w: 6, h: 12, minW: 3, maxW: 12, minH: 8, maxH: 24 },
    { i: '2', x: 6, y: 0, w: 6, h: 12, minW: 3, maxW: 12, minH: 8, maxH: 24 },
    { i: '3', x: 0, y: 12, w: 6, h: 12, minW: 3, maxW: 12, minH: 8, maxH: 24 },
  ]

  return (
    <ReactGridLayout
      className='layout'
      layout={layout}
      cols={12}
      rowHeight={24}
      draggableHandle='.drag-handler'
      onResizeStop={(_, { i }) => {
        if (i === '1') {
          setRevision(revision + 1)
        }
      }}
    >
      <div key='1'>
        <DraggableDiv>
          <AutoResizePlot
            revision={revision}
            useResizeHandler={true}
            data={figure.data}
            layout={figure.layout}
            frames={figure.frames}
            config={figure.config}
            onInitialized={fig => setFigure(fig)}
            onUpdated={fig => setFigure(fig)}
          />
        </DraggableDiv>
      </div>
      <div key='2'>
        <DraggableDiv>2</DraggableDiv>
      </div>
      <div key='3'>
        <DraggableDiv>3</DraggableDiv>
      </div>
    </ReactGridLayout>
  )
}

export default Tasks
