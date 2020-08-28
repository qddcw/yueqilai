<template>
  <div class="layout">
    <HeadTop :head-title="$route.meta.title" go-back="true"></HeadTop>
    <div class="content" :style="{height:$route.meta.title?'calc(100vh - 48px)':'100vh'}">
      <router-view></router-view>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import HeadTop from "@/components/header/Head";
import Footer from "@/components/footer/index";

export default {
  components: {
    HeadTop,
    // Footer,
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
    overflow: scroll;
    background: #f7f7f7;
  }
}
</style>
