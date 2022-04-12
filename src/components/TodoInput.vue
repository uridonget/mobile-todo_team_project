<template>
  <v-container>
    <v-row class="red">
      <v-col>
        <v-text-field
        label="Title"
        outlined
        v-model="newTodoItem"
        class="blue"
        height="20">
        </v-text-field>
      </v-col>
    </v-row>

    <v-row class="green">
      <v-col>
        
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
                label="Due Date"
                rounded
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="newDate" no-title scrollable>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">등록</v-btn>
            </v-date-picker>
          </v-menu>  
        
      </v-col>
    </v-row>

    <!--  -->
    <v-row class="blue">
      <v-col>
        <v-textarea
        class="red"
        label="자세한 정보를 입력하세요"
        outlined
        v-model="newTodoItemDetail"
        height="100">
        </v-textarea>
      </v-col>
    </v-row>

    <v-row class="pink">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn class="mr-4" @click="addTodo">등록</v-btn>
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
      this.newDate = '';
    }
  },
  components: {
    Modal: Modal
  }
}
</script>

<style scoped>

.addTitle {
  color: blue;
  vertical-align: middle;
}

.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
