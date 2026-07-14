// Replace with your Firebase config for production or assessment demo.
const firebaseConfig = {
  apiKey: "AIzaSyDdJsultf4r5Kv447dBUbjlVRFSzm59v7Y",
  authDomain: "carevoice-c361a.firebaseapp.com",
  projectId: "carevoice-c361a",
  storageBucket: "carevoice-c361a.firebasestorage.app",
  messagingSenderId: "1071158583033",
  appId: "1:1071158583033:web:f86fefe638c4714b4d4c28"
};

function isFirebaseConfigured(config) {
  return Object.values(config).every((value) => typeof value === "string" && !value.startsWith("YOUR_"));
}

let db = null;
let auth = null;

if (isFirebaseConfigured(firebaseConfig)) {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  auth = firebase.auth();
} else {
  console.info("Firebase config placeholders detected. Running in local demo mode.");
}

// Export for use in app.js
window.db = db;
window.auth = auth;
