<template>
  <div>
    <van-list
      v-model="loading"
      :finished="!hasMore"
      finished-text="没有更多了"
      @load="onLoad"
      offset="1"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <van-card :thumb="item.cover">
          <template #tags>
            <div style="margin-top: -1vh;">{{ index + item.bookName }}</div>
            <div>作者:{{ item.authorName }}</div>
            <div style="color:red">{{ item.lastUpdateTime }}更新</div>
            <div>{{ item.subscribeNum }}人订阅</div>
          </template>
        </van-card>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageId: 1,
      hasMore: true,
    };
  },
  props: {},
  created() {
    this.pageId = 1;
  },
  methods: {
    async onLoad() {
      this.loadData();
    },
    async loadData() {
      let params = { pageId: this.pageId, sort: 1 };
      let data = await this.$axios.post(
        "/tuitui/book/list/load",
        this.$qs.stringify(params)
      );
      setTimeout(() => {
        let novelShowDO = data.data.data.novelShowDO;
        novelShowDO.novelDOList.forEach((item) => {
          this.list.push(item.novel);
        });
        this.pageId++;
        this.loading = false;
        this.hasMore = novelShowDO.hasMore;
      }, 2000);
    },
  },
  computed: {},
};
</script>
<style lang="scss"></style>
