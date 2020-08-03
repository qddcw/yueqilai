<template>
  <div class="releaseActivity">
    <div class="title">活动信息</div>
    <van-form ref="form1" label-width="90px">
      <van-field
        required
        readonly
        clickable
        name="活动类型"
        :value="activityInfo.activityType"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择活动类型' }]"
      >
        <template #label>
          <div class="iconBackground">
            <img src="../../assets/icon/详情.png" alt="" />
          </div>
          活动类型
        </template>
      </van-field>
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
        v-model="activityInfo.activityTitle"
        maxlength="20"
        name="活动标题"
        :rules="[{ required: true, message: '请填写活动标题' }]"
        ><template #label>
          <div class="iconBackground">
            <img src="../../assets/icon/标题.png" alt="" />
          </div>
          活动标题
        </template>
      </van-field>
      <van-field name="活动详情">
        <template #label>
          <div class="iconBackground">
            <img src="../../assets/icon/详情 (1).png" alt="" />
          </div>
          活动详情
        </template>
        <template #input>
          <div
            style="width:100%;text-align:right"
            @click="gotoDetailsConfig('activityDetails')"
          >
            <span>{{ activityInfo.activityDetailsStatus }}</span
            ><van-icon style="line-height:19px;" name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field name="uploader">
        <template #label>
          <div class="iconBackground">
            <img src="../../assets/icon/上 传 (1).png" alt="" />
          </div>
          添加图片(最多四张)
        </template>
        <template #input>
          <van-uploader v-model="activityInfo.uploader" :max-count="4" />
        </template>
      </van-field>
    </van-form>
    <div class="title">活动设置</div>
    <van-form ref="form2" label-width="90px">
      <van-field name="活动人数" label="活动人数">
        <template #label>
          <div class="iconBackground">
            <img src="../../assets/icon/人数 (1).png" alt="" />
          </div>
          活动人数
        </template>
        <template #input>
          <div
            style="width:100%;text-align:right"
            @click="gotoDetailsConfig('activityNumbers')"
          >
            <span>{{ activityInfo.activityNumberStatus }}</span
            ><van-icon style="line-height:19px;" name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field name="活动时间">
        <template #label>
          <div class="iconBackground">
            <img src="../../assets/icon/时间.png" alt="" />
          </div>
          活动时间
        </template>
        <template #input>
          <div
            style="width:100%;text-align:right"
            @click="gotoDetailsConfig('activityTime')"
          >
            <span>{{ activityInfo.activityTimeStatus }}</span
            ><van-icon style="line-height:19px;" name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field name="活动地址">
        <template #label>
          <div class="iconBackground">
            <img src="../../assets/icon/地址 (1).png" alt="" />
          </div>
          活动地址
        </template>
        <template #input>
          <div
            style="width:100%;text-align:right"
            @click="gotoDetailsConfig('activityAddress')"
          >
            <span>{{ activityInfo.activityAdressStatus }}</span
            ><van-icon style="line-height:19px;" name="arrow" />
          </div>
        </template>
      </van-field>
    </van-form>
    <div style="margin: 16px;text-align:center;">
      <van-button
        round
        block
        type="warning"
        native-type="submit"
        @click="onSubmit"
      >
        确认发布
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityInfo: {
        activityType: "",
        activityTitle: "",
        activityDetailsStatus: "待完善",
        activityLight: "",
        activityContent: "",
        activityNumberStatus: "待完善",
        minNumber: "",
        maxNumber: "",
        activityTimeStatus: "待完善",
        startTime: "",
        endTime: "",
        activityAdressStatus: "待完善",
        addressRadio: "",
        cityAddress: "",
        detailAddress: "",
        uploader: [],
      },
      catagoryList: [],
      cityList: [],
      show: false,
      columns: [],
      showPicker: false,
    };
  },
  async created() {
    let data = await this.$axios.get("/yue/activity/info/submit/ajax/init");
    this.catagoryList = data.data.data.catagoryList;
    this.cityList = data.data.data.cityList;
    let columns = data.data.data.catagoryList;
    this.columns = columns.map((item) => {
      return item.name;
    });
  },
  activated() {
    Object.assign(this.activityInfo, this.$route.params);
    if (this.activityInfo.activityLight != "") {
      this.activityInfo.activityDetailsStatus = "已完善";
    }
    if (this.activityInfo.minNumber != "") {
      this.activityInfo.activityNumberStatus = "已完善";
    }
    if (this.activityInfo.startTime != "") {
      this.activityInfo.activityTimeStatus = "已完善";
    }
    if (this.activityInfo.addressRadio != "") {
      this.activityInfo.activityAdressStatus = "已完善";
    }
  },
  methods: {
    gotoDetailsConfig(name) {
      let params = {};
      if (name == "activityDetails") {
        params = {
          activityLight: this.activityInfo.activityLight,
          activityContent: this.activityInfo.activityContent,
        };
      } else if (name == "activityNumbers") {
        params = {
          minNumber: this.activityInfo.minNumber,
          maxNumber: this.activityInfo.maxNumber,
        };
      } else if (name == "activityTime") {
        params = {
          startTime: this.activityInfo.startTime,
          endTime: this.activityInfo.endTime,
        };
      } else if (name == "activityAddress") {
        params = {
          addressRadio: this.activityInfo.addressRadio,
          cityAddress: this.activityInfo.cityAddress,
          detailAddress: this.activityInfo.detailAddress,
        };
      }
      this.$router.push({
        name: name,
        params: params,
      });
    },
    onConfirm(value) {
      this.activityInfo.activityType = value;
      this.showPicker = false;
    },
    onSubmit() {
      this.$refs.form1
        .validate()
        .then((success) => {
          this.$refs.form2
            .validate()
            .then(async (success) => {
              if (
                this.activityInfo.activityDetailsStatus == "待完善" ||
                this.activityInfo.activityNumberStatus == "待完善" ||
                this.activityInfo.activityTimeStatus == "待完善" ||
                this.activityInfo.activityAdressStatus == "待完善"
              ) {
                this.$toast.fail("请填写待完善的信息！");
                return;
              }

              let catagoryId = this.catagoryList.filter((item) => {
                return item.name == this.activityInfo.activityType;
              })[0].id;
              let cityId = 0;
              if (this.activityInfo.addressRadio == "2") {
                cityId = this.cityList.filter((item) => {
                  return item.name == this.activityInfo.cityAddress;
                })[0].id;
              }
              let images = this.activityInfo.uploader.map((item) => {
                return item.content;
              });
              let params = {
                title: this.activityInfo.activityTitle,
                publishUserId: 1,
                catagoryId: catagoryId,
                content:
                  this.activityInfo.activityLight +
                  "^" +
                  this.activityInfo.activityContent,
                cityId: cityId,
                addressMode: this.activityInfo.addressRadio,
                address:
                  this.activityInfo.addressRadio == "1"
                    ? ""
                    : this.activityInfo.detailAddress,
                beginTime: new Date(this.activityInfo.startTime),
                endTime: new Date(this.activityInfo.endTime),
                leastJoinNum: this.activityInfo.minNumber,
                mostJoinNum: this.activityInfo.maxNumber,
                remark: "1",
                images: images.join(",,"),
              };
              console.log(params);
              this.$toast.fail("参数在console里");

              let data = await this.$axios.post(
                "/yue/activity/info/submit/ajax/submit",
                this.$qs.stringify(params)
              );
            })
            .catch((err) => {
              if (err.length > 0) {
                return;
              }
            });
        })
        .catch((err) => {
          if (err.length > 0) {
            return;
          }
        });
    },
  },
};
</script>

<style lang="scss">
.releaseActivity {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 17px;
  }
  .iconBackground {
    // background: url("../../assets/icon/圆角矩形 2 拷贝 9.png");
    background: #ffb04f;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
    margin-right: 5px;
    img {
      width: 14px;
      height: 16px;
      vertical-align: middle;
    }
  }
}
</style>
