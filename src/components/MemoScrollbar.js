import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

const MemoScrollbar = ({ children, tag }) => {
  // console.log('scrollbar render!')
  const [scrollContainer, setScrollContainer] = useState(null)

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.scrollTop = sessionStorage.getItem(`${tag}_scrollTop`) || 0
    }

    return () => {
      if (scrollContainer) {
        sessionStorage.setItem(`${tag}_scrollTop`, scrollContainer.scrollTop)
      }
    }
  }, [scrollContainer, tag])

  return (
    <PerfectScrollbar
      containerRef={setScrollContainer}
    >
      {children}
    </PerfectScrollbar>
  )
}

export default MemoScrollbar
