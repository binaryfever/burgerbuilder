import * as actionTypes from './actionTypes';
import Firebase from '../../services/firebase';

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName
  };
};

const setIngredients = (ingredients) => {
  return  {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return async dispatch => {
    let response = null;
    try{
      response = await Firebase.getIngredients();
      dispatch(setIngredients(response));
    }catch(error){
      console.log(error);
      dispatch(fetchIngredientsFailed());
    }
  };
};
