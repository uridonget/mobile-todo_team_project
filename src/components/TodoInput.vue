<template>

  <v-container>

    <v-text-field 
    v-model="newTodoItem" 
    placeholder="Type what you have to do" 
    v-on:keyup.enter="addTodo"
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
            v-model="newDate"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="newDate"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

    

    <v-textarea 
    v-model="newTodoItemDetail" 
    placeholder="Type Detailed Notation" 
    v-on:keyup.enter="addTodo"
    outlined
    height="60"
    ></v-textarea>

    

    <v-row>
      <v-col
      cols="9"
      ></v-col>

      <v-col>
        <v-btn @click="addTodo">
          등록
        </v-btn>
      </v-col>
    </v-row>

    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="showModal = false">할 일을 입력하세요.
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>

  </v-container>
  
  
</template>

<script>
import Modal from './common/AlertModal.vue'

export default {
  data() {
    return {
      newTodoItem: '',
      newTodoItemDetail: '',
      newDate: '',
      showModal: false
    }
  },

  
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        const value = {title: this.newTodoItem, detail: this.newTodoItemDetail, date: this.newDate, status: "할 일"};
				this.$emit('addTodo', value)
        this.clearInput();

        // console.log(typeof(this.newTodoItem))
        // console.log(typeof(this.newTodoItemDetail))

      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoItem = '';
      this.newTodoItemDetail = '';
      this.newDate = '';
    }
  },
  components: {
    Modal: Modal
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  margin:10px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: inline-block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
