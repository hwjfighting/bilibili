<template>
 <div class="btnparent" @click="TextClick">
    <div class="loginbtn">
      {{btntext}}
    </div>
 </div>
</template>

<script>
 export default {
   props:['btntext'],
  name: '',
  data () {
   return {

   }
  },
  methods:{
    TextClick(){
      this.$emit('TextClick')
    }
  },
  components: {

  }
 }
</script>

<style>
.btnparent{
  padding: 4.167vw 2.778vw;
}
  .loginbtn{
    height: 12.5vw;
    background-color: #ff9db5;
    color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
    border-radius: 6.25vw;
  }
 
</style>
