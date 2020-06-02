import React, { useState, useEffect } from 'react';

import * as FirestoreService from '../../services/firestore';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useStore } from '../../store/store';

const Burgerbuilder = (props) => {
  const [state, dispatch] = useStore();
  const [error, setError] = useState(null);

/*  useEffect( () => {
    console.log(props);
    async function fetchData(){
      let response = null;
      try{
        response = await FirestoreService.getIngredients();
        if(response instanceof Error){
          throw response;
        }else{
          setIngredients(response);
        }
      }catch(error){
        console.log(error);
        setError(error);
      }
    }
    fetchData();
    }, [props]);*/

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
    ...state.ingredients
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
    const queryParams = [];
        for(let i in state.ingredients){
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(state.ingredients[i]));
              }
        queryParams.push('price=' + state.totalPrice);

        const queryString = queryParams.join('&');

        props.history.push({
                pathname: '/checkout',
                search: '?' + queryString
              });
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]  <= 0;
    }
  };
 
  for (let key in disabledInfo){
       disabledInfo[key] = disabledInfo[key]  <= 0;
  }

  let orderSummary = null;
  let burger;

  if(error === 'null'){
    burger = <Spinner />;
  }

  if(state.ingredients){
  burger = ( 
    <React.Fragment> 
      <Burger ingredients={state.ingredients}/>
      <BuildControls 
        ingredientAdded={dispatch} 
        ingredientsRemoved={dispatch} 
        disabled={disabledInfo}
        price={state.totalPrice} 
        purchaseble={updatePurschasedState(state.ingredients)}
        ordered={purchaseHandler} 
      />

      </React.Fragment>
  );
  
  orderSummary = 
      <OrderSummary 
        ingredients={state.ingredients} 
        purchasedCanceled={purchasedCanceledHandler}
        purchaseConfirmed={purchaseConfirmedHandler}
        price={state.totalPrice}/>;
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

export default Burgerbuilder;
