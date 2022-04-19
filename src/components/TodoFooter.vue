<template>
  <v-container>
    <v-row class="text-center">
    <div class="clearAllContainer">
      <v-btn color='green' outlined @click="clearTodo">Clear All</v-btn>
    </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    clearTodo() {
      this.$emit("removeAll");
    },
  },
};
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
</style>
