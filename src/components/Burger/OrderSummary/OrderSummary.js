import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={igKey}>
              <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li> 
    });

  let buttons = <Link to="/login">Login to Order</Link>;
  
  if(props.authenticated){
    buttons = (<div><Button clicked={props.purchasedCanceled} btnType="Danger">Cancel</Button>
      <Button clicked={props.purchaseConfirmed} btnType="Success">Confirm</Button></div>);
  }

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total Price: {props.price.toFixed(2)}</p>
    {buttons}
		</React.Fragment>
  );
};

export default orderSummary;
