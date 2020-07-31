<template>
  <div class="activityDetails">
    <div class="title">活动亮点</div>
    <van-field
      v-model="activityLight"
      rows="5"
      autosize
      type="textarea"
      maxlength="150"
      placeholder="请填写几句话活动亮点，便于分享和推荐活动，不超过150个字"
      show-word-limit
    />
    <div class="title">活动内容</div>
    <van-field
      v-model="activityContent"
      rows="10"
      autosize
      type="textarea"
      placeholder="填写活动详细介绍，不得出现微信等联系方式"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" @click="save">
        保存
      </van-button>
    </div>
  </div>
</template>

<script>
const wxReg = new RegExp("^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$"); //微信号正则校验
const phReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; //手机号正则校验
export default {
  data() {
    return {
      activityLight: "",
      activityContent: "",
    };
  },
  created() {
    this.activityLight = this.$route.params.activityLight || "";
    this.activityContent = this.$route.params.activityContent || "";
  },
  methods: {
    save() {
      if (this.activityLight == "") {
        this.$toast.fail("请输入活动亮点！");
        return;
      }
      if (this.activityContent == "") {
        this.$toast.fail("请输入活动内容！");
        return;
      }
      if (
        !wxReg.test(this.activityContent) &&
        !phReg.test(this.activityContent)
      ) {
        this.$router.push({
          name: "releaseActivity",
          params: {
            activityLight: this.activityLight,
            activityContent: this.activityContent,
          },
        });
      } else {
        this.$toast.fail("活动内容不可出现手机号或微信号等联系方式！");
        return;
      }
    },
  },
};
</script>

<style lang="scss">
.activityDetails {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 17px;
  }
}
</style>
