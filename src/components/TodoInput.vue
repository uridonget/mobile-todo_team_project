<template>
  <div class="home">
    <v-container>
      <v-text-field
        v-model="newTodoItem"
        v-on:keyup.enter="addTodo"
        outlined color ='green'
        label="Title"
      ></v-text-field>

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            outlined color ='green'
            label="Pick your D-DAY"
            v-model="newDate"
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="newDate" no-title scrollable color="green">
          <v-spacer></v-spacer>
          <v-btn text color="green" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="green" @click="$refs.menu.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-textarea
        v-model="newTodoItemDetail"
        placeholder="Type Detailed Notation"
        v-on:keyup.enter="addTodo"
        outlined color ='green'
        label="Details"
        height="100"
      ></v-textarea>
      <v-divider></v-divider>
      <v-card-actions class="pt-3" >
        <v-btn  @click="clearInput" color="green" outlined> Clear </v-btn>
        <v-spacer></v-spacer>
         <!-- <v-btn @click="setCategory" color="green" outlined> category </v-btn> -->
        <v-btn @click="addTodo" color="green" outlined> 등록 </v-btn>
      </v-card-actions>

      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">경고</h3>
        <span slot="footer" @click="showModal = false"
          >할 일을 입력하세요.
          <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
        </span>
      </modal>
    </v-container>
  </div>
</template>

<script>
import Modal from "./common/AlertModal.vue";

export default {
  data() {
    return {
      newTodoItem: "",
      newTodoItemDetail: "",
      newDate: "",
      showModal: false,
    };
  },

  methods: {
    setCategory(){
      
    },
    addTodo() {
      if (this.newTodoItem !== "") {
        const value = {
          title: this.newTodoItem,
          detail: this.newTodoItemDetail,
          date: this.newDate,
          status: "할 일",
          getFixedOrNot: 'FALSE',
          pastTitle: this.newTodoItem,
          
        };
        this.$emit("addTodo", value);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoItem = "";
      this.newTodoItemDetail = "";
      this.newDate = "";
    },
  },
  components: {
    Modal: Modal,
  },
};
</script>