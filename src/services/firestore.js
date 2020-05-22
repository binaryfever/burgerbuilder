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
  try{
    const response = await db.collection('orders');
    await response.add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        order: [{...order}]
      });
     
  }
  catch(error){
    console.log('firestore.js: ', error);
  }
}

//get the order by id
export const getIngredients  = async () => {
  try{
    const ingredientsDoc = await db.collection('ingredients')
      .doc('ingredient').get();
    
    if(ingredientsDoc.exists){
      console.log(ingredientsDoc.data());
      return await ingredientsDoc.data();
    } else{
      throw new Error("No such document");
    }
  }
  catch(error){
    console.log(error);
  }
}
//I need to unsubscribe from the snapshop somewhere
