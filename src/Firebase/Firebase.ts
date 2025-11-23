import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY || "demo-key",
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN || "demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECTID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET || "demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID || "123456789",
  appId: process.env.NEXT_PUBLIC_APPID || "1:123456789:web:abc123def456",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;