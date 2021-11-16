import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBk8kN0F8yYmamuJIKERFecUpNvihppW_Q",
  authDomain: "myfirstchatapp-e49bd.firebaseapp.com",
  projectId: "myfirstchatapp-e49bd",
  storageBucket: "myfirstchatapp-e49bd.appspot.com",
  messagingSenderId: "270012729862",
  appId: "1:270012729862:web:f0df8dbd9fdccc996e1187",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const chatRef = collection(db, "chat");

class DataService {
  async getAll(messages) {
    const q = query(chatRef, orderBy("createAt"));

    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        messages.push({ id: change.doc.id, ...change.doc.data() });
      });
    });
  }

  async create(data) {
    return await addDoc(collection(db, "chat"), data);
  }
}

export default new DataService();
