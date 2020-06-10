import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

const Checkout = (props) => {  
  const checkoutCancelledHandler  = () => {
    props.history.goBack();    
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  return (
    <div> 
      <CheckoutSummary ingredients={props.ingredients} 
        checkoutCancelled={checkoutCancelledHandler} 
        checkoutContinued={checkoutContinuedHandler} 
        />
      <Route path={props.match.path + '/contact-data'} component={ContactData} />
    </div>
  );
};

const mapStateToProps = (state) =>{
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
