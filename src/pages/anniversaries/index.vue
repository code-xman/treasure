<!--
 * @Description: 下一个记零日
 * @Author: xiangjie
 * @Date: 2022-08-31 17:07:03
 * @LastEditors: xiangjie
 * @LastEditTime: 2023-02-13 16:09:43
-->
<template>
  <div class="fit column q-pa-sm q-pb-md">
    <div class="col overflow-auto q-mb-sm q-pa-sm">
      <q-card
        v-for="item in dayList"
        :key="item.key"
        class="q-ma-sm my-card full-width"
      >
        <q-card-section
          class="flex text-white"
          :style="{ background: item.bgColor }"
        >
          <div class="harf-width">
            <div class="text-h6">{{ item.name }}</div>
            <div class="text-subtitle2">{{ item.happenDate }}</div>
          </div>
          <div class="harf-width text-center">
            <div v-if="!item.nextOnce" class="text-h5">就在今日！</div>
            <div v-else>
              <div>距离下一次还有</div>
              <div>
                <span class="text-h5"> {{ item.nextOnce }} </span> 天
              </div>
            </div>
          </div>
          <div class="full-width text-body2">{{ item.text }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-if="item.action1"
            flat
            @click="() => showAction(item.action1)"
          >
            Action 1
          </q-btn>
          <q-btn
            v-if="item.action2"
            flat
            @click="() => showAction(item.action2)"
          >
            Action 2
          </q-btn>
          <q-btn v-if="item.isSelfData" flat @click="() => handelUpdate(item)">
            修改
          </q-btn>
          <Confirm
            v-if="item.isSelfData"
            :show="showDeleteConfirm"
            @hide="handelHide"
            @confirm="handelConfirm"
          >
            <q-btn flat @click="() => handelDelete(item)">
              删除
            </q-btn>
          </Confirm>
        </q-card-actions>
      </q-card>
    </div>
    <div class="full-width flex justify-around">
      <!-- <Confirm
        :show="showDeleteAllConfirm"
        @hide="handelHide"
        @confirm="handelConfirm"
      >
        <q-btn
          class="shadow-3"
          label="清除数据"
          color="secondary"
          @click="toDelData"
        />
      </Confirm> -->
      <q-btn rounded class="flex-1 shadow-3" label="添加" color="secondary" @click="addData" />
    </div>
    <q-dialog v-model="showActionFlag">
      <q-card class="fit">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          {{ actionContent }}
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showAddFlag" maximized>
      <AddForm :type="type" :rowData="rowData" @closeModal="closeModal" />
    </q-dialog>
  </div>
</template>

<script>
// import Push from "push.js";
// import schedule from "node-schedule";
import { DB_updateData, DB_getAllData, DB_deleteByKey } from "@/utils/idb";
import Confirm from "src/components/Confirm.vue";
import { dayData, handleDayData } from "./data";
import AddForm from "./AddForm.vue";

export default {
  name: "anniversaries",
  components: { AddForm, Confirm },
  data() {
    return {
      dayData,
      selfDayData: [],
      // scheduleJ: null,
      showActionFlag: false,
      actionContent: "",
      showAddFlag: false,
      type: "add",
      rowData: {},
      isDelAll: false,
      showDeleteConfirm: false,
      showDeleteAllConfirm: false,
    };
  },
  computed: {
    dayList() {
      const list = [
        ...this.dayData,
        ...this.selfDayData,
      ];
      const res = handleDayData(list);
      return res;
    },
  },
  methods: {
    /** 获取所有数据 */
    getAllData() {
      DB_getAllData("anniversaries", (res) => {
        if (res.status === "success") {
          this.selfDayData = res.data;
        } else {
          this.$q.notify({
            message: res.message,
            color: "waring",
          });
        }
      });
    },
    showAction(actionData) {
      if (!actionData) return;
      this.actionContent = actionData;
      this.showActionFlag = true;
    },
    /** 新增数据 */
    addData() {
      const len = this.selfDayData.length;
      if (len >= 50) {
        this.$q.notify({
          position: "top",
          message: "存储数据已达上线",
          color: "warning",
        });
        return;
      }
      this.type = "add";
      this.showAddFlag = true;
    },
    /** 关闭弹框 */
    closeModal() {
      this.getAllData();
      this.rowData = {};
      this.showAddFlag = false;
    },
    /** 处理编辑 */
    handelUpdate(data) {
      this.type = "update";
      this.rowData = data;
      this.showAddFlag = true;
    },
    /** 处理删除 */
    handelDelete(data) {
      this.isDelAll = false;
      this.rowData = data;
      this.showDeleteConfirm = true;
    },
    /** 处理取消删除 */
    handelHide() {
      this.rowData = {};
      if (this.isDelAll) {
        this.showDeleteAllConfirm = false;
      } else {
        this.showDeleteConfirm = false;
      }
    },
    /** 处理确认删除 */
    handelConfirm() {
      if (this.isDelAll) {
        this.handelDelAll();
      } else {
        this.handelDelOne();
      }
    },
    /** 删除单条 */
    handelDelOne() {
      DB_deleteByKey("anniversaries", this.rowData.key);
      this.rowData = {};
      this.showDeleteConfirm = false;
      this.getAllData();
    },
    /** 删除所有数据 */
    toDelData() {
      this.isDelAll = true;
      this.showDeleteAllConfirm = true;
    },
    /** 删除所有数据 */
    handelDelAll() {},
  },
  mounted() {
    this.getAllData();
  },
};
</script>

<style lang="scss" scoped></style>
