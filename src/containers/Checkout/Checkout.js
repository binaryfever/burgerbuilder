import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import { useStore } from '../../store/store';

const Checkout = (props) => {  
  const state = useStore(false)[0]; 

  const checkoutCancelledHandler  = () => {
    props.history.goBack();    
  };
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  return (
    <div> 
      <CheckoutSummary ingredients={state.ingredients} 
        checkoutCancelled={checkoutCancelledHandler} 
        checkoutContinued={checkoutContinuedHandler} 
        />
      <Route path={props.match.path + '/contact-data'} component={ContactData} />
    </div>
  );
};

export default Checkout;
