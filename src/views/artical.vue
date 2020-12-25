<template>
 <div v-if="model" style="background: white">
    <nav-bar></nav-bar>
    <div class="detailinfo">
      <div class="video">
      <!--属性controls 向用户显示控件-->
        <video controls="controls" :src="model.content"></video>
      </div>
      <div class="detailinfoText" >
        <div>
          <span>{{model.category.title}}</span>
          <span>{{model.name}}</span>
        </div>
        <div>
          <span>蜡笔小新</span>
          <span>146.4万次观看</span>
          <span>5281弹幕</span>
          <span>{{model.date}}</span>
        </div>
        <div>
          <p @click="collectionClick" :class="{activeColor:collectionActive}">
            <span class="iconfont">&#xe642;</span>
            <span>收藏</span>
          </p>
          <p @click="subscriptionClick" :class="{activeColor:subscriptionActive}">
            <span class="iconfont">&#xe61d;</span>
            <span>关注</span>
          </p>
          <p>
            <span class="iconfont">&#xe691;</span>
            <span>分享</span>
          </p>
        </div>
      </div>

    </div>
    <div class="detailparent">
      <cover class="detailitem" v-for="(item,index) in commendList" :key="index" :detailitem="item"></cover>
    </div>
    <comment-title :dataLength="lens"  @Postcomment="postSucess" ref="commentIpt"></comment-title> 
    <comment  @lengthSelect="len => lens = len" @publishClick="PostChildClick" ref="commentPublish"></comment>
    
 </div>
</template>

<script>
import NavBar from '../components/common/Navbar.vue'
import cover from './cover.vue'
import commentTitle from '../components/article/commentTitle.vue'
import comment from '../components/article/comment.vue'
 export default {
  
  data () {
   return {
     model:null,
     commendList:[],
     lens:null,
     Postcom:{
       comment_content:'',
       comment_date:'',
       parent_id:null,
       article_id:null
     },
     collectionActive: null,
     subscriptionActive:null
   }
  },
  components: {
    NavBar,
    cover,
    commentTitle,
    comment
  },
  methods:{
    //获取文章信息
    async articalitemDate(){
      const res = await this.$http.get('/article/' + this.$route.params.id)
      this.model = res.data[0]
      if(this.model){
        this.subscriptionInit()
      }
    },
    //获取推荐文章
    async commendData(){
      const res = await this.$http.get('/commend')
      this.commendList = res.data
    },
    //发送评论
    async postSucess(res){
      
      const date = new Date()
      let m = date.getMonth()+1
      let d = date.getDate()
      if(m < 10){
        m = '0'+m 
      }
      if(d < 10){
        d = '0'+d
      }
      let str = `${m}-${d}`
      this.Postcom.comment_content = res
      this.Postcom.comment_date = str
      this.Postcom.article_id = this.$route.params.id
      const result = await this.$http.post('/comment_post/' + localStorage.getItem('id'),this.Postcom)
      this.$refs.commentPublish.commentData()
      if(result.status == 200){
        this.$msg.success('评论成功')
      }
        
    },
    //聚焦输入框
    PostChildClick(id){
      this.Postcom.parent_id = id
      this.$refs.commentIpt.foucusIpt()
    },
    //点击收藏
    async collectionClick(){
      if(localStorage.getItem('token')){
         const res = await this.$http.post('/collection/'+localStorage.getItem('id'),{article_id:this.$route.params.id}) 
         if(res.data.msg == '收藏成功'){
           this.collectionActive = true
         }else{
           this.collectionActive = false
         }
         this.$msg.fail(res.data.msg);
      }
    },
   //点击关注
    async subscriptionClick(){
      if(localStorage.getItem('token')){
         const res = await this.$http.post('/sub_scription/'+localStorage.getItem('id'),{sub_id:this.model.userid}) 
         if(res.data.msg == '关注成功'){
           this.subscriptionActive = true
         }else{
           this.subscriptionActive = false
         }
          this.$msg.fail(res.data.msg);
      }
    },
   //进入页面获取是否收藏
    async collectionInit(){
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/collection/'+localStorage.getItem('id'),{
          params:{
            article_id:this.$route.params.id
          }
        })
        this.collectionActive =res.data.success
      }
    },
    //进入页面获取是否关注
    async subscriptionInit(){
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/sub_scription/'+localStorage.getItem('id'),{
          params:{
            sub_id:this.model.userid
          }
        })
        this.subscriptionActive =res.data.success
      }
    }

    
  },
  created(){
    this.articalitemDate()
    this.commendData()
    this.collectionInit()
   
    
  },
  watch:{
    $route(){
       this.articalitemDate()
       this.commendData()
    }
  }
 
 }
 
</script>

<style lang="less">
  .detailinfo{
    .video{
      width:100%;
      video{
        width: 100%;
      }
    }
    .detailinfoText{
      padding: 15.001px;
      border-bottom: 1px solid #eee;
      div:nth-child(1){
        span:nth-child(1){
          padding: 0 2.778vw;
          color: #fb7299;
          background-color: #f4f4f4;
          border-radius: 2.778vw;
        }
      }
      div:nth-child(2){
        padding: 2.778vw 2.778vw;
        span{
          padding:0 5px;
          color:#aaa;
          font-size: 3.333vw;
        }
        span:nth-child(1){
          color:black;
          font-size:3.611vw;
          padding-right: 2.778vw;
        }
      }
      div:nth-child(3){
         padding: 0 2.778vw;
         display: flex;
        p{
            margin:0 2.778vw 0 0;
            display: flex;
            align-items: center;
            color: #757575;
            font-size: 3.611vw;
        }
        .activeColor{
          color: #fb7299
        }
      }
    }

  }
  .detailparent{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
    .detailitem{
      margin: 1.389vw 0;
      width: 45%;
    }
  }
 
</style>
