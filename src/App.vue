<template>
  <div id="q-app" :class="{ grayscale: anniversariesData.isSadDay }">
    <router-view />
  </div>
</template>

<script>
import VConsole from "vconsole";
import dayjs from 'dayjs';
import { anniversariesData } from "src/pages/anniversaries/data";
import "@/mian";
import { openDB, closeDB } from "@/utils/idb";

export default {
  name: "App",
  data() {
    return {
      vConsole: null,
      anniversariesData,
    };
  },
  created() {
    // vConsole
    this.vConsole =
      process.env.NODE_TYPE === "development" ? new VConsole() : null;

    // iconfont
    this.$q.iconMapFn = (iconName) => {
      // iconName是QIcon“name”属性的内容

      // 您的自定义方法，以下
      // 仅是示例：
      if (iconName.startsWith("iconfont") === true) {
        // we strip the "iconfont" part

        return {
          cls: "icon- " + iconName,
        };
      }
    };
  },
  mounted() {
    // if (process.env.NODE_TYPE !== "development") {
      openDB("treasure", process.env.DB_V);
    // } 
  },
  beforeDestroy() {
    // vConsole
    if (this.vConsole) {
      this.vConsole?.destroy();
    }
    // IDB
    if (this.IDB_T) {
      closeDB();
    }
  },
};
</script>

<style lang="scss" scoped>
.grayscale {
  filter: grayscale(90%);
}
</style>
