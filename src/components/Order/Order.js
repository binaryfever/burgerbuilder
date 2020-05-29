import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];
  for(let ingredientName in props.ingredients){
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  
  const ingredientDisplay = ingredients.map( ingredient => {
    return <span key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>;
  });
  
  return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredientDisplay}</p>
        <p>Price: <strong>${props.price}</strong></p>
      </div>
  );
}

export default order;
