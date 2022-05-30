<template>
  <v-container>
    <v-row>
      <v-btn @click="goback">
        뒤로가기
      </v-btn>
    </v-row>
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
    <v-btn @click="photoUpload">
      사진 업로드
    </v-btn>
  </v-container>
</template>

<script>

import { getDatabase, ref, set, child, get } from "firebase/database";
import { getStorage, uploadString, getDownloadURL} from "firebase/storage";
import {ref as storageRef} from "firebase/storage";

import PictureInput from 'vue-picture-input'


export default {
  data() {
    return {
      diary: null,
      image: null,
      photoNum: null,
      imageURL: null,
      
      
      
      
      
    };
  },
  components:{
    PictureInput
  },

  methods: {

    getSrc(imageURL){
      return  require(imageURL)

    },



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
      this.$router.replace("goDiary");
    },

    addDiary(){
      this.photoUpload();
      const db = getDatabase();
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      set(ref(db, 'users/' + userinfo.uid + '/Diary/' + localStorage.getItem("focusedDate") + '/DiaryTxt'), {
        diary :this.diary,
      });
      console.log('넘버 뭐냐',this.num)
      // 사진있다
      if(this.num === 1){
        console.log("넘버가 1일 때 실행")
        set(ref(db, 'users/' + userinfo.uid + '/Diary/' + localStorage.getItem("focusedDate") + '/photoExist'), {
          photoExist: 1,
        })
        this.num = 0
        this.showImg()
      }
      // if(this.num = 0){
        else{
        console.log("넘버가 0일 때 실행")
        set(ref(db, 'users/' + userinfo.uid + '/Diary/' + localStorage.getItem("focusedDate") + '/photoExist'), {
          photoExist: 0,
        })
      }
    

    },
    photoUpload(){
      if(this.image != null){
        console.log("돌을 던져")
        const storage = getStorage();
        const userinfo = JSON.parse(localStorage.getItem("userInfo"));
        const focus = localStorage.getItem("focusedDate")
        const stRef = storageRef(storage, 'users/' + userinfo.uid + '/' + focus);
        // const stRef = storageRef(storage, '/image')
        const imgFile = this.image;
        uploadString(stRef, imgFile, 'data_url').then((snapshot) => {
          console.log('Uploaded a data_url string!')
        });
        this.num = 1;
      }else{
        this.num = 0;
        console.log("사진없어용")
      }
    // this.$router.replace("goDiary");
    }

  },

  created() {
    this.num = 0;
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/` + userinfo.uid + '/Diary/' + localStorage.getItem("focusedDate") + '/DiaryTxt'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // console.log(data.diary)
          this.diary = data.diary
        }
      })
    get(child(dbRef, `users/` + userinfo.uid + '/Diary/' + localStorage.getItem("focusedDate") + '/photoExist'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.photoNum = data.photoExist
          console.log('이거야?',this.photoNum)
        }
      })
    this.showImg()
    },
};

</script>