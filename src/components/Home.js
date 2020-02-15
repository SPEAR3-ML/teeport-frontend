import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Home = () => {
  return (
    <Header>
      <p>
        Welcome to the SPEAR3 Platform
      </p>
    </Header>
  )
}

export default Home
