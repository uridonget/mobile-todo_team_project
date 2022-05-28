<template>
  <vue-splash
    :show="true"
    :logo="logo"
    color="#F29661"
    :size="300"
    :fixed="true"
  ><h2>fdfdfdf</h2>
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