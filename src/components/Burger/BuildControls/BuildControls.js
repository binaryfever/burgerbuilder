import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Lettuce', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (

<div className={classes.BuildControls}>
  <p className={classes.price}>Price: ${props.price.toFixed(2)}</p>
  {
      controls.map(cntrl => (
        <BuildControl 
          key={cntrl.label} 
          label={cntrl.label}
          added={() => props.ingredientAdded(cntrl.type)}
          removed={ () => props.ingredientsRemoved(cntrl.type) }
          disabled={props.disabled[cntrl.type]}
        />
      ))
    }
  <button 
    className={classes.OrderButton}
    disabled={!props.purchaseble} 
    onClick={props.ordered}>Order Me</button>    
</div>
);

export default buildControls;
