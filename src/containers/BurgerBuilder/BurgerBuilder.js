import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as FirestoreService from '../../services/firestore';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

const Burgerbuilder = (props) => {
  const [error, setError] = useState(null);

  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  const updatePurschasedState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
                return ingredients[ingredientKey];  
              })
      .reduce( (sum, el) => {
                return sum + el;
              } ,0);
      return sum > 0;
  };

  const disabledInfo = {
    ...props.ingredients
  };
  
  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchasedCanceledHandler = () => {
    setPurchasing(false);
  };

  //TODO: move the orders to the global state so I don't have to do
  //the below
  const purchaseConfirmedHandler = () =>{
        props.history.push('/checkout');
  };
  
  for (let key in disabledInfo){
       disabledInfo[key] = disabledInfo[key]  <= 0;
  }

  let orderSummary = null;
  let burger;

  if(error === 'null'){
    burger = <Spinner />;
  }
  
  if(props.ingredients){
    burger = ( 
      <React.Fragment> 
        <Burger ingredients={props.ingredients}/>
        <BuildControls 
          ingredientAdded={props.onIngredientAdded} 
          ingredientsRemoved={props.onIngredientRemoved} 
          disabled={disabledInfo}
          price={props.totalPrice} 
          purchaseble={updatePurschasedState(props.ingredients)}
          ordered={purchaseHandler} 
        />

      </React.Fragment>
    );
  
    orderSummary = 
        <OrderSummary 
          ingredients={props.ingredients} 
          purchasedCanceled={purchasedCanceledHandler}
          purchaseConfirmed={purchaseConfirmedHandler}
          price={props.totalPrice}/>;
  }
  

  if(loading){
   orderSummary = <Spinner />;
  }

  return (
    <React.Fragment>
      <WithErrorHandler error={error} />
      <Modal 
        show={purchasing}
        modalClosed={purchasedCanceledHandler}>
        {orderSummary}
      </Modal>
    {burger}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
    onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Burgerbuilder);
