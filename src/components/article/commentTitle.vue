<template>
 <div class="comment">
  <p class="comment-title">
    <span>评论</span>
    <span>({{dataLength}})</span>
  </p>
  <div class="commentMyInfo">
    <img :src="myUser.user_img" alt="" v-if="myUser.user_img">
    <img src="~assets/logo.png" alt="" v-else>
    <input type="text" placeholder="说点什么吧" v-model="comconent" ref="Postipt">
    <button @click="publish">发表</button>
  </div>

 </div>
</template>

<script>
 export default {
   props:['dataLength'],
  name: '',
  data () {
   return {
     myUser:{},
     comconent:''
   }
  },
  components: {

  },
  methods:{
    async myUserInfo(){
      const res = await this.$http.get('/user/'+localStorage.getItem('id'))
      this.myUser = res.data[0]
    },
   async publish(){
     if(!this.myUser && !localStorage.getItem('token') && !localStorage.getItem('id')){
       this.$msg.fail('请先登录')
       return
     }
     this.$emit('Postcomment',this.comconent)
     this.comconent = ''
   },
   //点击回复之后聚焦到输入框
   foucusIpt(){
     this.$refs.Postipt.focus()
   }
  },
  created(){
     if(localStorage.getItem('token')){
        this.myUserInfo()
     }
  },
 
 }
</script>

<style lang="less">
  .comment{
    
    padding:  8.333vw 2.778vw 0 2.778vw;
    .comment-title{
      span:nth-child(2){
        color: #aaa;
        margin-left: 1.389vw;
      }
    }
    .commentMyInfo{
      padding: 10px 0;
      display: flex;
      img{
        width: 25px;
        height: 25px;
      }
      input{
        outline: none;
        border: 0;
        background-color: #f4f4f4;
        border-radius: 13px;
        padding: 0 15px;
      }
      button{
        outline: none;
        border: 0;
        border-radius: 13px;
        background-color:#fb7299;
        color: white;
        font-size: 13px;
        padding: 0 10px;
      }
    }
  }
 
</style>
