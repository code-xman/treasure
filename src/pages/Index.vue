<template>
  <q-page class="fit q-pa-md overflow-auto">
    <template v-for="item in menuList">
      <q-card
        v-if="!item.hidden"
        :key="item.name"
        class="q-mb-md q-pa-xs bg-primary text-white a_card"
        @click="() => gotoPage(item.path)"
      >
        <q-card-section class="q-pa-xs text-center">
          {{ item.title }}
        </q-card-section>
      </q-card>
    </template>
  </q-page>
</template>

<script>
import { noHomeMenuList as menuList } from "src/data/menu";
export default {
  name: "PageIndex",
  data() {
    return {
      menuList,
    };
  },
  methods: {
    gotoPage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.a_card {
  font-size: 20px;
}
</style>
