<template>
  <q-page class="fit overflow-auto q-pa-sm">
    <q-file v-model="file" outlined ref="file" label="file" />
    <q-select v-model="select" outlined :options="options" label="Standard" />
    <q-btn @click="getENV">获取env</q-btn>
    <q-btn @click="toImport">导入</q-btn>
    <q-btn @click="toSavebase64">保存Base64</q-btn>
    <q-btn @click="toSaveBlob">保存Blob</q-btn>
    <q-btn @click="toSaveLocal">保存localStorage</q-btn>
    <q-btn @click="toGetLocal">获取localStorage</q-btn>
    <q-btn @click="toDelLocal">删除localStorage</q-btn>
    <q-input outlined v-model="idb_name" label="idb_name" />
    <q-input outlined v-model="idb_v" label="idb_v" />
    <q-btn @click="openIDB">链接IDB</q-btn>
    <q-btn @click="closeDB">断开IDB</q-btn>
    <q-btn @click="deleteIDB">删除IDB</q-btn>
    <q-input outlined v-model="idb_key" label="idb_key" />
    <q-btn @click="addPerson">增加person数据</q-btn>
    <q-btn @click="getPersonData">获取person数据</q-btn>
    <q-btn @click="updatePerson">修改person_0</q-btn>
    <q-btn @click="getPerson"> 获取person_0 </q-btn>
    <q-btn @click="deletePerson">删除数person_0</q-btn>
    <!-- <q-btn @click="handleA">{{ v_a }}</q-btn> -->
    <Confirm
      :show="showDeleteConfirm"
      text="删除后无法恢复数据，请确认是否继续"
      @hide="() => showDeleteConfirm = false"
      @confirm="handleDeleteIDB"
    />
  </q-page>
</template>

<script>
import Confirm from "src/components/Confirm.vue";
import {
  openDB,
  closeDB,
  deleteDB,
  DB_addData,
  DB_updateData,
  DB_getAllData,
  DB_getDataByKey,
  DB_deleteByKey,
} from "@/utils/idb";
import { toReadFile, toDownFile, toDownloadBlob } from "src/utils/base";
// import { addA } from './test';

export default {
  name: "test",
  components: { Confirm },
  data() {
    return {
      v_a: 1,
      showDeleteConfirm: false,
      file: null,
      select: "",
      options: ["application/octet-stream", "octet/stream", "text/plain"],
      content: {
        name: "1111",
        age: 10,
        icon: "456464",
        arr: [1, 2, 3],
        obj: { a: "121", b: 454 },
      },
      /** IDB数据库 */
      IDB: null,
      idb_name: "",
      idb_v: "",
      idb_key: "",
    };
  },
  methods: {
    toSavebase64() {
      toDownFile("test.txt", this.content);
    },
    toSaveBlob() {
      toDownloadBlob("test.txt", this.content, this.select);
    },
    getENV() {
      console.log("process.env.NODE_ENV :>> ", process.env.NODE_ENV);
      console.log("process.env.NODE_TYPE :>> ", process.env.NODE_TYPE);
    },
    toImport() {
      this.$refs.file.$el.click();
    },
    toRead(fileValue) {
      toReadFile(fileValue, (res) => {
        console.log("res :>> ", res);
      });
    },
    toSaveLocal() {
      localStorage.setItem("test", JSON.stringify(this.content));
    },
    toGetLocal() {
      const res = JSON.parse(localStorage.getItem("test"));
      console.log("res :>> ", res);
    },
    toDelLocal() {
      localStorage.removeItem("test");
    },
    /** 获取IDB数据 */
    getData(res) {
      console.log("res :>> ", res);
    },
    openIDB() {
      if (!this.idb_name || !this.idb_v) return;
      openDB(this.idb_name, Number(this.idb_v) || 1);
    },
    closeDB,
    deleteIDB() {
      this.showDeleteConfirm = true;
    },
    handleDeleteIDB() {
      if (!this.idb_name) return;
      deleteDB(this.idb_name, res => {
        if (res.status === 'success') {
          this.showDeleteConfirm = false;
        }
      });
    },
    addPerson() {
      const str = `${new Date().getTime()}`;
      DB_addData("person", {
        id: str,
        name: `name_${str.slice(11)}`,
        age: str.slice(11),
      });
    },
    updatePerson() {
      const str = `${new Date().getTime()}`;
      DB_updateData("person", {
        id: this.idb_key,
        name: `name_${str.slice(11)}`,
        age: str.slice(11),
      });
    },
    getPersonData() {
      DB_getAllData("person", this.getData);
    },
    getPerson() {
      if (!this.idb_key) return;
      DB_getDataByKey("person", this.idb_key, this.getData);
    },
    deletePerson() {
      if (!this.idb_key) return;
      DB_deleteByKey("person", this.idb_key);
    },
    handleA() {
      // addA();
      // this.v_a = this.a;
    },
  },
  watch: {
    file(value) {
      if (!this.file) return;
      this.toRead(this.file);
    },
  },
};
</script>

<style lang="scss" scoped></style>
