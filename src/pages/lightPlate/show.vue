<template>
  <q-page class="fit">
    <div class="fit lightPlateShow" ref="page">
      <div
        class="show-box texta-front"
        :class="{ slider: needSlide }"
        ref="showBox"
        :style="{...textaFrontStyle}"
      >
        {{ formValue.content }}
      </div>
      <q-page-sticky
        v-if="!showSetting"
        ref="fabRef"
        class="z-top"
        position="bottom-right"
        :offset="fabPos"
      >
        <q-btn
          round
          color="primary"
          v-touch-pan.prevent.mouse="moveFab"
          @click="toShowModal"
        >
          <q-icon class="iconfont icon-setting" />
        </q-btn>
      </q-page-sticky>
    </div>
    <q-dialog v-model="showSetting" maximized>
      <Setting :data="formValue" @on-close="toCloseModal" />
    </q-dialog>
  </q-page>
</template>

<script>
import { dom } from "quasar";
import Setting from "./setting.vue";

export default {
  name: "lightPlateShow",
  components: { Setting },
  data() {
    return {
      /** 表单数据 */
      formValue: {
        content: "请先进行设置",
        // lightType: "",
        color: "#0fa",
        size: 72,
        speed: null,
      },
      /** fab位置 */
      fabPos: [30, 30],
      draggingFab: false,
      /** 是否展示设置 */
      showSetting: false,
      /** top的距离 */
      showBoxTop: "0px",
      /** 是否需要滚动 */
      needSlide: false,
    };
  },
  computed: {
    textaFrontStyle() {
      return {
        top: `${this.showBoxTop}`,
        left: `calc(50% + ${this.formValue.size / 2}px)`,
        height: `${this.formValue.size}px`,
        "line-height": `${this.formValue.size}px`,
        "text-shadow": `0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff,
         0 0 40px ${this.formValue.color}, 0 0 80px ${this.formValue.color},
         0 0 90px ${this.formValue.color}, 0 0 100px ${this.formValue.color},
         0 0 150px ${this.formValue.color}`,
        "font-size": `${this.formValue.size}px`,
        "animation-duration": `${this.formValue.speed || 5}s`,
      };
    },
  },
  methods: {
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true;
      // x y 为fab距原点的x/y方向的距离
      let x = this.fabPos[0] - ev.delta.x;
      let y = this.fabPos[1] - ev.delta.y;
      if (ev.isFinal) {
        // top/left 为fab在页面上距 上/左边的距离
        const { top, left } = dom.offset(this.$refs.fabRef.$el);
        // console.log(top, left)
        // console.log('this.fabPos :>> ', this.fabPos)

        // 根据情况改变 展开项的展开方向
        // if (y > top) {
        //   this.dir = 'down'
        // } else {
        //   this.dir = 'up'
        // }
        // if (x > left) {
        //   this.again = 'right'
        // } else {
        //   this.again = 'left'
        // }

        // 处理fab被拖入不可见区域
        if (top < 0) {
          y = top + y - 9;
        } else if (y < 0) {
          y = 9;
        }
        if (left < 0) {
          x = left + x - 9;
        } else if (x < 0) {
          x = 9;
        }
      }

      this.fabPos = [x, y];
    },
    toShowModal() {
      this.showSetting = true;
    },
    // 关闭弹框
    toCloseModal(data) {
      this.formValue = { ...data };

      this.$nextTick(() => {
        const page = this.$refs.page;
        const refShowBox = this.$refs.showBox;
        if (page.offsetHeight > refShowBox.offsetWidth) {
          this.showBoxTop = `${
            (page.offsetHeight - refShowBox.offsetWidth) / 2
          }px`;
          this.needSlide = false;
        } else {
          this.needSlide = page.offsetHeight < refShowBox.offsetWidth;
        }
        // if (data.lightType === 'slider') {
        //   this.needSlide = true;
        // }
        this.showSetting = false;
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.lightPlateShow {
  position: relative;
  margin: 0;
  // padding-left: 50%;
  background: #000000;
  font-family: Helvetica, sans-serif;
  overflow: hidden;
  .show-box {
    transform: rotateZ(90deg);
    transform-origin: 0% 0%;
  }
  .texta-front {
    display: inline-block;
    white-space: nowrap;
    font-family: YouYuan;
    font-size: 72px;
    font-weight: normal;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
  }
  .slider {
    animation: slider 5s linear 0s infinite normal;
  }
}

@keyframes flicker {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa,
      0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa;
  }
  20%,
  24%,
  55% {
    text-shadow: none;
  }
}
@keyframes slider {
  0% {
    transform: rotateZ(90deg) translateX(100%);
  }
  100% {
    transform: rotateZ(90deg) translateX(-100%);
  }
}
</style>
