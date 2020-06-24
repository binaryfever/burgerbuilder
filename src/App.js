import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import FireauthService from './services/firebase';

function App() {
  const [authenticated, setAuthenticated] = useState(false); 
  
  useEffect( () => {
    const unregisterObserver = FireauthService.auth.onAuthStateChanged(
      (user) => {
        if(user){
          setAuthenticated(!!user);
        }
      }
    );
    return function cleanUp(){
      unregisterObserver();
    };
  },[]);

  //Guard the routes
  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/login" component={Login} />
      <Route path="/" component={BurgerBuilder} /> 
      <Redirect to="/" />
    </Switch>
  );

  if(authenticated){
    routes = (
    <Switch>
      <Route path="/checkout" component={Checkout} /> 
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Logout} />
      <Route path="/" component={BurgerBuilder} /> 
      <Redirect to="/" />
    </Switch>
    );
  }
  console.log(authenticated);
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
