import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  query,
  limit,
  onSnapshot,
  startAfter,
  getDocs,
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
  async getAll(messages, lastVisible) {
    const q = query(chatRef, orderBy("createAt"), limit(1));

    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        messages.push({ id: change.doc.id, ...change.doc.data() });
      });

      lastVisible = snapshot.docs[snapshot.docs.length - 1];
      console.log("last", lastVisible);
    });
  }

  async getNext(lastVisible) {
    const qNext = query(
      chatRef,
      orderBy("createAt"),
      limit(1),
      startAfter(lastVisible)
    );

    const documentSnapshots = await getDocs(qNext);

    // Get the last visible document
    const latestResult =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    console.log("latestResult -=>", latestResult);
  }

  async create(data) {
    return await addDoc(collection(db, "chat"), data);
  }
}

export default new DataService();
