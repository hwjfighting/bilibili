<template>
 <div>
    <login-top middleTop="登录bilibili" >
       <div slot="right" style="font-size: 3.611vw" @click="$router.push('./register')">切换到注册页面</div>
    </login-top>
   
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
    <!--向子组件传递的是字符串可以不用加引号-->
    <login-btn btntext="登录" @TextClick="AjaxInsert"/>
    
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
     if( rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post('./login',this.model);
        console.log(res);      
        this.$msg.success(res.data.msg)
        if(res.data.code == 301 || res.data.code == 302){
          return
        }
        localStorage.setItem('id',res.data.id);
        localStorage.setItem('token',res.data.token)
        
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
