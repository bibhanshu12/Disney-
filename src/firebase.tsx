import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const apiKey=import.meta.env.VITE_API_KEY;
const authDomain=import.meta.env.VITE_AUTH_DOMAIN;
const projectId=import.meta.env.VITE_PROJECTID;
const storageBucket=import.meta.env.VITE_STRORAGE_BUCKET;
const messagingSenderId=import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId=import.meta.env.VITE_APP_ID;

console.log("Firebase environment variables:", {
  apiKey: apiKey ? "✓ Set" : "✗ Missing",
  authDomain: authDomain ? "✓ Set" : "✗ Missing", 
  projectId: projectId ? "✓ Set" : "✗ Missing",
  storageBucket: storageBucket ? "✓ Set" : "✗ Missing",
  messagingSenderId: messagingSenderId ? "✓ Set" : "✗ Missing",
  appId: appId ? "✓ Set" : "✗ Missing"
});



const firebaseConfig = {
  apiKey: apiKey,

  authDomain: authDomain,

  projectId: projectId,

  storageBucket: storageBucket,

  messagingSenderId: messagingSenderId,

  appId: appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
 
export { auth, provider, storage };
export { db };
