<template>
  <q-page class="fit overflow-auto q-pa-sm">
    <div class="q-pa-sm q-gutter-sm flex justify-between">
      <Confirm
        :show="openDBConfirm"
        :color="'teal'"
        :text="`在未连接或连接失败的时候，点击右下侧确认按钮可以重新发起连接。
              正常情况下(未看到连接失败报错提示即为正常)，则无需操作。
              如果点击确认后仍然显示失败，请将idb_v的数字加1后，再次尝试。
              请确认是否继续。`"
        @hide="() => (openDBConfirm = false)"
        @confirm="manualOpenDB"
      >
        <q-btn
          color="teal"
          label="连接数据库"
          @click="() => (openDBConfirm = true)"
        />
      </Confirm>
      <q-btn color="purple" label="获取库数据" @click="getDB" />

      <Copy :showIcon="false" :content="idb_dataStr" :ErrMsg="CopyErrMsg">
        <template #icon>
          <q-btn color="indigo" label="复制库数据" />
        </template>
      </Copy>
      
      <Confirm
        :show="putDBConfirm"
        :color="'light-green'"
        text="写入库数据将会使用idb_data里的数据去覆盖本地数据，请确定idb_data中的数据是否正确。请确认是否继续。"
        @hide="() => (putDBConfirm = false)"
        @confirm="putDB"
      >
        <q-btn color="light-green" label="写入库数据" @click="() => (putDBConfirm = true)" />
      </Confirm>

      <Confirm
        :show="delDBConfirm"
        :color="'deep-orange'"
        text="删除数据库后无法恢复数据，除非您明确删除数据库的后果，否则我们不建议您这么做。请确认是否继续。"
        @hide="() => (delDBConfirm = false)"
        @confirm="manualDelDB"
      >
        <q-btn
          color="deep-orange"
          label="删除数据库"
          @click="() => (delDBConfirm = true)"
        />
      </Confirm>
    </div>
    <q-input
      outlined
      v-model="idb_name"
      label="idb_name"
      class="q-mb-sm"
      disable
    />
    <q-input outlined v-model="idb_v" label="idb_v" class="q-mb-sm" />
    <q-input
      outlined
      v-model="idb_dataStr"
      label="idb_data"
      type="textarea"
      class="q-mb-sm"
    />
  </q-page>
</template>

<script>
import Copy from "@/components/Copy.vue";
import Confirm from "src/components/Confirm.vue";
import {
  objStoreArr,
  openDB,
  closeDB,
  deleteDB,
  DB_getAllData,
  DB_updateData,
} from "@/utils/idb";

export default {
  name: "setting",
  components: { Confirm, Copy },
  data() {
    return {
      CopyErrMsg: '复制失败，请先点击[获取数据库]，待[idb_data]有数据后再次尝试。',
      idb_name: "treasure",
      idb_v: process.env.DB_V,
      idb_data: {},
      idb_dataStr: "",
      openDBConfirm: false,
      delDBConfirm: false,
      putDBConfirm: false,
    };
  },
  computed: {
    storeNames() {
      return objStoreArr.map((item) => item.name);
    },
    objStoreObj() {
      const res = {};
      objStoreArr.forEach(obj => res[obj.name] = obj)
      return res;
    },
  },
  methods: {
    manualOpenDB() {
      openDB(this.idb_name, Number(this.idb_v), (res) => {
        if (res.status === "success") {
          this.openDBConfirm = false;
        }
      });
    },
    manualDelDB() {
      closeDB();
      deleteDB(this.idb_name, (res) => {
        if (res.status === "success") {
          this.delDBConfirm = false;
        }
      });
    },
    getDB() {
      if (!this.storeNames?.length) return;
      this.storeNames.forEach((item, index) => {
        DB_getAllData(item, (res) => {
          if (res.status === "success") {
            this.idb_data[item] = res.data;
          }
          if (Object.keys(this.idb_data).length === this.storeNames.length) {
            this.idb_dataStr = JSON.stringify(this.idb_data);
          }
        });
      });
    },
    putDB() {
      if (!this.storeNames?.length) return;
      this.idb_data = JSON.parse(this.idb_dataStr)
      
      this.storeNames.forEach(name => {
        if (!this.idb_data[name]?.length) return;
        
        this.idb_data[name].forEach(item => {
          DB_updateData(name, item, res => {
            if (res.status === 'fail') {
              this.$q.notify({
                position: "top",
                message: `${this.objStoreObj[name]?.title || ''}写入数据失败`,
                color: "negative",
              })
            }
          })
        })
      })
      this.putDBConfirm = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
