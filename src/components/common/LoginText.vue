<template>
 <div>
    <van-field  
    :label="label" 
    :type="type"
    :placeholder="placeholder"
    :rule="rule"
    v-model="content"
    />
 </div>
</template>

<script>
 export default {
    name: '',
    data () {
      return {
        content:''
    }
    },
    props:['label','type','placeholder','rule'],
    methods:{
      handlerulg(){
         const rue = new RegExp(this.rule);
         if(rue.test(this.content)){
            this.$emit('inputChange',this.content)
         }
      }
    },
    watch:{
       content(){
          this.handlerulg()
       }
    },
    components: {

    }
 }
</script>

<style scoped>

 
</style>
