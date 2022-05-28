<template>
  
    <v-app v-if="!isLoaded">
      <splash></splash>
    </v-app>

    <v-app v-else>
      <router-view></router-view>
    </v-app>
  
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
      }, 2500);
    },
  },
};
</script>