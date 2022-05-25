<template>
  <v-main>
    <v-form
        ><h2>Welcome</h2>
         <br /><br />
          <v-spacer></v-spacer>
            <v-text-field v-model="email" outlined color='#4caf50' label="email"></v-text-field>
            <v-text-field
              v-model="password"
              outlined color ="#4caf50"
              label="Password"
              hint="At least 6 characters"
              counter
            ></v-text-field>
        </v-form>
        <v-card-actions>
    <v-btn outlined @click="addUser" color ='#4caf50'> Signup </v-btn>
    
    <v-btn outlined @click="login" color= '#4caf50' > Login </v-btn>
    <v-btn @click="testStone">돌을 던지자</v-btn>
        </v-card-actions>
      
  </v-main>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged  
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
          this.msg = "loggined as " + userCredential.user.email;                  
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
          console.log(userCredential.user);
          this.name = userCredential.user.email; 
           alert("로그인 완료!");  
          this.$router.replace('hello')       
          // ...
        })
        .catch((error) => {
         alert("에러 : " + error.message);
        });
    },

    // 
    userLogin() {
      this.$emit("userLogin");
    },
    testStone(){
      this.$emit("testStone");
    },
    throwStone(){
      console.log("돌")
    }

    // 

  },
  beforeCreate() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('2');
        localStorage.setItem("userInfo" ,JSON.stringify(user))
        this.throwStone();

        this.$router.push({ path: "todo" });

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