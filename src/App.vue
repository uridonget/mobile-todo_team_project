<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Category </v-list-item-title>
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
      app
      color="green"
      dark
      hide-on-scroll
      prominent
      scroll-target="#scrolling-techniques-10"
      height="100"
    >
      <v-col>
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-spacer></v-spacer>
          <v-text-field
            @blur="searchClosed = true"
            @focus="searchClosed = false"
            v-model="search"
            placeholder="Search"
            dense
            clearable
            prepend-inner-icon="mdi-magnify"
            class="expanding-search mt-1"
            :class="{ closed: searchClosed && !search }"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-toolbar-title>Just Do it! </v-toolbar-title>
        </v-row>
      </v-col>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <TodoInput v-on:addTodo="addTodo"></TodoInput>
      <TodoList
        v-bind:propsdata="todoItems"
        @removeTodo="removeTodo"
        @changeStatus="changeStatus"
        @editTodo="editTodo"
        @getFixed="getFixed"
      ></TodoList>
    </v-main>
    <v-footer color='white'>
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
    searchClosed: true,
    search: null,
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
    addCategory(){},
    addTodo(todoItem) {
      localStorage.setItem(todoItem.title, JSON.stringify(todoItem));
      this.todoItems.push(todoItem);
    },

    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem.title);
      this.todoItems.splice(index, 1);
    },

    getFixed(todoItem, index){
      console.log(todoItem)
      console.log(index)
      console.log(todoItem.getFixedOrNot)
      if(todoItem.getFixedOrNot === 'TRUE')
      todoItem.getFixedOrNot = 'FALSE'
      else
      todoItem.getFixedOrNot = 'TRUE'
      localStorage.setItem(todoItem.title, JSON.stringify(todoItem))
    },

    editTodo(todoItem) {
      localStorage.removeItem(todoItem.pastTitle)
      todoItem.pastTitle = todoItem.title
      localStorage.setItem(todoItem.title, JSON.stringify(todoItem));
    },

    changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.todoItems[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.todoItems[index].status = this.statuses[newIndex];
    },




  },
  created() {
    // let year = today.getFullYear();
    // console.log(year)
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






