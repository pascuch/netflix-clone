import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAlri11TPoon3dLsLa4qb6c9tODso-CEg",
    authDomain: "netflix-clone-a58b3.firebaseapp.com",
    projectId: "netflix-clone-a58b3",
    storageBucket: "netflix-clone-a58b3.appspot.com",
    messagingSenderId: "464591995115",
    appId: "1:464591995115:web:9381c93ea4a0b1e9a47eae"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;