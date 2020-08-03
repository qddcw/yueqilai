<template>
  <div class="layout">
    <HeadTop :head-title="$route.meta.title" go-back="true"></HeadTop>
    <div class="content">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import HeadTop from "@/components/header/Head";
import Footer from "@/components/footer/index";

export default {
  components: {
    HeadTop,
    Footer,
  },
  created(){
    
    
  },
  computed:{
   
  }
};
</script>

<style lang="scss">
.layout {
  .content{
    height:calc(100vh - 98px);
    overflow: scroll;
    background: #f7f7f7;
  }
}
</style>
