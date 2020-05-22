import React from 'react';

import burgerImage from '../../assets/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerImage} alt="Burger Logo"/>
  </div>
);

export default logo;
