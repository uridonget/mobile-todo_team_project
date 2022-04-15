<template>
  <v-container>
    <v-expansion-panels v-for="(todoItem, index) in propsdata" :key="todoItem">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-row>
            <v-col>
              {{ todoItem.date }}
            </v-col>
            <v-col>
              <v-text-field
              v-model="todoItem.title">
                {{ todoItem.title }}
              </v-text-field>
            </v-col>
            <v-col>
              <v-btn @click="$emit('changeStatus', index)">
                {{ todoItem.status }}
              </v-btn>
            </v-col>
          </v-row>

        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-textarea
            height="50"
            outlined
            v-model="todoItem.detail"
            ></v-textarea>
          </v-row>
          
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn>수정</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-btn @click="removeTodo(todoItem, index)">
                삭제
              </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>



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

  data() {
    
    return {
    statuses: ["to-do", "in-progress", "finished"],
    
    }
  
  
  
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
