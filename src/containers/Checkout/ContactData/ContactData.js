import React, { useState } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import * as FirestoreService from '../../../services/firestore';
import Spinner from '../../../components/UI/Spinner/Spinner';

const ContactData = (props) => {
  const [user, setUser] = useState({ name: '', email: '', address: {
    street: '',
    postalCode: ''
  }});
  const [loading, setLoading] = useState(false);

  const orderHandler = async (event) => {
    console.log(props); 
    event.preventDefault(); 
      setLoading(true); 
      const order = {
        ingredients: props.ingredients,
        price: props.totalPrice,
        customer: {
          name: "Fred McHale",
          address: {
            street: "Test Street",
            zipcode: 1234,
            country: "USA"
          },
          email: "test@test.com"
        },
        deliverMethod: "fastest"
      }
    
    try{
      await FirestoreService.createOrder(order);
      setLoading(false);
      props.history.push('/');
    }catch(error){
      setLoading(false);
    }
  };
  
  let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Your Street" />
        <input type="text" name="postalCode" placeholder="Your Postal Code" />
        <Button btnType="Success" clicked={orderHandler}>Order</Button>
      </form>
  );

  if(loading){
    form = <Spinner />
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
    {form}
    </div>
  );
};

export default ContactData;
