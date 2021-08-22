import firebaseSdk from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
}

if (!firebaseSdk.apps.length) firebaseSdk.initializeApp(firebaseConfig)

const firebase = firebaseSdk
export default firebase