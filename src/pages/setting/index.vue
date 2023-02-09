<template>
  <q-page class="fit overflow-auto q-pa-sm">
    <div class="q-pa-sm q-gutter-sm" >
      <Confirm
        :show="openDBConfirm"
        :text="`在未连接或连接失败的时候，点击右下侧按钮可以重新发起连接。
              正常情况下(未看到连接失败报错提示即为正常)，则无需操作。
              请确认是否继续`"
        @hide="() => (openDBConfirm = false)"
        @confirm="manualOpenDB"
      >
        <q-btn color="amber" label="连接数据库" @click="() => (openDBConfirm = true)" />
      </Confirm>
      <Confirm
        :show="delDBConfirm"
        text="删除数据库后无法恢复数据，除非您明确删除数据库的后果，否则我们不建议您点击删除数据库。请确认是否继续"
        @hide="() => (delDBConfirm = false)"
        @confirm="manualDelDB"
      >
        <q-btn color="deep-orange" label="删除数据库" @click="() => (delDBConfirm = true)" />
      </Confirm>
    </div>
  </q-page>
</template>

<script>
import Confirm from "src/components/Confirm.vue";
import { openDB, deleteDB } from "@/utils/idb";

export default {
  name: "setting",
  components: { Confirm },
  data() {
    return {
      openDBConfirm: false,
      delDBConfirm: false,
    };
  },
  methods: {
    manualOpenDB() {
      openDB("treasure", 2, (res) => {
        if (res.status === "success") {
          this.openDBConfirm = false;
        }
      });
    },
    manualDelDB() {
      deleteDB("treasure", (res) => {
        if (res.status === "success") {
          this.delDBConfirm = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
