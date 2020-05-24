import React from 'react';

import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (props) => {
  return(
      <React.Fragment>
        <Modal show={props.error ? true : false}>
          {props.error ? props.error.message : "No Such Error"} 
        </Modal>
      </React.Fragment>
  );
};

export default WithErrorHandler;
