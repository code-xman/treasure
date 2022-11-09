<template>
  <q-page>
    <q-file v-model="file" ref="file" /> 
    <q-select v-model="select" :options="options" label="Standard" />
    <q-btn @click="toImport">导入</q-btn>
    <q-btn @click="toSavebase64">保存Base64</q-btn>
    <q-btn @click="toSaveBlob">保存Blob</q-btn>
    <q-btn @click="toSaveLocal">保存localStorage</q-btn>
    <q-btn @click="toGetLocal">获取localStorage</q-btn>
    <q-btn @click="toDelLocal">删除localStorage</q-btn>
  </q-page>
</template>

<script>
import { toReadFile, toDownFile, toDownloadBlob } from "src/utils/base";

export default {
  name: "test",
  data() {
    return {
      file: null,
      select: '',
      options: [
        'application/octet-stream',
        'octet/stream',
        'text/plain',
      ],
      content: {
        name: "1111",
        age: 10,
        icon: "456464",
        arr: [1, 2, 3],
        obj: { a: "121", b: 454 },
      },
    };
  },
  methods: {
    toSavebase64() {
      toDownFile("test.txt", this.content);
    },
    toSaveBlob() {
      toDownloadBlob("test.txt", this.content, this.select);
    },
    toImport() {
      this.$refs.file.$el.click();
    },
    toRead(fileValue) {
      toReadFile(fileValue, (res) => {
        console.log("res :>> ", res);
      });
    },
    toSaveLocal () {
      localStorage.setItem('test', JSON.stringify(this.content));
    },
    toGetLocal () {
      const res = JSON.parse(localStorage.getItem('test'));
      console.log('res :>> ', res);
    },
    toDelLocal () {
      localStorage.removeItem('test');
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
