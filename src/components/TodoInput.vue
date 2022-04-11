<template>
  <v-container>

        <v-textarea
        label="Type what you have to do"
        outlined
        v-model="newTodoItem"
        height="40">
        </v-textarea>

        {{ today }}
        {{ typeof( today )}}
        


        <!--  -->

    <v-flex xs10 sm11 md4>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="newDate"
            label="Choose your D-Day"
            rounded
            v-on="on"
          ></v-text-field>
        </template>

        <v-date-picker v-model="newDate" no-title scrollable>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">등록</v-btn>
        </v-date-picker>

       


        

      </v-menu>
      
    </v-flex>

    <!--  -->

        <v-textarea
        label="자세한 정보를 입력하세요"
        outlined
        v-model="newTodoItemDetail"
        height="100">
        </v-textarea>

        <v-col class="text-right">
          <v-btn class="mr-4" @click="addTodo">등록</v-btn>
        </v-col>


      


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
      showModal: false,
      today : Date(),
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        var value_str = JSON.stringify({title: this.newTodoItem, detail: this.newTodoItemDetail, date: this.newDate});
        
        const value = JSON.parse(value_str);
        
				this.$emit('addTodo', value);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },

    clearInput() {
      this.newTodoItem = '';
      this.newTodoItemDetail = '';
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
  background: green;
  height: 330px;
  line-height: 50px;
  border-radius: 5px;
  margin:10px;
}
.inputBoxDetail {
  background: greenyellow;
  height: 200px;
  line-height: 50px;
  border-radius: 5px;
  margin:10px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
  background-color: yellow;
  text-align: left;
  width: 400px;
  margin-top: 10px;
}
.inputBoxDetail input {
  margin: 5px;
  border-style: none;
  font-size: 0.9rem;
  background-color: pink;
  height: 190px;
  width: 355px;
  
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
