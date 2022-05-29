<template>
  <vue-splash
    :show="true"
    :logo="logo"
    color="#4caf50"
    :size="300"
    :fixed="true"
  >
  </vue-splash>
</template>

<script>
// import YourLogo from "/src/assets/logo.png";
import YourLogo from "@/assets/sharksplash.png";

export default {
  name: "splash",
  computed: {
    logo() {
      return YourLogo;
    },
  },
};
</script>