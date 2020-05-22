import React from 'react';

import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import classes from './SideDrawer.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open){
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  
  return(
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <div className={classes.DesktopOnly}>
          <Navigation />
        </div>
      </div>
    </Aux>
  );
};

export default sideDrawer;

