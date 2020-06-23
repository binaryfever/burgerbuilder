import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { connect } from 'react-redux';

import FireauthService from '../../../services/firebase';
import Button from '../../../components/UI/Button/Button';
import classes from '../Auth.module.css';

export const Login = (props) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect( () => {
    const unregisterObserver = FireauthService.auth.onAuthStateChanged(
      (user) => {
        if(user){
          setAuthenticated(true);
        }
      }
    );
    return function cleanUp(){
      unregisterObserver();
    };
  }, []);

  let form = (
      <Formik
        initialValues={{email:'', password:''}}
          validate={values => {
          const errors = {};
          if(!values.email){
            errors.email = 'Email required';
          }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = 'Invalid email address';
          }

          if(!values.password){
            errors.password = 'Password required';
          }else if(values.password.length < 8){
            errors.password = 'Password must be longer than 7 characters';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          FireauthService.login(values.email, values.password);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Field type="email" name="email" placeholder="Email"/>
            <ErrorMessage name="email" component="div" className={classes.Invalid}/>
            <Field type="password" name="password" placeholder="Password"/>
            <ErrorMessage name="password" component="div" className={classes.Invalid}/>
            <Button type="submit" btnType="Success" disabled={isSubmitting}>
             Login 
            </Button>
            <Link to="/auth">Sign Up</Link>
          </Form>
        )}
      </Formik>
  );

  if (authenticated && props.building) {
    form = <Redirect to='/checkout' />;
  }else if(authenticated){
    form = <Redirect to='/' />;
  }

  return (
    <div>
      <h2>Login</h2>
        {form}
    </div>
  );
}; 
 
const mapStateToProps = (state) => {
  return {
    building: state.burgerBuilder.building
  }
};

export default connect(mapStateToProps)(Login);
