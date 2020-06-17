import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import FireauthService from '../../services/firebase';

const Orders = (props) => {
  
  useEffect( () => {
    const unregisterObserver = FireauthService.auth.onAuthStateChanged(
      (user) => {
        if(user){
          props.onFetchOrders(user.uid);
        }else{
        }
      }
    );
    return function cleanUp(){
      unregisterObserver();
    };
  }, []);
  
  let orders = <Spinner />;
  if(!props.loading){
    orders = (
        props.orders.map(order => (
        <Order key={order.id} 
               price={Number.parseFloat(order.price).toFixed(2)} 
               ingredients={order.ingredients}/>
        ))
    );
  }

  return (
    <div>
      <WithErrorHandler error={props.error} />
      {orders}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (userId) => dispatch(actions.fetchOrders(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
