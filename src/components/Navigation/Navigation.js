import React from 'react';

import NavigationItem from './NavgiationItem/NavigationItem.js';
import classes from './Navigation.module.css';

const navigation = (props) => (
  <nav>
    <ul className={classes.Navigation}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      {props.authenticated ? 
          (
              <React.Fragment>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
              </React.Fragment>
          ) : <NavigationItem link="/login">Login</NavigationItem>
      }
    </ul>
  </nav>
);

export default navigation;
