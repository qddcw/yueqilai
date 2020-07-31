<template>
  <div class="bookList">
    <van-list
      v-model="loading"
      :finished="_finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="1"
    >
      <!-- card部分 -->
      <van-cell v-for="(item, index) in _bookList" :key="index"
        ><van-card :thumb="item.imageUrl">
          <template #tags>
            <div style="margin-top: -1vh;">{{ index + item.name }}</div>
            <div>作者:{{ item.author }}</div>
            <div style="color:red">{{ item.updateTime }}更新</div>
            <div>{{ item.number }}人订阅</div>
          </template>
        </van-card></van-cell
      >

      <!-- 查看更多 -->
      <!-- <div class="more">
        <van-button plain type="danger" round
          >查看更多<van-tag type="primary">3</van-tag></van-button
        >
      </div> -->
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import { Card, Button, Tag, List, Cell } from "vant";

Vue.use(Card);
Vue.use(Button);
Vue.use(Tag);
Vue.use(List);
Vue.use(Cell);

export default {
  name: "head-top",
  data() {
    return { loading: false };
  },
  props: {
    bookList: {
      type: Array,
    },
    hasMore: {
      type: Boolean,
    },
    activeName: {
      type: String,
    },
  },
  created() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        this.loading = false;
        this.$emit("loadMore", { sort: this.activeName == "最新" ? 1 : 2 });
      }, 2000);
    },
  },
  computed: {
    _bookList() {
      let bookList = [];
      bookList = this.bookList.map((item) => {
        return {
          imageUrl: item.novel.cover,
          name: item.novel.bookName,
          author: item.novel.authorName,
          updateTime: item.novel.lastUpdateTime,
          number: item.novel.subscribeNum,
        };
      });
      return bookList;
    },
    _finished() {
      return this.hasMore == true ? false : true;
    },
  },
};
</script>

<style lang="scss">
.bookList {
  .van-list {
  }
  .van-card {
    font-size: 14px;
    .van-card__thumb {
      width: 30vw;
      height: 22vh;
      min-height: 22vh;
    }
    .van-card__content {
      div {
        margin: 3vh 0 0 3vw;
      }
    }
  }
  .more {
    text-align: center;
    margin: 10px 0;
    .van-button {
      width: 40vw;
      position: relative;
      .van-tag {
        position: absolute;
        right: -6px;
      }
    }
  }
}
</style>
