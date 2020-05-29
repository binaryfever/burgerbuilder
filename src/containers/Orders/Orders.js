import React, { useState, useEffect } from 'react';

import Order from '../../components/Order/Order';
import * as FirestoreService from '../../services/firestore';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null); 
  
  useEffect( () => {
    async function fetchData(){
      try{
        const ordersArray = await FirestoreService.getOrders();
        setOrders(ordersArray);
      }catch(error){
        console.log(error);
        setError(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <WithErrorHandler error={error} />
      {orders.map(order => (
        <Order key={order.id} price={Number.parseFloat(order.price).toFixed(2)} ingredients={order.ingredients}/>
       ))}
    </div>
  );
}

export default Orders;
