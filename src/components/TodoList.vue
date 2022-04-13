<template>
  <v-container>
    <v-row>
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel v-for="(todoItem) in propsdata" :key="todoItem">
            <v-expansion-panel-header>
              <v-row>
                <v-col>
                  <v-card height="70">
                    <h2>D-DAY</h2>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card>
                    <!-- <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title v-text="todoItem.title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item> -->
                    <v-text-field
                    v-model="todoItem.title"></v-text-field>
                  </v-card>
                </v-col>
                <v-col>
                    <v-btn height="70">
                      {{ todoItem.status }}
                    </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-textarea
                  v-model="todoItem.detail"
                  label="Detail"
                ></v-textarea>

                Due Date : {{ todoItem.date }}

                <v-list-item-action @click="removeTodo(todoItem, index)">
                  <v-btn icon>
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
export default {
  props: ["propsdata"],
  methods: {
    removeTodo(todoItem, index) {
      this.$emit("removeTodo", todoItem, index);
    },
  },
};
</script>

<style scoped>
/* ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
} */
/* li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
} */
/* .checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
} */
/* .removeBtn {
  margin-left: auto;
  color: #de4343;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
} */
</style>
