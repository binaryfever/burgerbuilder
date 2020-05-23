import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

const WithErrorHandler = (props) => {
  return(
      <Aux>
        <Modal show={props.error ? true : false}>
          {props.error ? props.error.message : "No Such Error"} 
        </Modal>
      </Aux>
  );
};

export default WithErrorHandler;
