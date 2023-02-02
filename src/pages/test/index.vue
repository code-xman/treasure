<template>
  <q-page class="fit overflow-auto">
    <q-file v-model="file" ref="file" />
    <q-select v-model="select" :options="options" label="Standard" />
    <q-btn @click="getENV">获取env</q-btn>
    <q-btn @click="toImport">导入</q-btn>
    <q-btn @click="toSavebase64">保存Base64</q-btn>
    <q-btn @click="toSaveBlob">保存Blob</q-btn>
    <q-btn @click="toSaveLocal">保存localStorage</q-btn>
    <q-btn @click="toGetLocal">获取localStorage</q-btn>
    <q-btn @click="toDelLocal">删除localStorage</q-btn>
    <q-btn @click="() => openDB('treasure', 1)">链接IDB</q-btn>
    <q-btn @click="closeDB">断开IDB</q-btn>
    <q-btn @click="addPerson">增加person数据</q-btn>
    <q-btn @click="updatePerson">修改person_00</q-btn>
    <q-btn @click="getPersonData">获取person数据</q-btn>
    <q-btn @click="() => DB_getDataByKey('person', '1675245695100', getData)">
      获取person_00 
    </q-btn>
    <q-btn @click="() => DB_deleteByKey('person', '1675245704462')">删除数person_62</q-btn>
    <q-btn @click="handleA">{{ v_a }}</q-btn>
  </q-page>
</template>

<script>
import {
  openDB,
  closeDB,
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
  data() {
    return {
      v_a: 1,
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
    openDB,
    closeDB,
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
        id: "1675245695100",
        name: `name_${str.slice(11)}`,
        age: str.slice(11),
      });
    },
    getPersonData() {
      DB_getAllData("person", this.getData);
    },
    DB_getDataByKey,
    DB_deleteByKey,
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
