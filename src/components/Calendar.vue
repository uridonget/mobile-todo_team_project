<template>
  <div>
    <v-sheet tile height="54" class="d-flex">
      <v-col>
        <v-btn icon class="ma-2" @click="goBack">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <!-- <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          full-width="False"
          hide-details
          class="ma-2"
          label="type"
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn> -->
      </v-col>
    </v-sheet>
    <v-spacer></v-spacer>
    <!-- <br /><br />
    <br /><br /> -->

    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        :weekdays="weekday"
        @click:date="showEvent(focus)"
      ></v-calendar>
    </v-sheet>
  </div>
</template>
<script>


export default {
  data: () => ({
    type: "month",
    types: ["month", "week", "day"],
    mode: "stack",
    weekday: [1, 2, 3, 4, 5, 6, 0],
    weekdays: [{ text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] }],
    value: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [],
  }),

  methods: {
    goBack(){
      console.log("뒤로가기");
      this.$router.replace("goBack");
      
    },

    showEvent(focus){
      console.log(focus)
      localStorage.setItem("focusedDate", focus)
      // if( localStorage.length >= 3){
      // this.$router.replace("goDiary");  
      // }
      this.$router.replace("goDiary");
      // else{
      //   this.showEvent(focus)
      // }

    },

  },
};
</script>