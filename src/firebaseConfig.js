// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRkbBqHnTdoEuI7O3mSYKuPaDWOoaVmAA",
  authDomain: "eroxtest-b2bfd.firebaseapp.com",
  projectId: "eroxtest-b2bfd",
  storageBucket: "gs://eroxtest-b2bfd.appspot.com",
  messagingSenderId: "560762280807",
  appId: "1:560762280807:web:6d39cb8c2d55ef9e442dc2",
  measurementId: "G-NXMLX0RS8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a reference to the storage service
const storage = getStorage(app);

// Export the initialized app (not firebase)
export { storage };