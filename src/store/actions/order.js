import * as FirestoreService from '../../services/firestore';

import * as actionTypes from './actionTypes';

const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: orderId,
    orderData: orderData
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData) => {
  return async dispatch => {
    dispatch(purchaseBurgerStart());
    let response = null; 
    try{
      response = await FirestoreService.createOrder(orderData);
      dispatch(purchaseBurgerSuccess(response, orderData));
    }catch(error){
      console.log(error);
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return async dispatch => {
    dispatch(fetchOrdersStart());
    try{
      const ordersArray = await FirestoreService.getOrders();
      dispatch(fetchOrdersSuccess(ordersArray));
    }catch(error){
      console.log(error);
      dispatch(fetchOrdersFailed(error));
    }
  };
};
