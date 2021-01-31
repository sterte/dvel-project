import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Multiple from './MultipleSelectorComponent';

class Main extends Component{

  render() {    

    return (
      <div>      
      <Header />      
      <Switch>
      <Route path="/single" component={ () => <Home /> } />            
      <Route path="/multi" component={ () => <Multiple /> } />      
      <Redirect to="/single" />
      </Switch>            
      </div>
      );
  }
}

export default withRouter(Main);