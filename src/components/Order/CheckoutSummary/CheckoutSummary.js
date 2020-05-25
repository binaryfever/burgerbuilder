import React from 'react';
import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Enjoy your hamburger</h1>
      <div className={classes.Wrapper}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger"
              clicked={props.checkoutCancelled}>Cancel</Button>
      <Button btnType="Success"
              clicked={props.checkoutContinued}>Continue</Button>
    </div>
  );
};

export default checkoutSummary;
