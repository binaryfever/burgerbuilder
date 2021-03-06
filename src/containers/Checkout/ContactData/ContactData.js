import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import FireauthService from '../../../services/firebase';

const ContactData = (props) => {
  let userId = null;
  useEffect( () => {
    const unregisterObserver = FireauthService.auth.onAuthStateChanged(
      (user) => {
        if(user){
          userId = user.uid;
        }else{
        }
      }
    );
    return function cleanUp(){
      unregisterObserver();
    };
  }, []);
  
  let form = (
      <Formik
        initialValues={{name: '', email:'', street:'', postalCode:'', deliveryMethod:'fastest'}}
          validate={values => {
          const errors = {};
          if(!values.name){
            errors.name = 'Name required';
          }

          if(!values.email){
            errors.email = 'Email required';
          }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = 'Invalid email address';
          }

          if(!values.street){
            errors.street = 'Street Required';
          }

          if(!values.postalCode){
            errors.postalCode = 'Postal Code Required';
          }

          return errors;
        }}
        onSubmit={async (values, {setSubmitting}) => {
          const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            customer: {
              customerId: userId,
              name: values.name,
              address: {
                street: values.street,
                zipCode: values.postalCode,
                country: "USA"
              },
              email: values.email
            },
            deliveryMethod: values.deliveryMethod
          }
          props.onOrderBurger(order); 
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Field type="text" name="name" placeholder="Name"/>
            <ErrorMessage name="name" component="div" className={classes.Invalid}/>
            <Field type="email" name="email" placeholder="Email"/>
            <ErrorMessage name="email" component="div" className={classes.Invalid}/>
            <Field type="text" name="street" placeholder="Your Street"/>
            <ErrorMessage name="street" component="div" className={classes.Invalid}/>
            <Field type="text" name="postalCode" placeholder="Postal Code"/>
            <ErrorMessage name="postalCode" component="div" className={classes.Invalid}/>
            <Field as="select" name="deliveryMethod">
              <option value="fastest">Fastest</option>
              <option value="cheapest">Cheapest</option>
            </Field>
            <Button type="submit" btnType="Success" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
  );

  if(props.loading){
    form = <Spinner />
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
