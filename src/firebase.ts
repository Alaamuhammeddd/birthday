import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAcSFkqoP0nA35GscR5nbPyDgNpr1qsLTA',
  authDomain: 'birthday-a1cbf.firebaseapp.com',
  projectId: 'birthday-a1cbf',
  storageBucket: 'birthday-a1cbf.firebasestorage.app',
  messagingSenderId: '403129125391',
  appId: '1:403129125391:web:4fa27d33cedbe9ca48f17a',
  measurementId: 'G-MMX81VNSKW',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
