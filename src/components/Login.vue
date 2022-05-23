<template>
  <div class="login">
    <v-container>
      <h2>Login</h2>

      <br /><br />
      <v-spacer></v-spacer>
      <v-text-field outlined color="#008000" label="email"></v-text-field>
      <v-text-field outlined color="#008000" label="password"></v-text-field>
      <v-divider></v-divider>
      <v-card-actions class="pt-3">
        <v-btn @click="idmake" color="#008000" outlined width="80">
          회원가입
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn t @click="login" color="#008000" outlined width="80">
          로그인
        </v-btn>
      </v-card-actions>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          function (user) {
            alert("로그인 완료!");
            this.$router.replace("hello");
          },
          function (err) {
            alert("에러 : " + err.message);
          }
        );
    },
    idmake() {
      this.$router.replace("idmake");
    },
  },
};
</script>
<style >
</style>