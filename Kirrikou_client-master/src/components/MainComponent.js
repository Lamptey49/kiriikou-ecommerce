import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './HomeComponent';
import Signin from './../auth/Signin'
import Header from './HeaderComponent';
const Main = ()=> {

    return (
      <div>
        <Header />
      <Switch>
            <Route path='/' component={Home} />
            <Route path='/auth/signin' component={Signin}/>
            
      </Switch>
    </div>
    );
}
export default Main;