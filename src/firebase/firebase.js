import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: 'AIzaSyC55ApAVid7HcJa4uwb1QXrVoh2LA8Ycqg',
  authDomain: 'gg-map-cd88c.firebaseapp.com',
  databaseURL: 'https://gg-map-cd88c.firebaseio.com',
  projectId: 'gg-map-cd88c',
  storageBucket: '',
  messagingSenderId: '57258313301',
};
firebase.initializeApp(config);

export default firebase;
