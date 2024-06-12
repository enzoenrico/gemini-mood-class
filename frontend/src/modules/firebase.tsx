import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDTNOGFG-BMSyd_B-YZFzCglht15EAzIp8",
  authDomain: "emotion-thing.firebaseapp.com",
  projectId: "emotion-thing",
  storageBucket: "emotion-thing.appspot.com",
  messagingSenderId: "813026498206",
  appId: "1:813026498206:web:94086547774f4aaca00d8f",
  measurementId: "G-ZHBMBZQETS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);

export default app;
