<template>
  <div class="details">
    <div class="background">
      <div class="nav-left" @click="goBackDo">
        <i class="iconfont icon-left-arrow"></i>
      </div>
      <van-image
        height="142"
        fit="fill"
        :src="require(`../../assets/images/${type}.png`)"
      />
    </div>
    <div class="topcontent">
      <div class="image">
        <van-tag type="warning" size="large" :color="color">{{
          this.type
        }}</van-tag>
        <van-image
          height="195"
          fit="fill"
          :src="require('../../assets/images/taeyeon2.jpg')"
          @click="show = true"
        />
        <van-image-preview
          v-model="show"
          :images="[require('../../assets/images/taeyeon2.jpg')]"
          @change="onChange"
        >
          <template v-slot:index>第{{ index + 1 }}页</template>
        </van-image-preview>
      </div>
      <div class="description">
        <div class="title">
          正念书会 | 批判性思维工具 第十期以书 为媒以书为媒
        </div>
        <van-row class="numbers">
          <van-col span="2">收藏</van-col>
          <van-col span="3">99次</van-col>
          <van-col span="3">已参加</van-col>
          <van-col span="3">10人</van-col>
        </van-row>
        <div class="contentDetails">
          <div>
            <img src="../../assets/icon/时间.jpg" alt="" />
            <span>08/07 19：00-21：00</span>
          </div>
          <div>
            <img src="../../assets/icon/地点 (1).jpg" alt="" />
            <span>南京市江宁区秦淮绿洲东苑71栋三单元1楼</span>
          </div>
          <div>
            <img src="../../assets/icon/人数.jpg" alt="" />
            <span>不超过50人</span>
          </div>
          <div>
            <img src="../../assets/icon/主办方.jpg" alt="" />
            <span>正念书会</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomcontent">
      <div class="title">活动亮点</div>
      <p class="content">
        活动详情活动详情活动详情活动详情活动详情活动详情活
        活动详情活动详情活动详情活动详情活动详情活动详情活
        活动详情活动详情活动详情活动详情活动详活
      </p>
      <div class="title">活动详情</div>
      <p class="content">
        活动详情活动详情活动详情活动详情活动详情活动详情活
        活动详情活动详情活动详情活动详情活动详情活动详情活
        活动详情活动详情活动详情活动详情活动详活
      </p>
      <van-image
        fit="fill"
        :src="require(`../../assets/images/taeyeon2.jpg`)"
      />
    </div>
    <div class="footer">
      <img src="../../assets/icon/收 藏 2.jpg" alt="" />
      <div>收藏</div>
      <van-button round block type="warning" @click="onSubmit">
        立即报名
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      index: 0,
      type: "",
      color: "",
    };
  },
  created() {
    this.type = this.$route.params.type || "学习分享";
    switch (this.type) {
      case "学习分享":
        this.color = "#787878";
        break;
    }
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    goBackDo() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onSubmit(){

    }
  },
};
</script>

<style lang="scss">
.details {
  .background {
    width: 100%;
    position: relative;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: #ffffff;
    .nav-left {
      position: absolute;
      bottom: 0;
      font-size: 14px;
      cursor: pointer;
      left: 16px;
    }
  }
  .topcontent {
    padding: 0 14px;
    padding-bottom: 24px;
    background: #fff;
    .image {
      width: 100%;
      height: 195px;
      position: relative;
      .van-tag {
        position: absolute;
        z-index: 10;
      }
      margin-top: 9px;
      margin-bottom: 20px;
    }
    .description {
      .title {
        width: 315px;
        height: 50px;
        font-size: 18px;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Medium;
        font-weight: 500;
        text-align: left;
        color: #2b2b2b;
        line-height: 25px;
      }
      .numbers {
        margin: 10px 0 20px 0;
        height: 17px;
        font-size: 12px;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Regular;
        font-weight: 400;
        text-align: left;
        color: #ababab;
        line-height: 17px;
      }
      .contentDetails {
        div {
          margin-bottom: 14px;
          span {
            display: inline-block;
            vertical-align: top;
            height: 18px;
            margin-left: 9px;
            font-size: 13px;
            font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Regular;
            font-weight: 400;
            text-align: left;
            color: #666666;
            line-height: 18px;
          }
        }
      }
    }
  }
  .bottomcontent {
    height: 300px;
    padding:  14px;
    background: #fff;
    margin-top: 6px;
    .title {
      border-bottom:8px solid #ffd193;
      box-sizing: border-box;
      margin-bottom: 13px;
      width: 60px;
      height: 21px;
      font-size: 15px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Regular;
      font-weight: 400;
      text-align: left;
      color: #646464;
      line-height: 21px;
    }
    .content {
      margin-bottom: 14px;
      width: 345px;
      height: 60px;
      font-size: 14px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Regular;
      font-weight: 400;
      text-align: left;
      color: #616161;
      line-height: 20px;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 52px;
    background: #ffffff;
    box-shadow: 0px 5px 15px 0px rgba(139, 139, 139, 0.5);
    img {
      width: 17px;
      height: 17px;
      position: absolute;
      top: 7px;
      left: 33px;
    }
    div {
      position: absolute;
      bottom: 7px;
      left: 29px;
      width: 24px;
      height: 17px;
      font-size: 12px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Regular;
      font-weight: 400;
      text-align: left;
      color: #bfbfbf;
      line-height: 17px;
    }
    .van-button {
      position: absolute;
      top: 7px;
      right: 23px;
      bottom: 7px;
      width: 279px;
      height: 38px;
      background: linear-gradient(
        270deg,
        #ffa835 0%,
        #ffc47b 100%,
        #ffac5b 100%
      );
      .van-button__content {
        width: 232px;
        height: 21px;
        font-size: 15px;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Medium;
        font-weight: 500;
        text-align: left;
        color: #ffffff;
        line-height: 21px;
      }
    }
  }
}
</style>
