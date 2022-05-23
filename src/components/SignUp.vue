<template>
  <div class="signup">
    <v-container>
      <h2>Sign Up</h2>

      <br /><br />
      <v-spacer></v-spacer>
      <v-text-field outlined color="#008000" label="email"></v-text-field>
      <v-text-field outlined color="#008000" label="password"></v-text-field>
      <v-divider></v-divider>
      <v-card-actions class="pt-3">
        <v-btn @click="realidmake" color="#008000" outlined width="80">
          가입하기
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn t @click="relogin" color="#008000" outlined width="170">
          로그인으로 돌아가기
        </v-btn>
      </v-card-actions>
    </v-container>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "signUp",
  data() {
    return {
      email: "",
      auth: getAuth(),
      password: "",
    };
  },
  methods: {
    relogin() {
      this.$router.replace("login");
    },
    realidmake() {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          var user = userCredential.user;
          alert("회원가입 완료!");
          this.$router.replace("login");
        })
        .catch((error)  => {
          alert("에러 : " + err.message);
        });
    },
  },
};
</script>


 