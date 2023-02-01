import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {logout} from '../actions/userActions'
function Header() {

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const dispatch=useDispatch()
 
  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect >
        <Container >
          <LinkContainer to='/'>
  <Navbar.Brand >Dahas</Navbar.Brand>
  </LinkContainer>

  <Nav className="flex-row  ms-auto align-items-end">
    <LinkContainer to='/cart' >
      <Nav.Link className='me-4 '><i className='fas fa-shopping-cart fa-xl'></i><span className='d-none d-md-inline d-lg-inline'>  Cart</span>  </Nav.Link>
      </LinkContainer>
      {userInfo ? (
  
          <LinkContainer to='/profile'>
            <Nav.Link className='me-4'>
            <i className='fas fa-user fa-xl '></i> <span className='d-none d-md-inline d-lg-inline'>  {userInfo.name}</span> 
            </Nav.Link>
          </LinkContainer>




      ):(<LinkContainer to='/login'>
      <Nav.Link className='me-4'><i className='fas fa-user fa-xl'></i> <span className='d-none d-md-inline d-lg-inline'>  Login</span></Nav.Link>
      </LinkContainer>)}

      
      
</Nav>
  <Navbar.Toggle aria-controls="basic-navbar-nav" className='px-0'><i className='fas fa-search fa-xl'></i></Navbar.Toggle>
  <Navbar.Collapse id="basic-navbar-nav" className=' justify-content-end ms-auto' >
    <Nav >
    <SearchBox/>

    {userInfo&&userInfo.isAdmin&&(
        <NavDropdown title='Admin' id='adminmenue'
        menuVariant="dark">
          <LinkContainer to='/admin/userlist'>
            <NavDropdown.Item>
              Users
            </NavDropdown.Item>
          </LinkContainer>

          <LinkContainer to='/admin/productlist'>
            <NavDropdown.Item>
              Products
            </NavDropdown.Item>
          </LinkContainer>

          <LinkContainer to='/admin/orderlist'>
            <NavDropdown.Item>
              Orders
            </NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )}
    </Nav> 
  </Navbar.Collapse>  
   
    
  
  </Container>
</Navbar>
    </header>
    
  )
}

export default Header