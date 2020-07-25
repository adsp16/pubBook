import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDX5apHpwjNiiHW4NN-DeLlYPPjIWdCjrU",
  authDomain: "pubbook-2feaf.firebaseapp.com",
  databaseURL: "https://pubbook-2feaf.firebaseio.com",
  projectId: "pubbook-2feaf",
  storageBucket: "pubbook-2feaf.appspot.com",
  messagingSenderId: "807978727274",
  appId: "1:807978727274:web:4fe702be9295795dd39713",
  measurementId: "G-CZV55ZDCND",
};

const fireObj = firebase.initializeApp(firebaseConfig);

const db = fireObj.firestore();

export { db, fireObj };
