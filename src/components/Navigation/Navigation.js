import React from 'react';

import NavigationItem from './NavgiationItem/NavigationItem.js';
import classes from './Navigation.module.css';

const navigation = () => (
  <nav>
    <ul className={classes.Navigation}>
      <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  </nav>
);

export default navigation;
