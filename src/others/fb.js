import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA9ptXkdHYXz0U7g97ePvKszuP3sVJexpM",
  authDomain: "biostore-17942.firebaseapp.com",
  databaseURL: "https://biostore-17942.firebaseio.com",
  projectId: "biostore-17942",
  storageBucket: "biostore-17942.appspot.com",
};

export const firebaseApp = firebase.initializeApp(config);
export const db = firebase.database();
export const ServerValue = firebase.database.ServerValue;
export const producersOffers = firebase.database().ref('producersOffers');
export const driversRef = firebase.database().ref('drivers');
export const usersRef = firebase.database().ref('users');
