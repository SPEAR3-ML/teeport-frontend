import React, { useState, useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { generateLayouts } from '../utils/helpers'

const GridLayout = WidthProvider(Responsive)

const ResponsiveGrid = ({ children, rowHeight, breakpoints }) => {
  // console.log('grid render!')
  const ids = children.map(child => child.props.id)
  const layouts = generateLayouts(ids)
  const [className, setClassName] = useState('layout plain')

  useEffect(() => {
    const timer = setTimeout(() => {
      setClassName('layout')
    }, 1)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <GridLayout
      className={className}
      layouts={layouts}
      breakpoints={breakpoints}
      cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
      rowHeight={rowHeight}
      isDraggable={false}
      isResizable={false}
      measureBeforeMount={true}
    >
      {children}
    </GridLayout>
  )
}

export default ResponsiveGrid
