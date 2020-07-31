<template>
  <div class="activityTime">
    <van-form>
      <van-field
        required
        readonly
        clickable
        name="datetimePicker"
        :value="startTime"
        label="开始时间"
        placeholder="点击选择时间"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-datetime-picker
          type="datetime"
          v-model="currentDate1"
          @confirm="onConfirm"
          @cancel="showPicker1 = false"
        />
      </van-popup>
      <van-field
        required
        readonly
        clickable
        name="datetimePicker"
        :value="endTime"
        label="结束时间"
        placeholder="点击选择时间"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-datetime-picker
          type="datetime"
          v-model="currentDate2"
          @confirm="onConfirm2"
          @cancel="showPicker2 = false"
        />
      </van-popup>
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
      startTime: "",
      showPicker1: false,
      endTime: "",
      showPicker2: false,
      currentDate1: new Date(),
      currentDate2: new Date(),
    };
  },
  created() {
    this.startTime = this.$route.params.startTime || "";
    this.endTime = this.$route.params.endTime || "";
  },
  methods: {
    save() {
      if (new Date() - new Date(this.startTime) > 0) {
        this.$toast.fail("活动开始时间不能小于当前时间");
        return;
      }
      if (new Date(this.startTime) - new Date() < 2 * 24 * 60 * 60 * 1000) {
        this.$toast.fail("开始时间需要大于发布时间2天");
        return;
      }
      if (new Date(this.endTime) - new Date(this.startTime) <= 0) {
        this.$toast.fail("活动开始时间不能小于截止时间");
        return;
      }
      this.$router.push({
        name: "releaseActivity",
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
        },
      });
    },
    onConfirm(time) {
      this.startTime = this.$dayjs(new Date(time)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.showPicker1 = false;
    },
    onConfirm2(time) {
      this.endTime = this.$dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss");
      this.showPicker2 = false;
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
