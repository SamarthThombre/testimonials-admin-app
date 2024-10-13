// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, DocumentData } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addSpace(space: DocumentData) {
  try {
    const docRef = await addDoc(collection(db, 'spaces'), space);
    console.log('Space added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding space: ', error);
    throw error;
  }
}

export async function getSpaces() {
  try {
    const spacesCollection = collection(db, 'spaces');
    const spacesSnapshot = await getDocs(spacesCollection);
    const spacesList = spacesSnapshot.docs.map(doc => ({
      id: doc.id,
      spaceName: doc.data().spaceName,
      ...doc.data()
    }));
    return spacesList;
  } catch (error) {
    console.error('Error fetching spaces:', error);
    throw error;
  }
}

export { db };