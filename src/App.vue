<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :key="child.title">
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      color="green"
      dark
      hide-on-scroll
      prominent
      scroll-target="#scrolling-techniques"
      height="90"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Title </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <TodoInput v-on:addTodo="addTodo"></TodoInput>
      <TodoList
        v-bind:propsdata="todoItems"
        @removeTodo="removeTodo"
        @changeStatus="changeStatus"
        @editTodo="editTodo"
      ></TodoList>
    </v-main>
    <v-footer color="primary">
      {{ todoItems }}
      {{ typeof todoItems }}

      <TodoFooter v-on:removeAll="clearAll" />
    </v-footer>
  </v-app>
</template>

<script>
import TodoFooter from "./components/TodoFooter.vue";

import TodoList from "./components/TodoList.vue";
import TodoInput from "./components/TodoInput.vue";

export default {
  name: "App",

  components: {
    TodoList,
    TodoFooter,

    TodoInput,
  },

  data: () => ({
    drawer: null,
    todoItems: [],
    statuses: ["할 일", "진행 중", "완료"],
    items: [
      {
        action: "mdi-ticket",
        items: [{ title: "List item" }],
        title: "Attractions",
      },
    ],
  }),

  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
    addTodo(todoItem) {
      localStorage.setItem(todoItem.title, JSON.stringify(todoItem));
      this.todoItems.push(todoItem);
    },

    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem.title);
      this.todoItems.splice(index, 1);
    },

    editTodo(todoItem, index) {
      localStorage.removeItem(
        JSON.parse(localStorage.getItem(localStorage.key(index))).title
      );
      localStorage.setItem(todoItem.title, JSON.stringify(todoItem));
    },

    changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.todoItems[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.todoItems[index].status = this.statuses[newIndex];
    },
  },
  created() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        this.todoItems.push(
          JSON.parse(localStorage.getItem(localStorage.key(i)))
        );
      }
    }
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

