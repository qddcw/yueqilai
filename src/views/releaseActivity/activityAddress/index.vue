<template>
  <div class="activityAddress">
    <van-form ref="form1">
      <van-field name="addressRadio" label="形式">
        <template #input>
          <van-radio-group v-model="addressRadio" direction="horizontal">
            <van-radio name="2">线下活动</van-radio>
            <van-radio name="1">线上活动</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        required
        v-if="addressRadio == '2'"
        readonly
        clickable
        name="picker"
        :value="cityAddress"
        label="地区选择"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择地区' }]"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        required
        v-if="addressRadio == '2'"
        v-model="detailAddress"
        name="详细地址"
        label="详细地址"
        maxlength="150"
        :rules="[{ required: true, message: '请填写详细地址' }]"
      />
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
      addressRadio: "2",
      cityAddress: "",
      detailAddress: "",
      showPicker: false,
      columns: [],
    };
  },
  async created() {
    this.addressRadio = this.$route.params.addressRadio || "2";
    this.cityAddress = this.$route.params.cityAddress || "";
    this.detailAddress = this.$route.params.detailAddress || "";
    let data = await this.$axios.get("/yue/activity/info/submit/ajax/init");
    let columns = data.data.data.cityList;
    this.columns = columns.map((item) => {
      return item.name;
    });

    if (this.$route.params.addressRadio == "1") {
      this.cityAddress = "";
      this.detailAddress = "";
    }
  },
  methods: {
    save() {
      this.$refs.form1
        .validate()
        .then((success) => {
          this.$router.push({
            name: "releaseActivity",
            params: {
              addressRadio: this.addressRadio,
              cityAddress: this.cityAddress,
              detailAddress: this.detailAddress,
            },
          });
        })
        .catch((err) => {
          if (err.length > 0) {
            return;
          }
        });
    },
    onConfirm(values) {
      this.cityAddress = values;
      this.showPicker = false;
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
