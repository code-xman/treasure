<!--
 * @Description: 复制组件
 * @Author: xiangjie
 * @Date: 2023-01-31 10:55:02
 * @LastEditors: xiangjie
 * @LastEditTime: 2023-05-23 15:53:20
-->
<template>
  <div class="copy">
    <!-- 复制的内容 -->
    <div ref="contents" class="expand"><slot /></div>
    <!-- 复制按钮 自定义的slot/icon -->
    <div ref="handle" class="handle">
      <slot name="icon" />
      <q-icon v-if="showIcon" class="iconfont icon-file-copy1" />
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";

export default {
  name: "Copy",
  props: {
    content: [String, Number],
    ErrMsg: {
      type: String,
      default: "复制失败，请手动复制",
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      copy: null,
    };
  },
  methods: {
    handleSuccess() {
      this.$q.notify({
        position: "top",
        message: "复制成功",
        color: "teal",
      });
    },
    handleError() {
      this.$q.notify({
        position: "top",
        message: this.ErrMsg,
        color: "warning",
      });
    },
    init() {
      if (this.copy) return;

      /**
       * 实例化 ClipboardJS；
       * new ClipboardJS(实际进行操作的dom, config: {text: 复制的内容})
       */
      this.copy = new ClipboardJS(this.$refs.handle, {
        text: () => {
          const _text = this.content || this.$refs.contents.innerText;
          return _text;
        },
      });

      this.copy.on("success", this.handleSuccess);
      this.copy.on("error", this.handleError);
    },
  },
  mounted () {
    this.init();
  },
  beforeDestroy() {
    if (!this.copy) return;
    this.copy.destroy()
  },
};
</script>

<style lang="scss" scoped></style>
