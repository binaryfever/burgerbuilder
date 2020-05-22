import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
  let ingredientsArray = Object.keys(props.ingredients)
    .map(ingredientsKey => {
      return [...Array(props.ingredients[ingredientsKey])].map((_, i) => {
        return <BurgerIngredients key={ingredientsKey + i} type={ingredientsKey} />;
      });
    }).reduce((arr, el) => {
      return arr.concat(el)
    }, []);
 
  if(ingredientsArray.length === 0){
    ingredientsArray = <p>Please start adding ingredients</p>;
  }
  return(
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top"/>
      {ingredientsArray}
      <BurgerIngredients type="bread-bottom"/>
    </div>
  );
};

export default burger;
