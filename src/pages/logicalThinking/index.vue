<template>
  <q-page class="column fit q-pa-sm">
    <div class="flex flex-1 blocks">
      <div
        v-for="item in blocks"
        :key="item.id"
        class="block"
        :class="`block_${item.waiteTime}`"
        @click="() => blockClick(item)"
      >
        <q-icon v-if="item.value === 'circle'" class="iconfont icon-circle" />
        <q-icon
          v-else-if="item.value === 'close'"
          class="iconfont icon-close"
        />
      </div>
    </div>
    <div class="chips flex">
      <q-chip v-show="nowHandler === 'circle'" class="chip" color="warning">
        <q-icon class="iconfont icon-circle" />
      </q-chip>
      <q-chip v-show="nowHandler === 'close'" class="chip" color="teal">
        <q-icon class="iconfont icon-close" />
      </q-chip>
    </div>
    <q-page-sticky
      ref="fabRef"
      class="z-top"
      position="bottom-right"
      :offset="fabPos"
    >
      <q-fab
        color="purple"
        icon="keyboard_arrow_up"
        class="my-fab"
        :direction="dir"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <q-fab-action
          color="primary"
          external-label
          label="重置"
          :label-position="again"
          @click="init"
        >
          <q-icon class="iconfont icon-undo" />
        </q-fab-action>
        <q-fab-action
          color="secondary"
          external-label
          label="规则"
          :label-position="again"
          @click="ruleClick"
        >
          <q-icon class="iconfont icon-exclaimination" />
        </q-fab-action>
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="showRules">
      <q-card>
        <q-card-section>
          <div class="text-h6">规则</div>
        </q-card-section>

        <q-card-section class="q-pa-sm q-pt-none">
          <ul class="q-pl-md">
            <li v-for="(rule, index) in rules" :key="index">{{ rule }}</li>
          </ul>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="明白" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { dom } from "quasar";

export default {
  name: "logicalThinking",
  data() {
    const rules = [
      '双人对弈，一人执O，一人执X，O为先手；',
      '每落一子为一手,先后手轮换落子；',
      '每手棋仅会冻结5手，5手后对手可落子覆盖；',
      '冻结4-5手，边框为红色；冻结2-3手，边框为黄色；冻结1手，边框为蓝色；边框为绿色的方块即为可落子区；',
      '己方落子区域，可不遵守第四条规则，可直接落子，落子后会重新刷新冻结期为5手；',
      '横竖斜三子连线即为胜利；',
      '人生如棋，落子无悔；',
    ];
    return {
      rules,
      blocks: [],
      nowHandler: "circle",
      needWaiteTime: 5,
      handlerObj: {
        circle: "先手O",
        close: "后手x",
      },
      result: "",
      showRules: false,
      /** fab位置 */
      dir: 'up',
      again: 'left',
      fabPos: [20, 20],
    };
  },
  methods: {
    // 初始化棋盘
    init() {
      this.blocks = [];
      for (let i = 0; i < 9; i++) {
        this.blocks.push({
          id: i,
          xy: [i % 3, Math.floor(i / 3)],
          value: null,
          waiteTime: 0,
        });
      }
      this.result = '';
    },
    // 移动fab
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
        if (y > top) {
          this.dir = 'down'
        } else {
          this.dir = 'up'
        }
        if (x > left) {
          this.again = 'right'
        } else {
          this.again = 'left'
        }

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
    ruleClick () {
      this.showRules = true;
    },
    // 落子
    blockClick(item) {
      if (this.result) {
        this.$q.notify({
          message: "胜负已分",
          color: "warning",
        });
        return;
      }
      if (item.waiteTime > 0 && item.value !== this.nowHandler) {
        this.$q.notify({
          message: `此块还需等待${item.waiteTime}手`,
          color: "warning",
        });
        return;
      }
      this.blocks = this.blocks.map((block) => {
        if (item.id === block.id) {
          return {
            ...block,
            value: this.nowHandler,
            waiteTime: this.needWaiteTime,
          };
        }
        return {
          ...block,
          waiteTime: block.waiteTime > 0 ? block.waiteTime - 1 : 0,
        };
      });

      // 判断结果
      const res = this.validateWin(item);
      if (res) {
        this.result = this.nowHandler;
        this.$q.notify({
          message: `${this.handlerObj[this.nowHandler]}获胜`,
          color: "teal",
        });
        return;
      }

      // 切换执手
      if (this.nowHandler === "circle") {
        this.nowHandler = "close";
      } else {
        this.nowHandler = "circle";
      }
    },
    // 判断结果
    validateWin() {
      const resBlocks = this.blocks.filter(
        (item) => item.value === this.nowHandler
      );
      console.log("resBlocks :>> ", resBlocks);
      // 处理结果，判断是否获胜
      const flag = {
        row0: 0,
        row1: 0,
        row2: 0,
        column0: 0,
        column1: 0,
        column2: 0,
        prime: 0, // 撇
        press: 0, // 捺
      };
      resBlocks.forEach((item) => {
        flag[`row${item.xy[0]}`] += 1;
        flag[`column${item.xy[1]}`] += 1;
        if (item.xy[0] === item.xy[1]) {
          flag.press += 1;
        }
        if (item.xy[0] + item.xy[1] === 2) {
          flag.prime += 1;
        }
      });
      console.log("flag :>> ", flag);
      const isWin = Object.values(flag).includes(3);
      return isWin;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.my-fab {
  opacity: 0.8;
  :deep(.q-btn__wrapper) {
    padding: 8px;
    min-height: 28px;
    min-width: 28px;
  }
}
.blocks {
  justify-content: space-around;
  align-content: center;
  .block {
    position: relative;
    margin: 1.5%;
    width: 30%;
    height: 0;
    padding-bottom: 30%;
    background-color: #ddd;
    font-size: 48px;
    .iconfont {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -24px;
      margin-left: -24px;
    }
    &.block_0 {
      border: 2px solid #66bb6a;
    }
    &.block_1 {
      border: 2px solid #42a5f5;
    }
    &.block_2 {
      border: 2px solid #ffa726;
    }
    &.block_3 {
      border: 2px solid #ffa726;
    }
    &.block_4 {
      border: 2px solid #d32f2f;
    }
    &.block_5 {
      border: 2px solid #d32f2f;
    }
  }
}
.chips {
  justify-content: center;
  margin: 20px 0;
  .chip {
    width: 120px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    :deep(.q-chip__content) {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
