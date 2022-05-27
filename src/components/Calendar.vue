<template>
  <div>
    <br />
    <v-sheet tile height="54" class="d-flex">
      <v-row>
        <v-btn icon class="ma-3" @click="goBack">
          <v-icon x-large>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
       
        <h2>오늘은 {{dateString}}</h2>
         <v-spacer></v-spacer>
        <v-btn icon class="ma-3" @click="$refs.calendar.prev()">
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="ma-3" @click="$refs.calendar.next()">
          <v-icon x-large>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
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
var today = new Date();

var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);

export default {
  data: () => ({
    type: "month",
    types: ["month", "week", "day"],
    mode: "stack",
    weekday: [1, 2, 3, 4, 5, 6, 0],
    weekdays: [{ text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] }],
    focus: "",
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
    dateString: year + '-' + month  + '-' + day
    
  }),

  methods: {
    goBack() {
      console.log("뒤로가기");
      this.$router.replace("goBack");
    },

    showEvent(focus) {
      console.log(focus);
      localStorage.setItem("focusedDate", focus);
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