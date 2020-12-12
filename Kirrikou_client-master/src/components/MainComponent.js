import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Signin from './../auth/Signin'
import Header from './HeaderComponent';
const Main = ()=> {

    return (
      <div>
        <Header />
      <Switch>
            <Route path='/home' component={Home} />
            <Route path='/auth/signin' component={Signin}/>
            <Redirect to="/home" />
      </Switch>
    </div>
    );
}
export default Main;