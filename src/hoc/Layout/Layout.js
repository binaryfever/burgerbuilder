import React, { useState } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

const Layout = ( props ) => {
  
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerOpenHandler = () => {
    setShowSideDrawer(true);
  };

  return(
    <React.Fragment>
      <Toolbar open={sideDrawerOpenHandler}/>
      <SideDrawer 
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}/>
      <main className={classes.content}>
        {props.children}
      </main>
    </React.Fragment>
  );  
};

export default Layout;
