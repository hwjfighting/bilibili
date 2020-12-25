<template>
 <div class="commentItems">
     <div class="commentItem" v-for="(item,index) in commentChild">
        <div class="userimg">
          <img v-if="item.userinfo" :src="item.userinfo.user_img" alt="">
          <img v-else src="~assets/picture.png" alt="">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>此用户无姓名</span>
            <span >{{item.comment_date}}</span>
          </p>
        </div>
        <div class="commmentContent">
          <!--二级评论 没有temp 不用写回复XXX-->
         <div v-if="!temp">
            {{item.comment_content}} <span class="publish" @click="PostItemcomment(item.comment_id)">回复</span>
          </div>
          <!-- 三级评论 temp为真 需要回复XXX-->
          <div v-else>
            回复<span style="color: #478ef0">{{item.parent_user_info.name}}</span>:{{item.comment_content}} <span class="publish" @click="PostItemcomment(item.comment_id)">回复</span>
          </div>
          <!--调用自身组件 -->
          <commentchild-item :commentChild="item.child" :temp="true" @postChild="postChild"></commentchild-item>
        </div>
       
      </div>
      
 </div>
</template>

<script>
 export default {
  name:'commentchildItem',
  props:['commentChild','temp'],
  data () {
   return {

   }
  },
  components: {

  },
  methods:{
    //emit发送后自身接收，接收后继续发送，待传到父组件的下一级，父组件就用@接收
    PostItemcomment(id){
      this.$emit('postChild',id)
       this.$emit('PostPublish',id)
    },
    postChild(id){
      this.PostItemcomment(id)
      this.$emit('PostPublish',id)
    }
  }
 }
</script>

<style lang="less">
  .commentItems{
    .commentItem{
      display: flex;
      flex-direction: column;
      .userimg{
        display: flex;
        img{
           margin: 0 10px 10px 0;
        }
        p{
          display:flex;
          flex: 1;
          justify-content: space-between;
          font-size: 3.611vw;
          color: #555;
        }
      }
      .commmentContent{
        position: relative;
        .publish{
          position: absolute;
          color: red;
          right: 15px;
        }
      }
    }
  }
 
</style>
