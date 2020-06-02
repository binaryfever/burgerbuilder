import { initStore } from './store';

const INGREDIENT_PRICES = {
  salad: 0.25,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const configureStore = () => {
  const actions = {
    ADD_INGREDIENTS: (currentState, ingredientName) => { 
      console.log(currentState);
      const updatedState = {
        ...currentState,
        ingredients: {
          ...currentState.ingredients,
          [ingredientName]: currentState.ingredients[ingredientName] + 1
        },
        totalPrice: currentState.totalPrice + INGREDIENT_PRICES[ingredientName]
      };
      return { ingredients: updatedState.ingredients, totalPrice: updatedState.totalPrice};
    },
    REMOVE_INGREDIENT: (currentState, ingredientName) => {
      const updatedState = {
        ...currentState,
        ingredients: {
          ...currentState.ingredients,
          [ingredientName]: currentState.ingredients[ingredientName] - 1
        },
        totalPrice: currentState.totalPrice - INGREDIENT_PRICES[ingredientName]
      };
      return { ingredients: updatedState.ingredients, totalPrice: updatedState.totalPrice };
    }
  };
  initStore(actions, {ingredients: { salad: 0, meat: 0, bacon: 0, cheese: 0}, totalPrice: 4});
};

export default configureStore;
