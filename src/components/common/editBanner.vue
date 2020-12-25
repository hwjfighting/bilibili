<template>
 <div>
    <div class="editbanner" @click="bannerClick">
      <span>{{left}}</span>
      <span>
        <slot name="right"></slot>
      </span>
    </div>
 </div>
</template>

<script>
 export default {
  props:['left'],
  methods:{
    bannerClick(){
      this.$emit('bannerClick')
    }
  }
 }
</script>

<style lang="less">
  .editbanner{
    background-color: white;
    padding: 4.167vw;
    border-bottom: 0.278vw solid #eee;
    font-size:4.444vw;
    display: flex;
    align-items: center;
    justify-content:  space-between;
  }

 
</style>

