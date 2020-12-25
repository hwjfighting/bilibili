<template>
 <div>
  <nav-bar></nav-bar>
  <van-divider :style="{ color: '#1a73e8', borderColor: '#1a73e8', padding: '0 16px' }">现有栏目</van-divider>
  <div class="new-category newcategory">
    <p v-for="(item,index) in newCat" :key="index" @click="handleCategoryClick(index)">{{item.title}}</p> 
  </div>
  <van-divider :style="{ color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px' }">已删除栏目</van-divider>
   <div class="new-category delcategory">
    <p v-for="(item,index) in delCat" :key="index" @click="delCategoryClick(index)">{{item.title}}</p>
  </div>
 </div>
</template>

<script>
import NavBar from '../components/common/Navbar.vue'
 export default {
  name: '',
  data () {
   return {
     newCat: [],
     delCat: []
   }
  },
  components: {
    NavBar
  },
  methods:{
    async SelectCategory() {
      const res = await this.$http.get('/category')
      this.newCat = res.data
    },
    handleCategoryClick(index){
      if(this.newCat.length < 4) {   
        this.$msg.fail('最少保留三个栏目')
        return
      }
      this.delCat.push(this.newCat[index])
      //删除下标从index开始的1个元素
      this.newCat.splice(index,1)
    },
    delCategoryClick(index){
      this.newCat.push(this.delCat[index])
      this.delCat.splice(index,1)
    }
  },
  watch:{
    newCat(){
      localStorage.setItem('newCat',JSON.stringify(this.newCat))
      localStorage.setItem('delCat',JSON.stringify(this.delCat))
    }
  },
  created(){
    if(localStorage.getItem('newCat')&&localStorage.getItem('delCat')){
      this.newCat = JSON.parse(localStorage.getItem('newCat'))
      this.delCat = JSON.parse(localStorage.getItem('delCat'))
      return
    }
    this.SelectCategory()
  }
 }
</script>

<style lang="less">
  .new-category{
    padding: 0 2.778vw;
    display: flex;
    flex-wrap: wrap;
   p{   
        width: 20%;
        text-align: center;
        margin: 1.389vw 1.944vw;
        padding: 1.944vw 0vw;
   }
  }
  .newcategory{
   p{
      border: 1px solid #1a73e8;
      color: #1a73e8;
   }
  }
  .delcategory{
    p{
      border: 1px solid #ee0a24;
      color: #ee0a24;
    }
  }
 
</style>
