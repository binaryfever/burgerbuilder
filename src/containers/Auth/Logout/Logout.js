import React, { useEffect } from 'react';
import FireauthService from '../../../services/firebase';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  useEffect( () => {
    async function handleLogout(){
      try{
        await FireauthService.logout();
      }catch(error){
        console.log(error);
      }
    }
    handleLogout();

  }, []);

  return (
    <Redirect to="/" />
  );
};

export default Logout;
