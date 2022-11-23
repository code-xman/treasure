<template>
  <q-page class="fit overflow-auto">
    <div class="q-ma-md flex justify-between">
      <template v-for="item in menuList">
        <q-card
          v-if="!item.hidden"
          :key="item.name"
          class="q-mb-md q-pa-xs bg-primary text-white harf_width_8 a_card"
          @click="() => gotoPage(item)"
        >
          <q-card-section class="q-pa-xs flex items-center">
            <q-icon v-if="item.icon" :name="item.icon" />
            <q-icon
              v-if="item.iconfont"
              class="iconfont"
              :class="item.iconfont"
            />
            <div class="flex-1 text-center">
              {{ item.meta?.title }}
            </div>
          </q-card-section>
        </q-card>
      </template>
    </div>
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
    gotoPage(link) {
      this.$router.push({
        name: link.name,
        params: { title: link.meta?.title },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.a_card {
  font-size: 16px;
}
</style>
