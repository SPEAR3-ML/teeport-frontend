import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
// import { grey } from 'material-colors'

import { red } from '../plugins/slacPalette'

const isSubRoute = (origin, sub) => {
  return origin === sub || (sub.startsWith(origin) && origin !== '/')
}

const Title = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  font-size: 12pt;
  font-weight: 600;
  background-color: ${red.normal};
  color: white;
`

const Logo = styled.img`
  position: relative;
  top: 12px;
  display: inline-block;
  vertical-align: top;
  height: 24px;
  line-height: 48px;
  padding-left: 24px;
  padding-right: 24px;
`

const Item = styled(Link)`
  display: inline-block;
  padding-left: 12px;
  padding-right: 12px;
  line-height: 48px;
  color: ${prop => isSubRoute(prop.to, prop.current) ? 'white' : red.light};
  background-color: ${prop => isSubRoute(prop.to, prop.current) ? red.dark : 'none'};
  &:hover {
    color: white;
  };
  text-decoration: none;
`

const Titlebar = () => {
  const { pathname } = useLocation()

  return (
    <Title>
      <Logo src='/slac.png'/>
      <Item to='/' current={pathname}>
        Home
      </Item>
      <Item to='/tasks' current={pathname}>
        Tasks
      </Item>
      <Item to='/about' current={pathname}>
        About
      </Item>
    </Title>
  )
}

export default Titlebar
