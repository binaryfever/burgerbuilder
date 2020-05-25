import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

const Checkout = (props) => {  
  const [ingredients, setIngredients] = useState({meat: 0, salad: 0, bacon: 0, cheese: 0});
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect( () => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    let price = 0;
    for(const [key, value] of query.entries()){
      if(key === 'price'){
        price = value;
      }else{
        ingredients[key] = Number(value);
      }
    }
    setIngredients(ingredients);
    setTotalPrice(price);
  }, []);

  const checkoutCancelledHandler  = () => {
    props.history.goBack();    
  };
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  return (
    <div> 
      <CheckoutSummary ingredients={ingredients} 
        checkoutCancelled={checkoutCancelledHandler} 
        checkoutContinued={checkoutContinuedHandler} 
        />
      <Route path={props.match.path + '/contact-data'} render={ (props) => (<ContactData ingredients={ingredients} totalPrice={totalPrice} {...props}/>)} />
    </div>
  );
};

export default Checkout;
