<template>
  <vue-splash
    :show="true"
    :logo="logo"
    title="Welcome"
    color="#F29661"
    :size="300"
    :fixed="true"
  />
</template>

<script>
import YourLogo from "/src/assets/logo.png";

export default {
  name: "splash-component",
  computed: {
    logo() {
      return YourLogo;
    },
  },
};
</script>