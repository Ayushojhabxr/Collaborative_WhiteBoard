import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas",
  authDomain: "demo-whiteboard-app.firebaseapp.com",
  databaseURL: "https://demo-whiteboard-app-default-rtdb.firebaseio.com",
  projectId: "demo-whiteboard-app",
  storageBucket: "demo-whiteboard-app.appspot.com",
  messagingSenderId: "581326886241",
  appId: "1:581326886241:web:c56b98dd343b9876f91073"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);