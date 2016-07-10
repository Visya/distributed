import firebase from 'firebase';

var firebaseConfig = require('../../firebase.config');

firebase.initializeApp(firebaseConfig);

export default firebase.app();
