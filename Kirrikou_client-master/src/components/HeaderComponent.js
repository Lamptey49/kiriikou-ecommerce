import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
// import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
// import CartIcon from '@material-ui/icons/ShoppingCart'
// import Badge from '@material-ui/core/Badge'
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
    
        <AppBar position="static" >
    <Toolbar>
        <div>
            <Link to="/">
            <IconButton aria-label="Home" style={isActive(history, "/")}>
                <img src={logo} alt='Kiriikou' height='50px' width='100px' />
                {/* <HomeIcon/> */}
            </IconButton>
            </Link>
  
           
      </div>
      <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/auth/signin">
            <Button style={isActive(history, "/auth/signin")}>Sign In
            </Button>
          </Link>
          <Link to="/business/register/new">
            <Button style={isActive(history, "/business/register/new")}>Connect to Kiriikou
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.seller && (<Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>)}
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>
)) 

export default Header;
