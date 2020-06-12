import React, { useEffect } from 'react';
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import * as actions from '../../store/actions';

const Checkout = (props) => {  

  const checkoutCancelledHandler  = () => {
    props.history.goBack();    
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to='/' />;
  if(props.ingredients){
    const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;  
    summary = 
      (<div>
        {purchasedRedirect}
        <CheckoutSummary ingredients={props.ingredients} 
        checkoutCancelled={checkoutCancelledHandler} 
        checkoutContinued={checkoutContinuedHandler} 
        />
      <Route path={props.match.path + '/contact-data'} component={ContactData} />
      </div>
      );
  }

  return (
    <div> 
      {summary}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
