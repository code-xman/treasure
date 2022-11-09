<template>
  <div id="q-app" :class="{grayscale: anniversariesData.isSadDay}">
    <router-view />
  </div>
</template>

<script>
import VConsole from "vconsole";
import { anniversariesData } from 'src/pages/anniversaries/data';

export default {
  name: 'App',
  data () {
    return {
      vConsole: null,
      anniversariesData,
    }
  },
  created () {
    this.vConsole = process.env.NODE_ENV === "development" ? new VConsole() : null ;
  },
  beforeDestroy() {
    if (this.vConsole) {
      this.vConsole.destroy();
    }
  },
}
</script>

<style lang="scss" scoped>
.grayscale {
  filter: grayscale(90%);
}
</style>
