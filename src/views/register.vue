<template>
 <div>
    <login-top middleTop="注册bilibili" >
      <div slot="right" style="font-size: 3.611vw" @click="$router.push('./login')">切换到登录页面</div>
    </login-top>
   <login-text label="姓名"
   style="margin: 4.167vw  0"
    placeholder="请输入姓名"
    rule="^.{6,16}$"
    @inputChange="res => model.name = res"
    />
    <login-text label="账号"
    placeholder="请输入账号"
    rule="^.{6,16}$"
     @inputChange="res => model.username = res"
    />
    <login-text label="密码" 
    type="password"
    placeholder="请输入密码"
    rule="^.{6,16}$"
     @inputChange="res => model.password = res"
    />
    <login-btn btntext="注册" @TextClick="AjaxInsert"/>
    
 </div>
</template>

<script>
 import LoginTop from '../components/common/LoginTop.vue'
 import LoginText from '../components/common/LoginText.vue'
 import LoginBtn from '../components/common/LoginBtn.vue'
 export default {
  name: '',
  data () {
   return {
     model:{
       name:'',
     username:'',
     password:''
     }
   }
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods:{
    async AjaxInsert(){
      let rulg = /^.{6,16}$/
      
     if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)) {
         const res = await this.$http.post('./register',this.model);
         console.log(res);
        this.$msg.success(res.data.msg)
         if(res.data.code !== 200){
          return
        }
        //在本地浏览器存储id和token-
        localStorage.setItem('id',res.data.id);
        localStorage.setItem('token',res.data.objtoken)
        
         setTimeout(()=>{
          this.$router.push('/userinfo')
        })
      }else{
        this.$msg.fail('格式不正确，请重现输入')
        
      }
    }
  }
 }
</script>

<style scoped>

 
</style>
