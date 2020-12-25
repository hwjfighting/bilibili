<template>
 <div v-if="model" class="editViews">
    <div style="margin-bottom: 10px">
      <nav-bar></nav-bar>
    </div>
    <div class="uploadfile">
      <!--使用preview-size="100vw" 使得图片和屏幕等宽，再设置overflow：hidden和opacity 实现点击整个div都可上传图片-->
      <van-uploader :after-read="afterRead" preview-size="100vw" class="uploadimg"/>
      <edit-banner left="头像">
        <img :src="model.user_img" alt="" slot="right" v-if="model.user_img">
        <img  src="~assets/picture.png" slot="right" v-else>
      </edit-banner>
    </div>
    <edit-banner left="昵称" @bannerClick="show = true">
      <!--href="javascript:;" 阻止页面跳转-->
      <a href="javascript:;" slot="right"> {{model.name}}</a>
    </edit-banner>
    <edit-banner left="账号">
      <a href="javascript:;" slot="right"> {{model.username}}</a>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="genderShow = true">
      <a href="javascript:;" slot="right"> {{model.gender == 0?'男':'女'}}</a>
    </edit-banner>
    <edit-banner left="个签" @bannerClick="textShow = true">
      <a href="javascript:;" slot="right"> {{model.user_desc}}</a>
    </edit-banner>
    <div class="bottom">
      <div class="editback" @click="$router.push('/userinfo')">返回个人中心</div>
      <div class="logout" @click="logout">退出登录</div>
    </div>
    
    <!--弹出框默认隐藏可放在任意位置-->
    <!--修改昵称的弹出框-->
    <van-dialog 
      v-model="show" 
      title="昵称" 
      @confirm="confirmClick" 
      @cancel="content = ''" 
      show-cancel-button>
      <van-field  v-model="content" autofocus  />
    </van-dialog>
    <!--修改个性签名的弹出框-->
     <van-dialog 
     v-model="textShow" 
     title="个签"
     @confirm="textareaClick" 
     show-cancel-button>
      <van-field  v-model="content" autofocus type="textarea"/>
    </van-dialog>
    <!--选择性别动作面板-->
    <van-action-sheet v-model="genderShow" :actions="actions" @select="onSelect" cancel-text="取消" />
    
 </div>
</template>

<script>
import NavBar from '../components/common/Navbar.vue'
import editBanner from '../components/common/editBanner.vue'
 export default {
  name: '',
  data () {
   return {
     model:{},
     show: false,
     textShow: false,
     genderShow: false,
     content: '',
     actions: [{ name: '男' ,val: 0 }, { name: '女',val: 1 }],
   }
  },
  components: {
    NavBar,
    editBanner
  },
  methods:{
    //进入组件调取数据渲染页面
    async selectUser(){
      const res =  await this.$http.get('/user/' + localStorage.getItem('id'))       
      this.model = res.data[0]  
    },
    async afterRead(file){
      //文件上传用formData
      const formdata = new FormData()
      //append()参数是键值对，file键名由后端规定
      formdata.append('file',file.file)
      const res = await this.$http.post('/upload',formdata)
      this.model.user_img=res.data.url
      this.UserUpdata()
    },
    async UserUpdata(){
      const res = await this.$http.post('/update/'+localStorage.getItem('id'),this.model)
      if(res.data.code == 200){
        this.$msg.success('修改成功')
      }
    },
    logout(){
      localStorage.clear();
      this.$router.push('/home')
    },
    confirmClick(){
      this.model.name = this.content
      this.UserUpdata();
      this.content = " "
    },
    textareaClick(){
      this.model.user_desc = this.content
      this.UserUpdata()
      this.content = " "
    },
    onSelect(data){
      this.model.gender = data.val
      this.UserUpdata()
      this.genderShow = false
    }
  },
  created(){
    this.selectUser();
  }
 }
</script>

<style lang="less">
  .editViews a{
    color: #333;
  }
  .editViews img{
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
  .uploadfile{
    position: relative;
    overflow: hidden;
    .uploadimg{
      opacity: 0;
      position: absolute;
    }
  }
  .bottom{
    background-color: white;
    margin-top: 15px;  
    font-size: 13px;    
    .editback{
      display:flex;
      justify-content:center;
      align-items:center;
      padding: 15px 0;
      border-bottom:1px solid #eee;
    }
    .logout{
      display:flex;
      justify-content:center;
      align-items:center;
      padding: 15px 0;      
    }
  }
 
</style>


