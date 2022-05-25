<template>
  <v-container>
    <v-row>
      {{ propsdata }}
    </v-row>
    <v-row class="pt-2">
      <v-bottom-navigation :value="filter" color="green">
        <v-spacer></v-spacer>
        <v-btn @click="getClickedAll"> 모두 </v-btn>

        <v-divider vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn @click="getClickedTodo"> 할 일 </v-btn>

        <v-spacer></v-spacer>
        <v-divider vertical></v-divider>
        <v-btn @click="getClickedOngoing"> 진행 중 </v-btn>
        <v-spacer></v-spacer>
        <v-divider vertical></v-divider>
        <v-btn @click="getClickedEnd"> 완료 </v-btn>
        <v-spacer></v-spacer>
      </v-bottom-navigation>
    </v-row>
    <v-row class="mt-5">
      <v-expansion-panels
        v-for="(todoItem, index) in propsdata"
        :key="todoItem"
      >
        <v-expansion-panel
          v-if="
            (todoItem.status === showStatus || showStatus === '모두') &&
            todoItem.getFixedOrNot === 'TRUE'
          "
        >
          <v-expansion-panel-header>
            <v-col cols="2">
              <v-btn icon @click="getFixed(todoItem, index)" color='green'>
                <v-icon>mdi-pin</v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="5"
              v-if="
                (Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1 !=
                  0 &&
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) +
                    1 <
                    1) ||
                Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1 ===
                  1
              "
            >
              <v-card-text class="red--text">
                D-{{
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + 1
                }}
              </v-card-text>
            </v-col>
            <v-col
              cols="5"
              v-if="
                0 ===
                Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1
              "
            >
              <v-card-text class="black--text"> D-day </v-card-text>
            </v-col>

            <v-col
              cols="5"
              v-if="
                4 <=
                Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1
              "
            >
              <v-card-text class="green--text">
                D-{{
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + 1
                }}
              </v-card-text>
            </v-col>
            <v-col
              cols="5"
              v-if="
                Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1 <=
                  3 &&
                2 <=
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) +
                    1
              "
            >
              <v-card-text class="yellow--text">
                D-{{
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + 1
                }}
              </v-card-text>
            </v-col>

            <v-col cols="10">
              <v-text-field v-model="todoItem.title" color="green">
                {{ todoItem.title }}
              </v-text-field>
            </v-col>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row>
              <v-textarea
                height="50"
                outlined
                color="green"
                v-model="todoItem.detail"
              ></v-textarea>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="$emit('changeStatus', index)" color="green">
                  {{ todoItem.status }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="auto">
                <v-btn
                  @click="editTodo(todoItem, index)"
                  outlined
                  color="green"
                >
                  수정
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto">
                <v-btn
                  @click="removeTodo(todoItem, index)"
                  outlined
                  color="green"
                >
                  삭제
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row class="mt-3">
      <v-expansion-panels
        v-for="(todoItem, index) in propsdata"
        :key="todoItem"
      >
        <v-expansion-panel
          v-if="
            (todoItem.status === showStatus || showStatus === '모두') &&
            todoItem.getFixedOrNot === 'FALSE'
          "
        >
          <v-expansion-panel-header>
            <v-col cols="2">
              <v-btn icon @click="getFixed(todoItem, index)">
                <v-icon>mdi-pin</v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="5"
              v-if="
                (Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1 !=
                  0 &&
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) +
                    1 <
                    1) ||
                Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1 ===
                  1
              "
            >
              <v-card-text class="red--text">
                D-{{
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + 1
                }}
              </v-card-text>
            </v-col>
            <v-col
              cols="5"
              v-if="
                0 ===
                Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1
              "
            >
              <v-card-text class="black--text"> D-day </v-card-text>
            </v-col>

            <v-col
              cols="5"
              v-if="
                4 <=
                Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1
              "
            >
              <v-card-text class="green--text">
                D-{{
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + 1
                }}
              </v-card-text>
            </v-col>
            <v-col
              cols="5"
              v-if="
                Math.floor(
                  (new Date(todoItem.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1 <=
                  3 &&
                2 <=
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) +
                    1
              "
            >
              <v-card-text class="yellow--text">
                D-{{
                  Math.floor(
                    (new Date(todoItem.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + 1
                }}
              </v-card-text>
            </v-col>
            <v-col cols="10">
              <v-text-field v-model="todoItem.title" color="green">
                {{ todoItem.title }}
              </v-text-field>
            </v-col>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row>
              <v-textarea
                height="50"
                outlined
                color="green"
                v-model="todoItem.detail"
              ></v-textarea>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="$emit('changeStatus', index)" color="green">
                  {{ todoItem.status }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="auto">
                <v-btn
                  @click="editTodo(todoItem, index)"
                  outlined
                  color="green"
                >
                  수정
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto">
                <v-btn
                  @click="removeTodo(todoItem, index)"
                  outlined
                  color="green"
                >
                  삭제
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
    editTodo(todoItem, index) {
      this.$emit("editTodo", todoItem, index);
    },
    getFixed(todoItem, index) {
      this.$emit("getFixed", todoItem, index);
    },

    getClickedAll() {
      this.showStatus = "모두";
    },
    getClickedTodo() {
      this.showStatus = "할 일";
    },
    getClickedOngoing() {
      this.showStatus = "진행 중";
    },
    getClickedEnd() {
      this.showStatus = "완료";
    },
  },

  data() {
    return {
      statuses: ["to-do", "in-progress", "finished"],
      showStatus: "모두",
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
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
}
</style>
