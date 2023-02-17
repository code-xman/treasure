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
  </q-page>
</template>

<script>
export default {
  name: "logicalThinking",
  data() {
    return {
      blocks: [],
      nowHandler: "circle",
      needWaiteTime: 5,
    };
  },
  methods: {
    blockClick(item) {
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
            id: item.id,
            // 未落子或自己区域直接赋值，对手区则清空
            value:
              !block.value || block.value === this.nowHandler
                ? this.nowHandler
                : null,
            waiteTime:
              !block.value || block.value === this.nowHandler
                ? this.needWaiteTime
                : 0,
          };
        }
        return {
          ...block,
          waiteTime: block.waiteTime > 0 ? block.waiteTime - 1 : 0,
        };
      });

      this.validateWin(item)

      if (this.nowHandler === "circle") {
        this.nowHandler = "close";
      } else {
        this.nowHandler = "circle";
      }
    },
    validateWin() {
      const resBlocks = this.blocks.filter(
        (item) => item.value === this.nowHandler
      );
      console.log('resBlocks :>> ', resBlocks);
      // TODO: 处理结果，判断是否获胜
    },
  },
  mounted() {
    for (let i = 0; i < 9; i++) {
      this.blocks.push({
        id: i,
        value: null,
        waiteTime: 0,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
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
      border: 2px solid #ab47bc;
    }
    &.block_4 {
      border: 2px solid #d32f2f;
    }
    &.block_5 {
      border: 2px solid #d50000;
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
