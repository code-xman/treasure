<template>
  <q-page>
    <q-file v-model="file" ref="file" />
    <q-select v-model="select" :options="options" label="Standard" />
    <q-btn @click="getENV">获取env</q-btn>
    <q-btn @click="toImport">导入</q-btn>
    <q-btn @click="toSavebase64">保存Base64</q-btn>
    <q-btn @click="toSaveBlob">保存Blob</q-btn>
    <q-btn @click="toSaveLocal">保存localStorage</q-btn>
    <q-btn @click="toGetLocal">获取localStorage</q-btn>
    <q-btn @click="toDelLocal">删除localStorage</q-btn>
    <q-btn @click="() => openDB('test', 1)">链接IDB</q-btn>
    <q-btn @click="() => addDB('person', 'readwrite')">增加person数据</q-btn>
    <q-btn @click="() => getDB('person')">获取person数据</q-btn>
    <q-btn @click="closeDB">断开IDB</q-btn>
  </q-page>
</template>

<script>
import { toReadFile, toDownFile, toDownloadBlob } from "src/utils/base";

export default {
  name: "test",
  data() {
    return {
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
    getENV () {
      console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV);
      console.log('process.env.NODE_TYPE :>> ', process.env.NODE_TYPE);
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
    /** 打开/链接 数据库 */
    openDB(databaseName, version, callback) {
      const v_this = this;
      // 打开/链接数据库
      const request = window.indexedDB.open(databaseName, version);

      // 失败
      request.onerror = function (event) {
        v_this.$q.notify({
          message: "链接数据库失败",
          color: "warning",
        });
      };
      // 成功
      request.onsuccess = function (event) {
        // 获取数据
        v_this.IDB = request.result;
        callback?.();

        v_this.$q.notify({
          message: "链接数据库成功",
          color: "teal",
        });
      };
      // 升级 指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
      request.onupgradeneeded = function (_this, event) {
        // 获取数据
        v_this.IDB = event?.target?.result;
      };
    },
    /** 增加IDB数据 */
    addDB(storeName, opType) {
      const v_this = this;
      try {
        if (!this.IDB) throw `操作失败`;
        // 注意须在data.value有值的情况下操作
        const objectStore = this.IDB
          // 发起事务 指定表格名称和操作模式（"只读"--readonly或"读写"--readwrite）
          .transaction([storeName], opType)
          // 选择表对象
          .objectStore(storeName);

        // 添加具体数据
        const request = objectStore.add({
          id: new Date().getTime().toString(),
          name: 'name',
          age: 'age',
          email: 'email',
        });

        // console.log('request :>> ', request);

        request.onsuccess = function (event) {
          v_this.$q.notify({
            message: "添加数据成功",
            color: "teal",
          });
        };

        request.onerror = function (event) {
          v_this.$q.notify({
            message: `${error}`,
            color: "warning",
          });
        };
      } catch (error) {
        this.$q.notify({
          message: `${error}`,
          color: "warning",
        });
      }
    },
    /** 获取IDB数据 */
    getDB(storeName) {
      try {
        if (!this.IDB) throw `查询数据失败`;
        // 最终结果
        const res = [];
        // 获取数据库的表对象
        const objectStore =
          this.IDB?.transaction(storeName).objectStore(storeName);
        // 游标
        objectStore.openCursor().onsuccess = (event) => {
          const cursor = event.target?.result;

          if (cursor) {
            res.push(cursor.value);
            cursor.continue();
          } else {
            console.log("获取数据完成 : >>", res);
          }
        };
      } catch (error) {
        this.$q.notify({
          message: `${error}`,
          color: "warning",
        });
      }
    },
    /** 关闭数据库 */
    closeDB() {
      try {
        // IDB数据库未链接/打开，直接抛错
        if (!this.IDB) throw `IDB数据库未链接`;
        // 断开/关闭 IDB; 关闭数据库后，无法操作数据，但是可以建表;
        this.IDB.close();
        this.$q.notify({
          message: "已断开数据库链接",
          color: "teal",
        });
      } catch (error) {
        this.$q.notify({
          message: `${error}`,
          color: "warning",
        });
      }
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
