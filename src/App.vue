<template>
  <div id="app">
    <v-app v-if="!isLoaded">
      <splash-component></splash-component>
    </v-app>
    <v-app v-else>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import splash from "./components/splash.vue";

export default {
  name: "App",
  components: {
    splash,
  },

  data: (e) => ({
    isLoaded: false,
  }),
  created() {
    this.splashing();
  },
  methods: {
    splashing() {
      setTimeout(() => {
        this.isLoaded = true;
        console.log("hihi");
      }, 7500);
    },
  },
};
</script>