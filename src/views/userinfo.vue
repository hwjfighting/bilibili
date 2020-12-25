<template>
 <div class="userinfo">
  <nav-bar></nav-bar>
  <img src="~assets/banner.png" alt="" class="backImg">
  <div>
    <user-detail :userInfo="model"></user-detail>
  </div>
 </div>
</template>

<script>
 import NavBar from '../components/common/Navbar.vue'
 import userDetail from '../components/userComponent/userDetail.vue'
 export default {
  
  data () {
   return {
    model:{}
   }
  },
  components: {
    NavBar,
    userDetail
  },
  methods:{
    async userData() {
        const res =  await this.$http.get('/user/' + localStorage.getItem('id'))
       
        this.model = res.data[0]    
    }
  },
  created() {
        this.userData()
  }
 }
</script>

<style lang="less">
.userinfo{
  .backImg{
    height: 90px;
    width: 100%;
  }
}


 
</style>
