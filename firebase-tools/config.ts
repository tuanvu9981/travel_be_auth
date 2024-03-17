import { initializeApp, FirebaseApp } from "firebase/app";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSENGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export default app;