<template>
 <div class="userdetail">
    <div>
      <div>
        <img class="user_img" :src="userInfo.user_img" v-if="userInfo.user_img" alt="">
        <img class="user_img" src="~assets/picture.png" alt="" v-else>
      </div>
      <div class="user_edit">
          <div>
            <p>
              <span>0</span>
              <span>粉丝</span>  
            </p>
            
            <p>
              <span>0</span>
              <span>关注</span>
            </p>
           
            <p>
              <span>0</span>
              <span>获赞</span>
            </p>
        
          </div>
          <div @click="$router.push('./edit')">
            <div class="edit_btn">编辑资料</div>
          </div>
          
          
      </div>
     
    </div>
     <div>
        <h2>{{userInfo.name}}</h2>
        <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
        <p v-else>这个人很神秘，什么都没有写</p>
      </div>
 </div>
</template>

<script>
 export default {
   props:['userInfo'],
  name: '',
  data () {
   return {

   }
  },
  components: {

  }
 }
</script>

<style lang="less">
  .userdetail{
    background-color: white;
    padding: 0 3.333vw;
    >div:nth-child(1){
      display: flex;
      .user_img{
        height: 23.611vw;
        width: 23.611vw;
        border-radius: 50%;
      }
      .user_edit{
        flex: 1;
        div:nth-child(1){
          display: flex;
          p{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 3.611vw;
            span:nth-of-type(even){
              color: #aaa;
            }
          } 
        }
        .edit_btn{
          border: 0.278vw solid #fb7299;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.833vw;
          color: #fb7299;
          border-radius: 1.111vw;
        }
        
      }
      
    }
    >div:nth-child(2){
      h2{
        margin: 2.778vw 0 0.833vw 0;
        font-weight: 400;
      }
      p{
        padding: 0;
        margin: 2.778vw 0;
        color: #aaa;
        font-size: 3.333vw;
      }
    }
    
  }
 
</style>

