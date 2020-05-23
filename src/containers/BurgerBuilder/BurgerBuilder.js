import React, { useState, useEffect } from 'react';

import Aux from '../../hoc/Aux/Aux';
import * as FirestoreService from '../../services/firestore';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const Burgerbuilder = () => {
  
  const [ingredients, setIngredients] = useState();
  const [error, setError] = useState(null);

  useEffect( () => {
    async function fetchData(){
      let response = null;
      try{
       response = await FirestoreService.getIngredients();
       setIngredients(response);
      }
      catch(error){
        console.log(error);
        setError(error);
      }
    }
    fetchData();
  }, []);

  const [totalPrice, setTotalPrice] = useState(4);
  const [purchaseble, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  const addIngredientHandler = (type) => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients
    };

    updatedIngredients[type] = updatedCount;
    setIngredients(updatedIngredients);
    
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    setTotalPrice(newPrice);

    updatePurschasedState(updatedIngredients);
  };

  const removeIngredientHandler = (type) => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount - 1;

    if (updatedCount >= 0) {
      const updatedIngredients = {
        ...ingredients  
      };

      updatedIngredients[type] = updatedCount;
      setIngredients(updatedIngredients);

      const priceRemoval = INGREDIENT_PRICES[type];
      const oldPrice = totalPrice;
      const newPrice = oldPrice - priceRemoval;
      setTotalPrice(newPrice);

      updatePurschasedState(updatedIngredients);
    }

  };

  const updatePurschasedState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey];  
      })
      .reduce( (sum, el) => {
        return sum + el;
      } ,0);

    setPurchasable(sum > 0);
  };

  const disabledInfo = {
    ...ingredients
  };

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchasedCanceledHandler = () => {
    setPurchasing(false);
  };

 const purchaseConfirmedHandler = async () => {
      setLoading(true); 
      const order = {
        ingredients: ingredients,
        price: totalPrice,
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
      setPurchasing(false);
    }catch(error){
      setLoading(false);
      setPurchasable(false);
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

  
  if(ingredients){
  burger = ( 
      <Aux> 
      <Burger ingredients={ingredients}/>
      <BuildControls 
        ingredientAdded={addIngredientHandler} 
        ingredientsRemoved={removeIngredientHandler} 
        disabled={disabledInfo}
        price={totalPrice} 
        purchaseble={purchaseble}
        ordered={purchaseHandler} 
      />

      </Aux>
  );
  
  orderSummary = 
      <OrderSummary 
        ingredients={ingredients} 
        purchasedCanceled={purchasedCanceledHandler}
        purchaseConfirmed={purchaseConfirmedHandler}
        price={totalPrice}/>;
  }
  

  if(loading){
   orderSummary = <Spinner />;
  }

  return (
    <Aux>
      <WithErrorHandler error={error} />
      <Modal 
        show={purchasing}
        modalClosed={purchasedCanceledHandler}>
        {orderSummary}
      </Modal>
    {burger}
    </Aux>
  );
}

export default Burgerbuilder;
