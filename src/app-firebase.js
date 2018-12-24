import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import React from 'react';

const config = {
    apiKey: "AIzaSyBngLoyY0-uPg43ffA_j96LG_3Cu6yZtJw",
    authDomain: "ng-http-1b100.firebaseapp.com",
    databaseURL: "https://ng-http-1b100.firebaseio.com",
    projectId: "ng-http-1b100",
    storageBucket: "ng-http-1b100.appspot.com",
    messagingSenderId: "1051081484811"
}


const app = firebase.initializeApp(config);
export const db = app.database();
export const auth = app.auth();
export const storage = app.storage();
export const timeStamp = firebase.database.ServerValue.TIMESTAMP;


export const AuthContext = React.createContext({ user: null });