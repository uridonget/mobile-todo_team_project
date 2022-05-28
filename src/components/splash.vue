<template>
<v-app>
  <vue-splash
    :show="true"
    :logo="logo"
    title="Welcome"
    color="#F29661"
    :size="500"
    :fixed="true"
  ><h2>fdfdfdf</h2>
  </vue-splash>
  
</v-app>
</template>

<script>
import YourLogo from "/src/assets/logo.png";

export default {
  name: "splash",
  computed: {
    logo() {
      return YourLogo;
    },
  },
};
</script>