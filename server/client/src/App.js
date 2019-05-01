import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './containers/Navigation/NavBar/NavBar'
import HomePage from './containers/HomePage/HomePage'
import LoginPage from './containers/LoginPage/LoginPage'
import RegisterPage from './containers/RegisterPage/RegisterPage'
import SecurePage from './containers/SecurePage/SecurePage';

const App = () => {
  return (
    <BrowserRouter>
    <NavBar/>
    <div className="App">
    <Switch>
      <Route path="/" exact render={() => <div><HomePage/></div>}/>
      <Route path="/login" render={() => <div><LoginPage/></div>}/>
      <Route path="/register" render={() => <div><RegisterPage/></div>}/>
      <Route path="/secure" render={() => <div><SecurePage/></div>}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
