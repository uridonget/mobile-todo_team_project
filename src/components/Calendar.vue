<template>
  <div>
    <v-sheet tile height="54" class="d-flex">
      <v-col>
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-select
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
        </v-btn>
      </v-col>
    </v-sheet>
    <v-spacer></v-spacer>
    <br /><br />
    <br /><br />
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        :weekdays="weekday"
        @change="updateRange"
       
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
    updateRange({ start, end }) {
      viewStart = this.$refs.calendar.getStartOfWeek(start);
      viewEnd = this.$refs.calendar.getEndOfWeek(end);

      this.events = this.getEvents(viewStart.date, viewEnd.date);
    },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>