<template>
  <div class="allbook">
    <!-- tabs -->
    <van-tabs type="card" animated v-model="activeName" @click="onClickTabs" sticky offset-top="48px">
      <van-tab
        v-for="(item, index) in tabs"
        :title="item.title"
        :key="index"
        :name="item.title"
        :badge="item.badge"
      >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- list组件 -->
          <book-List
            ref="bookList"
            :bookList="bookList"
            :hasMore="hasMore"
            :activeName="activeName"
            @loadMore="loadMore"
          >
          </book-List>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import bookList from "./indexBookList/bookList";
import Vue from "vue";
import { Tab, Tabs, Tag, Toast, PullRefresh } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(Toast);
Vue.use(PullRefresh);

export default {
  name: "index",
  components: {
    bookList,
  },
  data() {
    return {
      //list-Model
      bookList: [],
      bookList_new: [],
      bookList_hot: [],
      pageId_new: 0,
      pageId_hot: 0,
      //tabs-Model
      tabs: [{ title: "最新",badge:12 }, { title: "最热",badge:23 }],
      activeName: "",
      hasMore: true,
      hasMore_new: true,
      hasMore_hot: true,
      isLoading: false,
    };
  },
  created() {
    //axios params:{activeName,page:1} => 最新 第一页数据及总条数
    //传组件
    // this.bookList = this.bookList_new;
    // this.totol = 15;
    // this.$axios.post("/tuitui/book/list/load",{pageId:1,sort:1});
    this.loadNewBookList();
  },
  methods: {
    //绑定tabs-click事件 模拟接口调用返回的data:{bookList:Array,totol:Number}
    onClickTabs(name, title) {
      switch (title) {
        case "最新":
          if (this.pageId_new == 0) {
            this.loadNewBookList();
          }
          this.bookList = this.bookList_new;
          this.hasMore = this.hasMore_new;

          break;
        case "最热":
          if (this.pageId_hot == 0) {
            this.loadHotBookList();
          }
          this.bookList = this.bookList_hot;
          this.hasMore = this.hasMore_hot;

          break;
      }
    },
    onRefresh() {
      let sort = this.activeName == "最新" ? 1 : 2;
      this.initModel(sort);
      Toast("刷新成功");
      this.isLoading = false;
    },
    initModel(flag) {
      this.bookList = [];
      if (flag == 1) {
        this.bookList_new = [];
        this.pageId_new = 0;
        this.loadNewBookList();
      } else {
        this.bookList_hot = [];
        this.pageId_hot = 0;
        this.loadHotBookList();
      }
    },
    loadMore(data) {
      data.sort == 1 ? this.loadNewBookList() : this.loadHotBookList();
    },
    async loadNewBookList() {
      this.activeName = "最新";
      this.pageId_new++;
      let params = { pageId: this.pageId_new, sort: 1 };
      let data = await this.$axios.post(
        "/tuitui/book/list/load",
        this.$qs.stringify(params)
      );
      let novelShowDO = data.data.data.novelShowDO;
      this.hasMore_new = novelShowDO.hasMore;
      this.bookList_new = this.bookList_new.concat(novelShowDO.novelDOList);
      this.hasMore = this.hasMore_new;
      this.bookList = this.bookList_new;
    },
    async loadHotBookList() {
      this.activeName = "最热";
      this.pageId_hot++;
      let params = { pageId: this.pageId_hot, sort: 2 };
      let data = await this.$axios.post(
        "/tuitui/book/list/load",
        this.$qs.stringify(params)
      );
      let novelShowDO = data.data.data.novelShowDO;
      this.hasMore_hot = novelShowDO.hasMore;
      this.bookList_hot = this.bookList_hot.concat(novelShowDO.novelDOList);
      this.hasMore = this.hasMore_hot;
      this.bookList = this.bookList_hot;
    },
  },
};
</script>

<style lang="scss">
.allbook {
  position: relative;
  .van-tag {
    position: absolute;
    top: -10px;
    z-index: 1000;
  }
  .van-tabs__wrap {
    width: 35vw;
    min-width: 150px;
  }
}
</style>
