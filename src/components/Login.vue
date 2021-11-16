<template>
  <button @click="login">Login with google</button>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

const login = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      credential.accessToken;

      result.user;
    })
    .catch((error) => {
      error.code;
      error.message;

      error.email;

      GoogleAuthProvider.credentialFromError(error);
    });
};
export default {
  method: {
    userLogin() {
      login();
    },
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        login();
      }
    });
  },
};
</script>
