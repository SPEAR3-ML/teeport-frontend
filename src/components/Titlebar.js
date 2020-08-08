import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components'
import { Search } from 'react-bootstrap-icons'
// import { grey } from 'material-colors'

// import IconSpan from './IconSpan'
// import { red } from '../plugins/slacPalette'

const isSubRoute = (origin, sub) => {
  return origin === sub || (sub.startsWith(origin) && origin !== '/')
}

// const Title = styled.div`
//   position: relative;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 48px;
//   font-size: 12pt;
//   font-weight: 600;
//   background-color: ${red.normal};
//   color: white;
// `

// const Logo = styled.img`
//   position: relative;
//   top: 12px;
//   display: inline-block;
//   vertical-align: top;
//   height: 24px;
//   line-height: 48px;
//   padding-left: 24px;
//   padding-right: 24px;
// `

// const Item = styled(Link)`
//   display: inline-block;
//   padding-left: 12px;
//   padding-right: 12px;
//   line-height: 48px;
//   color: ${prop => isSubRoute(prop.to, prop.current) ? 'white' : red.light};
//   background-color: ${prop => isSubRoute(prop.to, prop.current) ? red.dark : 'none'};
//   &:hover {
//     color: white;
//   };
//   text-decoration: none;
// `

const Logo = styled.img`
  height: 30px;
  margin-right: 16px;
`

const Titlebar = ({ search, setSearch }) => {
  const { pathname } = useLocation()

  return (
    <Navbar bg='dark' variant='dark' expand='md' style={{ zIndex: 10 }}>
      <LinkContainer to='/'>
        <Navbar.Brand>
          <Logo
            src={`${process.env.PUBLIC_URL}/logo.png`}
            className='d-inline-block align-top'
            alt='Teeport logo'
          />
          TeePort
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link active={isSubRoute('/tasks', pathname)} as={Link} to='/tasks'>
            Tasks
          </Nav.Link>
          <Nav.Link active={isSubRoute('/optimizers', pathname)} as={Link} to='/optimizers'>
            Optimizers
          </Nav.Link>
          <Nav.Link active={isSubRoute('/evaluators', pathname)} as={Link} to='/evaluators'>
            Evaluators
          </Nav.Link>
          <Nav.Link active={isSubRoute('/processors', pathname)} as={Link} to='/processors'>
            Processors
          </Nav.Link>
          <Nav.Link active={isSubRoute('/about', pathname)} as={Link} to='/about'>
            About
          </Nav.Link>
        </Nav>
        <Form inline>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='text'
              placeholder='Search'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Titlebar
