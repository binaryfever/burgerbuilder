import React from 'react';

import NavigationItem from './NavgiationItem/NavigationItem.js';
import classes from './Navigation.module.css';

const navigation = () => (
  <nav>
    <ul className={classes.Navigation}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  </nav>
);

export default navigation;
