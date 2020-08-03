<template>
  <div class="footer">
    <van-tabbar v-model="active"  :active-color="$mainColor">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  props: [],
  methods: {},
};
</script>

<style lang="scss">
.footer {
  height:50px;
}
</style>
