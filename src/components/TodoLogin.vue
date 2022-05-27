<template>
  <v-main >
    <v-container>
      <h2 color="#4caf50">Login</h2>

      <br /><br />
      <v-spacer></v-spacer>
      <v-text-field
        v-model="email"
        dense
        outlined
        color="#4caf50"
        label="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        dense
        outlined
        color="#4caf50"
        label="Password"
        hint="At least 6 characters"
        counter
      ></v-text-field>
    </v-container>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn outlined @click="addUser" color="#4caf50"> Signup </v-btn>
      <v-spacer></v-spacer>
      <v-btn outlined @click="login" color="#4caf50"> Login </v-btn>
    </v-card-actions>
    <v-spacer></v-spacer>
    <br />
    <v-card>
      <v-img 
      src="https://c.tenor.com/-fW-Mhg-baoAAAAi/shark-swim.gif">
    </v-img></v-card>
  </v-main>
</template>

<script>

 


import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";




export default {
  data() {
    return {
      msg: "hi",
      auth: getAuth(),
      email: "",
      password: "",
    };
  },
  methods: {
    addUser() {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          //var user = userCredential.user;
          this.msg = "loggined as " + userCredential.user.email;
          alert("회원가입!");

          // ...
        })
        .catch((error) => {
          alert("에러 : " + error.message);
        });
    },
    login() {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          console.log("userCredential.user :", userCredential.user);
          this.name = userCredential.user.email;
          alert("로그인 완료!");
          this.$router.replace("Login");
          // ...
        })
        .catch((error) => {
          alert("에러 : " + error.message);
        });
    },
  },
  beforeCreate() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        localStorage.setItem("userInfo", JSON.stringify(user));
        this.$router.push({ path: "Login" });

        // ...
      } else {
        console.log("not logged in");
        // User is signed out
        // ...
      }
    });
  },
};
</script>

<style>
</style>