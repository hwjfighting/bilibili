<template>
  <div id="app">
   <keep-alive>
    <router-view v-if="$route.meta.keepalive"/>
   </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<style lang="less">
  body{
    margin: 0;
    padding: 0;
    box-sizing:boder-box;
    background-color:#f4f4f4;

  }
</style>
