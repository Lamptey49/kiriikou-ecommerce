import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, 
    Button, } from 'reactstrap';
import auth from './../auth/auth-helper'
import logo from './../assets/images/kiriikou.jpg';


const  isActive = (history, path) =>{
    if(history.location.pathname.includes(path))
    return { color: '#bef67a'}
    else{
        return { color: '#d7ff9a'}
    }
}
const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path))
      return {color: '#bef67a'}
    else
      return {color: '#ffffff'}
    
  }


const Header = withRouter(({history}) =>(
    <div>
        <Navbar  color="light" light expand="md">
            <div className="container">
                <NavbarToggler  />
                <NavbarBrand className="mr-auto" style={isActive(history, '/')} href="/"><img src={logo} height='90' width='170px' alt='Kiriikou.com' /></NavbarBrand>
                <Collapse  navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>     
                    {/* <div style={{'position':'absolute',  'right': '20px'}}> */}
                        <span >
                       
                        {
                            !auth.isAuthenticated() && (<span>
                            <Link to="/signup">
                                <Button style={isActive(history, "/signup")}>Sign up
                                </Button>
                            </Link>
                            &nbsp;
                            <Link to="/auth/signin">
                                <Button style={isActive(history, "/signin")}>Sign In
                                </Button>
                            </Link>
                            {/* <Link to='/business/register/new'>
                                <Button variant="secondary" size="md" style={isActive(history, '/business/register/new')} active>
                                    Connect on Kiriikou
                                </Button>
                            </Link> */}
                            </span>)
                        }
                        {
                            auth.isAuthenticated() && (<span>
                            {auth.isAuthenticated().user.seller && (<Link to="/business/shops"><Button style={isPartActive(history, "/seller/")}>My Shop</Button></Link>)}
                            <Link to={"/user/" + auth.isAuthenticated().user._id}>
                                <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
                            </Link>
                            <Button color="inherit" onClick={() => {
                                auth.clearJWT(() => history.push('/'))
                                }}>Sign out</Button>
                            </span>)
                        }
                        </span>
                        {/* </div> */}
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    </div>
)) 

export default Header;
