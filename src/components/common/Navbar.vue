<template>
 <div class="navbar">
    <div class="logo"  @click="$router.push('/home')">
      <img src="~assets/bilibili.png" alt="" >
    </div>
    <div>
      <p>
      请输入内容
        <van-icon class="input-icon"  name="search" />
      </p>
    </div>
    <div>
      <img :src="imgUrl" alt="" @click="$router.push('/edit')" v-if="imgUrl">
      <img src="~assets/logo.png" alt="" @click="$router.push('/login')"v-else>
      <p>下载App</p>
    </div>

 </div>
</template>

<script>
 export default {
  name: '',
  data () {
   return {
     imgUrl:''
   }
  },
  components: {

  },
  async mounted(){
    if(localStorage.getItem('token')){
      const res = await this.$http.get('/user/'+localStorage.getItem('id'))
      this.imgUrl = res.data[0].user_img
    }
  }
 }
</script>

<style lang="less">
  .navbar{
    height: 12.5vw;
    background-color: white;
    display: flex;
    .logo{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30.556vw;
      img{
       width: 70%;
      }
    }
     div:nth-child(2){
      flex: 1;
      display: flex;
      align-items: center;
      margin: 0 1.389vw;
      p{
        background-color: #f4f4f4;
        height: 6.667vw;        
        position: relative;
        width: 90%;
        padding-left: 8.333vw;
        border-radius: 2.778vw; 
        color: #aaa;  
        font-size: 3.333vw; 
        line-height: 6.667vw;   
        .input-icon{
          position: absolute;
          line-height: 6.667vw;
          left: 2.778vw;
          color: #aaa;
          
            
        }    
      }
    }
    div:nth-child(3){
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 6.667vw;
        height: 6.667vw;
      }
      p{
        padding: 1.389vw 2.778vw;
        margin: 0 1.389vw;
        background-color: #fb7299;
        color: white;
        border-radius: 0.833vw;
        font-size: 3.611vw;
      }
      
    }
    
  }
 
</style>

