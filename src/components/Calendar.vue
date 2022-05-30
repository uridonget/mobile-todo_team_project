<template>
  <div>
    <v-app-bar
      app
      color="green"
      dark
      hide-on-scroll
      prominent
      scroll-target="#scrolling-techniques-10"
      height="130"
    ><v-col>
      <v-row>
        <v-btn icon class="ma-3" @click="goBack">
          <v-icon x-large>mdi-chevron-left</v-icon>
        </v-btn>
      </v-row>
      <v-spacer></v-spacer>
      <v-row>
        <v-btn icon class="ma-3" @click="$refs.calendar.prev()">
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn><v-spacer></v-spacer>
        <h3 class="ma-3"> {{ dateString }} </h3>
        <v-spacer></v-spacer>
        <v-btn icon class="ma-3" @click="$refs.calendar.next()">
          <v-icon x-large>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row></v-col>
    </v-app-bar>
     <br /><br />
    <br /><br /> <br/><br/>

    <v-sheet height="550">
      <v-calendar
        ref="calendar"
        color="#4caf50"
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
var month = ("0" + (today.getMonth() + 1)).slice(-2);
var day = ("0" + today.getDate()).slice(-2);

export default {
  data: () => ({
    type: "month",
    types: ["month", "week", "day"],
    mode: "stack",
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [{ text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] }],
    focus: "",
    events: [],

    names: [],
    dateString: year + "-" + month + "-" + day,
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