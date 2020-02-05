import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
// import { grey } from 'material-colors'

import { selectCount } from '../redux/selectors'
import { increaseCount } from '../redux/actions'

const Header = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Link = styled.a`
  color: #09d3ac;
`

const Home = () => {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`
  })

  return (
    <Header>
      <p>
        Welcome to SPEAR3 ML Platform
      </p>
      <Link
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Algorithm Monitor
      </Link>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => dispatch(increaseCount())}>
          Click me
        </button>
      </div>
    </Header>
  )
}

export default Home
