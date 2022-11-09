<template>
  <q-card class="fit flex column chooseDisc">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">天帮选</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="flex-1 overflow-auto">
      <q-card-section class="flex center turntable-box">
        <div
          class="turntable"
          :class="{ turning: turned }"
          :style="{
            background: conicGradient,
            transform: `rotate(${turned ? turnDeg : 0}deg)`,
          }"
        ></div>
      </q-card-section>
      <q-card-section>
        <div class="type-box">
          <div v-for="item in sectorList" :key="item.color" class="type">
            <div class="dot q-mr-sm" :style="{ background: item.color }"></div>
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="关闭" color="primary" v-close-popup />
      <q-btn flat :label="turned ? '重置' : '开始'" color="primary" @click="handleSelect" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { colorValues as colors } from "src/data/base";
import { randomIndex } from "src/utils/base";

export default {
  name: "chooseDisc",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      /** 颜色 */
      colors,
      /** 是否已转动 */
      turned: false,
      /** 转动角度 */
      turnDeg: 0,
      /** 每份的角度 */
      deg: 0,
      /** 圆盘背景颜色渐变css */
      conicGradient: "",
      /** 结果 */
      resIndex: 0,
    };
  },
  computed: {
    sectorList() {
      if (!this.data) {
        return [];
      }
      const res = Object.keys(this.data).map((key, index) => {
        return {
          name: this.data[key],
          color: this.colors[index],
        };
      });
      return res;
    },
  },
  methods: {
    /** 初始化 */
    init() {
      // console.log("sectorList :>> ", this.sectorList);
      if (this.sectorList?.length < 1) {
        return;
      }
      // 计算角度
      this.deg = 360 / this.sectorList.length;
      const colorArr = this.sectorList.map((item) => item.color);
      // 处理圆盘背景颜色渐变css
      let conicGradient = "conic-gradient(";
      colorArr.forEach((item, index) => {
        conicGradient += `${item} ${this.deg * index}deg, `;
        conicGradient += `${item} ${this.deg * (1 + index)}deg, `;
      });
      conicGradient = conicGradient.substring(
        0,
        conicGradient.lastIndexOf(",")
      );
      conicGradient += ")";
      this.conicGradient = conicGradient;
    },
    // 进行选择
    handleSelect() {
      if (this.turned) {
        this.turned= false;
        return;
      }
      const num = randomIndex(360);
      this.turnDeg = num + 3600;
      this.turned = true;
      this.resIndex = this.sectorList.length - 1 - Math.floor(num / this.deg);
      // console.log("this.resIndex :>> ", this.resIndex);
      setTimeout(() => {
        this.$q.notify({
          position: 'top',
          message: `${this.sectorList[this.resIndex].name}，这是上天的旨意`,
          color: 'info',
        })
      }, 3000);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.turntable-box {
  position: relative;
  overflow: hidden;
  &::after {
    position: absolute;
    top: 10px;
    left: calc(50% - 5px);
    content: "";
    width: 0;
    height: 0;
    border-width: 100px 5px;
    border-style: solid;
    border-color: #fe6c6f transparent transparent transparent;
  }
  .turntable {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    &.turning {
      transition: transform 3s ease-in-out 0s;
      // transform: rotate(1080deg);
    }
  }
}
.type-box {
  display: flex;
  flex-wrap: wrap;
  .type {
    width: 50%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
    .text {
      font-size: 14px;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
