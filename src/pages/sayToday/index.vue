<template>
  <q-page class="q-pa-sm fit overflow-auto">
    <q-card
      class="q-mb-sm q-pa-sm"
      bordered
      v-for="item in cardList"
      :key="item.keyword"
    >
      <div class="text-overline">{{ item.keyword }}</div>
      <q-card-section horizontal>
        <q-card-section class="q-pa-xs">
          <div class="text-caption text-grey">
            {{ item.summary }}
          </div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center q-pa-xs">
          <q-img class="rounded-borders" :src="item.image" />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { apiToday } from "src/api/coderutil.js";

export default {
  name: "sayToday",
  data() {
    return {
      cardList: [],
    };
  },
  methods: {
    async init() {
      this.$q.loading.show();
      try {
        const res = await apiToday();
        if (res.status === 200) {
          this.cardList = [...res.data];
          this.$store.commit("myData/updateSayToday", [...res.data]);
        } else {
          throw "error";
        }
      } catch (error) {
        this.$q.notify({
          position: "top",
          message: `发生了不可描述的问题`,
          color: "warning",
        });
      } finally {
        this.$q.loading.hide();
      }
    },
  },
  mounted() {
    const  data = this.$store.state.myData.sayTodayData;
    if (data?.length < 1) {
      this.init();
    } else {
      this.cardList = [...data];
    }
  },
};
</script>

<style lang="scss" scoped></style>
