<template>
  <v-container>
    <v-btn @click="goback">
      뒤로가기
    </v-btn>


    <v-textarea
      v-model="diary"
      placeholder=""
      v-on:keyup.enter="addDiary"
      outlined color ='green'
      label="일기작성"
      height="100"
    ></v-textarea>
    <v-btn @click="addDiary">
      일기 저장
    </v-btn>
    

  </v-container>
</template>

<script>

import { getDatabase, ref, set, child, get } from "firebase/database";


export default {
  data() {
    return {
      
    };
  },

  methods: {
    goback(){
      console.log("뒤로가기")
      this.$router.replace("caldiary");
    },

    addDiary(){
      const db = getDatabase();
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      set(ref(db, 'users/' + userinfo.uid + '/Diary/' + localStorage.getItem("focusedDate")), {
        diary :this.diary,
      });
      
    },



  },

  components: {
    
  },
};
</script>