import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Menu from '../Menu/Menu.js';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Menu open={props.open}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <div className={classes.DesktopOnly}>
      <Navigation />
    </div>
  </header>
);

export default toolbar;
