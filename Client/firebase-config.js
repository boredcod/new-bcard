import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB6afaJHR8BFr1EWGYKZSShRWpv9qBDrvs",
    authDomain: "b-card-c6533.firebaseapp.com",
    databaseURL: "https://b-card-c6533-default-rtdb.firebaseio.com",
    projectId: "b-card-c6533",
    storageBucket: "b-card-c6533.appspot.com",
    messagingSenderId: "691273203340",
    appId: "1:691273203340:web:ab2b1094959372578885a9",
    measurementId: "G-PFW9TD6TZ5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };