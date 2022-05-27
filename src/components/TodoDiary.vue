<template>
  <v-container>
    <v-row>
      <v-btn @click="goback">
        뒤로가기
      </v-btn>
    </v-row>
    <v-row>
      <picture-input 
        ref="pictureInput" 
        @change="onChange"
        v-model="image" 
        width="300" 
        height="300" 
        margin="16" 
        accept="image/jpeg,image/png" 
        size="10" 
        :removable="true"
        :customStrings="{
          upload: '<h1>Bummer!</h1>',
        }">
      </picture-input>
      <!-- <v-card>
        {{ image }}
      </v-card> -->
      
    </v-row>
    <v-row>
    <v-textarea
      v-model="diary"
      placeholder=""
      v-on:keyup.enter="addDiary"
      outlined color ='green'
      label="일기작성"
      height="100"
    ></v-textarea>
    </v-row>
    <v-btn @click="addDiary">
      일기 저장
    </v-btn>
    <v-btn @click="photoUpload">
      업로드버튼 테스트
    </v-btn>
    <v-card>
      {{ image }}
    </v-card>
    
    

  </v-container>
</template>

<script>

import { getDatabase, ref, set, child, get } from "firebase/database";
import { getStorage, uploadString } from "firebase/storage";
import {ref as storageRef} from "firebase/storage";

import PictureInput from 'vue-picture-input'


export default {
  data() {
    return {
      diary: null,
      image: null,
      
    };
  },
  components:{
    PictureInput
  },

  methods: {

    onChange(image){
      console.log("새 사진입니다.")
      if(image) {
        console.log('Picture loaded')
        this.image = image
        console.log(typeof(image))
      } else{
        console.log("File not supported")
      }

    },
    
    goback(){
      console.log("뒤로가기")
      localStorage.removeItem("focusedDate");
      this.$router.replace("caldiary");
    },

    addDiary(){
      const db = getDatabase();
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      set(ref(db, 'users/' + userinfo.uid + '/Diary/' + localStorage.getItem("focusedDate")), {
        diary :this.diary,
      });
      
    },
    photoUpload(){
      console.log("돌을 던져")
      const storage = getStorage();
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      const focus = localStorage.getItem("focusedDate")
      // console.log("스토리지까지는 성공")
      const stRef = storageRef(storage, userinfo.uid, focus);
      // console.log("Ref까지 성공")
      // console.log(stRef)
      const imgFile = this.image;
      // const obimage = JSON.parse(image);
      
      // console.log('여기까지는..')
      // console.log(imgFile)
      // uploadString(stRef, imgFile).then((snapshot) => {
      //   console.log('image 업로드 성공');

      // });
      const message4 = imgFile;
      uploadString(stRef, imgFile, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
      });
    }
  },
  created() {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/` + userinfo.uid + '/Diary/' + localStorage.getItem("focusedDate")))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // console.log(data.diary)
          this.diary = data.diary
        }
      })
    },
};

</script>