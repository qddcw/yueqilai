<template>
  <div class="activityNumbers">
    <van-form>
      <van-field required name="stepper" label="最少人数">
        <template #input>
          <van-stepper v-model="minNumber" max="500" />
        </template>
      </van-field>
      <van-field required name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="maxNumber" max="500" />
        </template>
      </van-field>
    </van-form>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" @click="save">
        保存
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minNumber: "",
      maxNumber: "",
    };
  },
  created() {
    this.minNumber = this.$route.params.minNumber || "";
    this.maxNumber = this.$route.params.maxNumber || "";
  },
  methods: {
    save() {
      if (this.minNumber > this.maxNumber) {
        this.$toast.fail("最少人数应小于等于最大人数！");
        return;
      }
      this.$router.push({
        name: "releaseActivity",
        params: {
          minNumber: this.minNumber,
          maxNumber: this.maxNumber,
        },
      });
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
