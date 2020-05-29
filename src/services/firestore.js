import * as firebase from 'firebase/app';
import "firebase/firestore";

const REACT_API_KEY = process.env.REACT_APP_apiKey;
const PROJECT_ID = process.env.REACT_APP_projectId;
const firebaseConfig = {
    apiKey: REACT_API_KEY,
    projectId: PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Create the burger order
export const createOrder = async (order) => {
  const response = await db.collection('orders');
    await response.add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        order: [{...order}]
  });
}

//get the ingredients
export const getIngredients  = async () => {
  const ingredientsDoc = await db.collection('ingredients')
      .doc('ingredient').get();
    
  if(ingredientsDoc.exists){
    console.log(ingredientsDoc.data());
    return await ingredientsDoc.data();
  }else{
    throw new Error("Couldn't load ingredients");
  }
}

//get orders return an array of orders
export const getOrders = async () => {
  const orderSnapshot = await db.collection('orders').get();
  let orderDocs = [];
  let ordersArray = [];
  
  if(!orderSnapshot.empty){
    orderDocs = await orderSnapshot.docs;
    
    orderDocs.forEach( doc => {
      let id = doc.id;
      let orders = doc.data().order;
      orders.forEach(order =>{
        ordersArray.push({
          id: id,
          price: order.price,
          ingredients: order.ingredients
        });
      });
    });

    return ordersArray;
  }else{
    throw Error("There are no orders to load");
  }

}
