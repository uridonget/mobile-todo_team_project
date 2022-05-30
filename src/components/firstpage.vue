<template>
  <v-app id="app">
    <v-app-bar
      app
      color="green"
      dark
      hide-on-scroll
      prominent
      scroll-target="#scrolling-techniques-10"
      height="110"
    >
      <v-col>
        <v-row>
          <v-btn
            @click="caldiary"
            depressed
            left="large"
            class="ma-1"
            color="green"
          >
            <v-icon x-large> mdi-calendar-text </v-icon>
          </v-btn>

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-btn @click="logOut" depressed right class="ma-1" color="green">
            <v-icon x-large> mdi-logout </v-icon></v-btn
          >
        </v-row>

        <v-row>
          <v-col>
            <v-toolbar-title>Just Do it! </v-toolbar-title>
          </v-col>
          <!-- <v-col>
            <v-btn @click="userLogin">
              테스트
            </v-btn>
          </v-col> -->
        </v-row>
      </v-col>
    </v-app-bar>

    <v-main>
      <router-view>
        <TodoLogin v-on:testStone="testStone"></TodoLogin>
      </router-view>

      <TodoInput v-on:addTodo="addTodo"></TodoInput>
      <TodoList
        v-bind:propsdata="todoItems"
        @removeTodo="removeTodo"
        @changeStatus="changeStatus"
        @editTodo="editTodo"
        @getFixed="getFixed"
      ></TodoList>
    </v-main>
    <v-footer color="white">
      <TodoFooter v-on:removeAll="clearAll" />
    </v-footer>
    <!--  -->
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">알람</h3>
      <span slot="footer" @click="showModal = false">
        <v-card-actions v-for="todoItem in noTimeItems" :key="todoItem">
          <v-card outlined width="40">
            D-{{
              Math.floor(
                (new Date(todoItem.date).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              ) + 1
            }}</v-card
          >
          <v-spacer></v-spacer>
          <v-card outlined width="150"> {{ todoItem.title }}</v-card
          ><v-spacer></v-spacer>
        </v-card-actions>
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>
    <!--  -->
  </v-app>
</template>

<script>
import TodoFooter from "./TodoFooter.vue";
import TodoList from "./TodoList.vue";
import TodoInput from "./TodoInput.vue";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import Modal from "./common/AlertModal.vue";

export default {
  name: "App",

  components: {
    TodoList,
    TodoFooter,
    TodoInput,
    Modal: Modal,
  },

  data: () => ({
    searchClosed: true,
    search: null,
    drawer: null,
    todoItems: [],
    noTimeItems: [],
    showModal: false,
    // userInfo: null,
    statuses: ["할 일", "진행 중", "완료"],
  }),
  mounted() {
    this.alarm();
  },

  methods: {
    caldiary() {
      this.$router.replace("caldiary");
    },
    clearAll() {
      this.todoItems = [];
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      const db = getDatabase();
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/` + userinfo.uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const dataNum = Object.keys(data).length;

            set(ref(db, "users/" + userinfo.uid + "/todoList"), {
              todoList: null,
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    logOut() {
      const auth = getAuth();
      console.log("돌돌돌");
      signOut(auth).then(() => {
        // Sign-out successful.
        this.$router.push({ path: "Logout" });
        localStorage.removeItem("userInfo");
      });
    },

    addTodo(todoItem) {
      // localStorage.setItem(todoItem.title, JSON.stringify(todoItem));
      console.log("todoItem: ", todoItem);
      this.todoItems.push(todoItem);
      const db = getDatabase();
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      const nowTime = todoItem.nowTime;
      // set(ref(db, "users/" + userinfo.uid + "/" + nowTime), {
      //   todoItem,
      // });
      set(ref(db, "users/" + userinfo.uid + "/todoList/" + nowTime), {
        todoItem,
      });
      console.log("todoItems: ", this.todoItems);
    },

    removeTodo(todoItem, index) {
      // localStorage.removeItem(todoItem.title);
      this.todoItems.splice(index, 1);
      const db = getDatabase();
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      const nowTime = todoItem.nowTime;
      set(ref(db, "users/" + userinfo.uid + "/todoList/" + nowTime), {
        todoItem: null,
      });
    },

    getFixed(todoItem) {
      if (todoItem.getFixedOrNot === "TRUE") todoItem.getFixedOrNot = "FALSE";
      else todoItem.getFixedOrNot = "TRUE";
      // localStorage.setItem(todoItem.title, JSON.stringify(todoItem))
      const db = getDatabase();
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      const nowTime = todoItem.nowTime;
      set(ref(db, "users/" + userinfo.uid + "/todoList/" + nowTime), {
        todoItem,
      });
    },

    editTodo(todoItem) {
      // localStorage.removeItem(todoItem.pastTitle)
      todoItem.pastTitle = todoItem.title;
      // localStorage.setItem(todoItem.title, JSON.stringify(todoItem));
      const db = getDatabase();
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      const nowTime = todoItem.nowTime;
      set(ref(db, "users/" + userinfo.uid + "/todoList/" + nowTime), {
        todoItem,
      });
    },

    changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.todoItems[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.todoItems[index].status = this.statuses[newIndex];
    },

    userLogin() {
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/` + userinfo.uid + "/todoList"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const dataNum = Object.keys(data).length;
            for (var i = 0; i < dataNum; i++) {
              this.todoItems.push(Object.values(data)[i].todoItem);
              console.log("todoItems 생성과정 :", this.todoItems);
              console.log(this.todoItems.length);
              console.log(this.todoItems[i]);
              if (
                Math.floor(
                  (new Date(this.todoItems[i].date).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                  1 <
                4
              ) {
                this.noTimeItems.push(this.todoItems[i]);
              }
              console.log("noTime length : ", this.noTimeItems.length);
            }
            if (this.noTimeItems.length > 0) {
              navigator.vibrate([2000, 500, 2000, 500]);
              this.showModal = !this.showModal;
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // alarm() {
    //   console.log('todoItems: ',this.todoItems)
    //   console.log('type of todoItems: ', typeof(this.todoItems))
    //   console.log('todoItems.length: ', this.todoItems.length)

    //   for (var i = 0; i < this.todoItems.length; i++){
    //     if( (Math.floor((new Date(this.todoItems[i].date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) + 1) < 3){
    //       this.noTimeItems.push(this.todoItems[i])
    //     }
    //   }
    //   console.log('noTimeItems',this.noTimeItems)
    //   if(this.noTimeItems.length > 0){
    //     navigator.vibrate([2000, 500, 2000, 500]);
    //     this.showModal=!this.showModal
    //   }
    // },
  },
  created() {
    console.log("1");
    this.userLogin();
    console.log("this.noTimeItems : ", this.noTimeItems);
  },
};
</script>

<style lang='sass'>
.v-input.expanding-search
  transition: max-width 0.2s

  .v-input__slot
    cursor: pointer !important
    &:before, &:after
      border-color: transparent !important
  &.closed
    max-width: 30px
    .v-input__slot
      background: transition !important
</style>






