import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavbarText } from 'reactstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom'
import Posts from '../pages/PostsPage';
import HomePage from '../pages/HomePage';

const Layout = ({user}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const toggle = () => setIsOpen(!isOpen);

    const onNavigateToLoginPage = (e) => {
      navigate('login')
    }
    return (
    <div>
        <Navbar expand={'sm'} color='danger' dark>
          <Link to='/'>Home</Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <Link to='posts' className='nav-link'>Posts</Link>
              </NavItem>
              <NavItem>
                <Link to='login' className='nav-link'>
                  Login
                </Link>
              </NavItem>
            </Nav>
            {
              user
                ? <NavbarText>{user && user.username}</NavbarText>
                : <div>
                  <Link to='login' className='btn btn-primary' onClick={onNavigateToLoginPage}>
                    Login
                  </Link>
                </div>
            }
            
          </Collapse>
        </Navbar>
        <Outlet />
    </div>
    )
}

export default Layout