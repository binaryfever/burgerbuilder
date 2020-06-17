import React, { useEffect } from 'react';
import FireauthService from '../../../services/firebase';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  useEffect( () => {
    FireauthService.logout();
  });

  return (
    <Redirect to="/" />
  );
};

export default Logout;
