<template>
  <q-card class="fit column">
    <!-- <q-card-section class="row justify-center q-pb-none shadow-3">
      <div class="text-h6">完成详情</div>
    </q-card-section> -->

    <q-card-section class="flex-1 overflow-auto">
      <div class="row justify-center">
        <q-date
          v-model="date"
          :title="date"
          :subtitle="rowData.task"
          :events="eventsFn"
          :event-color="'teal'"
          :options="filterOption"
        />
        <div class="full-width">
          <q-badge
            class="q-ma-sm"
            :color="dateDetail.isComplete ? 'teal' : 'negative'"
          >
            {{ !!dateDetail?.isComplete ? "完成目标" : "未完成" }}
          </q-badge>
          <q-badge class="q-ma-sm" color="accent">
            当日完成{{ dateDetail?.completeTimes || 0 }}次
          </q-badge>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        rounded
        class="full-width shadow-up-3"
        color="primary"
        label="返回"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "DateDetial",
  props: {
    rowData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      date: dayjs(new Date()).format("YYYY/MM/DD"),
    };
  },
  computed: {
    parts() {
      return this.date?.split("/");
    },
    dateDetail() {
      const parts = this.parts;
      return this.rowData.detail?.[parts[0]]?.[parts[1]]?.[parts[2]] || {};
    },
  },
  methods: {
    eventsFn(date) {
      const parts = date?.split("/");
      const res =
        this.rowData.detail[parts[0]]?.[parts[1]]?.[parts[2]]?.isComplete;
      return res || false;
    },
    filterOption(date) {
      return date >= this.rowData.stratDate && date <= dayjs(new Date()).format("YYYY/MM/DD");
    },
  },
};
</script>

<style lang="scss" scoped></style>
