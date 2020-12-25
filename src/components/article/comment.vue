<template>
  <div class="commentParent">
    <div v-for="(item,index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userimg">
          <img v-if="item.userinfo" :src="item.userinfo.user_img" alt="">
          <img v-else src="~assets/picture.png" alt="">
        </div>
        <div class="commmentContent">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>此用户无姓名</span>
            <span >{{item.comment_date}}</span>
          </p>
          <div>
            {{item.comment_content}} <span class="publishs" @click="publishClick(item.comment_id)">回复</span>
          </div>
        </div>
      </div>
      <div style="padding-left: 40px"><comment-item  :commentChild="item.child" @PostPublish="publishClick"></comment-item></div>
    </div>
  
 </div>
</template>

<script>
import commentItem from './commentItem'
 export default {
  name: '',
  data () {
   return {
     commentList: null
   }
  },
  components: {
    commentItem
  },
  methods:{
    //获取评论
    async commentData(){
      const res = await this.$http.get('/comment/' + this.$route.params.id)
      if(res.data){
        //向父组件article传递 评论数 然后再用 pops 传递给子组件commentTitle
        this.$emit('lengthSelect',res.data.length)
      }
      this.commentList = this.changeCommentData(res.data)
    },
    //改变数据格式
    changeCommentData(data){
      function fn(temp){
        let arr1 = [];
        for(var i = 0;i<data.length;i++){
          if(data[i].parent_id == temp){
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
      
    },
    publishClick(id){
      console.log(id)
       this.$emit('publishClick',id)
    }
  },
  created(){
    this.commentData();
  }
 }
</script>

<style lang="less">
  .commentParent{
    padding: 2.778vw 2.778vw;
    >div{
       border-bottom: 0.278vw solid #e7e7e7;
    }
    .commentItem{
      display: flex;
     
      padding: 2.778vw 0;
      .userimg{
        margin-right: 2.778vw;
        img{
          width: 9.722vw;
          height: 9.722vw;
          border-radius: 50%;
        }
      }
      .commmentContent{
        flex: 1;
        position: relative;
        p{
          display:flex;
          justify-content: space-between;
          font-size: 3.611vw;
          color: #555;
        }
        div{
          font-size: 3.611vw;
        }
        .publishs{
          position: absolute;
          color: red;
          right: 0;
        }

      }
    }
  }
 
</style>
