<!-- 每日任务  -->
<template>
  <q-page class="fit column q-pa-sm">
    <div v-if="!taskList?.length" class="col text-center">还未添加任务</div>
    <div v-else class="col overflow-auto q-mb-sm q-pa-sm">
      <q-card
        v-for="item in taskList"
        :key="item.id"
        class="q-ma-sm my-card full-width"
      >
        <q-card-section
          class="column text-white"
          :style="{ background: item.bgColor }"
        >
          <div class="text-h6">{{ item.task }}</div>
          <div>已完成: {{ item.complete }}, 未完成: {{ item.unComplete }}</div>
          <div class="flex justify-between">
            <div>
              今日完成度:
              {{
                item.detail[parts[0]]?.[parts[1]]?.[parts[2]]?.completeTimes ||
                0
              }}
              /
              {{ item.dayTimes }}
            </div>
            <div class="isDue q-px-xs">
              {{ item.isDue ? "正向任务" : "反向任务" }}
            </div>
          </div>
          <div class="text-right">开始于{{ item.stratDate }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat color="positive" @click="() => handleDetail(item)">
            完成详情
          </q-btn>
          <q-btn flat color="primary" @click="() => handelUpdateTask(item)">
            修改
          </q-btn>
          <Confirm
            :show="showDeleteConfirm"
            @hide="handelHide"
            @confirm="handelConfirm"
          >
            <q-btn
              flat
              color="deep-orange"
              @click="() => handelDeleteTask(item)"
            >
              删除
            </q-btn>
          </Confirm>
          <q-btn flat color="teal" @click="() => handelCompleteOnce(item)">
            完成一次
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="full-width flex justify-around">
      <q-btn
        rounded
        unelevated
        class="shadow-3 full-width"
        label="新增任务"
        color="secondary"
        @click="handelAddTask"
      />
    </div>

    <q-dialog v-model="showAddFlag" maximized>
      <AddForm :type="type" :rowData="rowData" @closeModal="closeModal" />
    </q-dialog>
    <q-dialog v-model="showDetailFlag" maximized>
      <DateDetail :rowData="rowData" @closeModal="closeDetail" />
    </q-dialog>
  </q-page>
</template>

<script>
import dayjs from "dayjs";
import { DB_updateData, DB_getAllData, DB_deleteByKey } from "@/utils/idb";
import Confirm from "src/components/Confirm.vue";
import AddForm from "./AddForm.vue";
import DateDetail from "./DateDetail.vue";

export default {
  name: "dailyTask",
  components: { Confirm, AddForm, DateDetail },
  data() {
    return {
      today: dayjs(new Date()).format("YYYY/MM/DD"),
      /** 任务列表 */
      taskList: [],
      /** 新增弹框 */
      showAddFlag: false,
      /** 完成详情弹框 */
      showDetailFlag: false,
      /** 弹框类型 */
      type: "add",
      /** 初始化数据 */
      restData: {
        id: "test",
        task: "",
        bgColor: "",
        stratDate: "",
        /** 完成天数 */
        complete: 0,
        /** 未完成天数 */
        unComplete: 0,
        /** 每日需完成次数 */
        dayTimes: 1,
        /** 是否正向 */
        isDue: true, // 反向任务，完成则增加未完成，主要是处理禁止任务（eg.不要做...）
        /** 备注 */
        remark: '',
        /** 完成详情 */
        detail: {},
      },
      /** 弹框数据 */
      rowData: {},
      // 确认删除弹框
      showDeleteConfirm: false,
    };
  },
  computed: {
    parts() {
      return this.today.split("/");
    },
  },
  methods: {
    /** 获取所有数据 */
    getAllTaskList() {
      DB_getAllData("dailyTask", (res) => {
        if (res.status === "success") {
          this.taskList = res.data.map((item) => {
            const days = Math.ceil(
              (new Date().getTime() - new Date(item.stratDate)) /
                (1000 * 60 * 60 * 24)
            );
            const parts = this.parts;
            if (item.isDue) {
              // 正向
              if (item.detail[parts[0]]?.[parts[1]]?.[parts[2]].isComplete) {
                // 当天 已 完成
                item.unComplete = days - item.complete;
              } else {
                // 当天 未 完成
                item.unComplete = days - item.complete - 1;
              }
            } else {
              // 反向
              if (!item.detail[parts[0]]?.[parts[1]]?.[parts[2]].isComplete) {
                // 当天 已 未完成
                item.complete = days - item.unComplete;
              } else {
                // 当天 未 未完成
                item.complete = days - item.unComplete - 1;
              }
            }
            return item;
          });
        } else {
          this.$q.notify({
            message: res.message,
            color: "waring",
          });
        }
      });
    },
    /** 处理每个任务的当日信息 */
    addTodayInfo(item) {
      const itemData = { ...item };
      const parts = this.parts;
      // 是否有今年
      if (!itemData.detail[parts[0]]) {
        itemData.detail[parts[0]] = {};
      }
      // 是否有当月
      if (!itemData.detail[parts[0]][parts[1]]) {
        itemData.detail[parts[0]][parts[1]] = {};
      }
      // 是否有今天
      if (!itemData.detail[parts[0]][parts[1]][parts[2]]) {
        itemData.detail[parts[0]][parts[1]][parts[2]] = {
          isComplete: false,
          completeTimes: 0,
        };
      }
      return itemData;
    },
    /** 新增任务 */
    handelAddTask() {
      this.type = "add";
      this.rowData = { ...this.restData };
      this.showAddFlag = true;
    },
    /** 查看完成详情 */
    handleDetail(item) {
      this.rowData = { ...item };
      this.showDetailFlag = true;
    },
    /** 修改任务 */
    handelUpdateTask(item) {
      this.type = "update";
      this.rowData = { ...item };
      this.showAddFlag = true;
    },
    /** 处理取消删除 */
    handelHide() {
      this.rowData = {};
      this.showDeleteConfirm = false;
    },
    /** 处理确认删除 */
    handelConfirm() {
      DB_deleteByKey("dailyTask", this.rowData.id);
      this.getAllTaskList();
      this.showDeleteConfirm = false;
    },
    /** 处理点击删除 */
    handelDeleteTask(item) {
      this.rowData = { ...item };
      this.showDeleteConfirm = true;
    },
    /** 完成一次任务 */
    handelCompleteOnce(item) {
      // [yyyy, mm, dd]
      const parts = this.parts;
      let itemData = { ...item };
      if (!itemData.detail?.[parts[0]]?.[parts[1]]?.[parts[2]]) {
        itemData = this.addTodayInfo(item);
      }
      const todayInfo = item.detail[parts[0]][parts[1]][parts[2]];
      if (todayInfo.completeTimes < item.dayTimes) {
        itemData.detail[parts[0]][parts[1]][parts[2]].completeTimes += 1;

        // 当天完成时，修改当日完成情况
        if (todayInfo.completeTimes === item.dayTimes) {
          if (itemData.isDue) {
            itemData.complete += 1;
            itemData.detail[parts[0]][parts[1]][parts[2]].isComplete = true;
          } else {
            itemData.unComplete += 1;
            itemData.detail[parts[0]][parts[1]][parts[2]].isComplete = false;
          }
        }

        DB_updateData("dailyTask", itemData);
        this.getAllTaskList();
      } else {
        this.$q.notify({
          message: "今日已完成任务",
          color: "accent",
        });
      }
    },
    /** 关闭弹框回调 */
    closeModal() {
      this.getAllTaskList();
      this.rowData = {};
      this.showAddFlag = false;
    },
    /** 关闭完成详情弹框回调 */
    closeDetail() {
      this.rowData = {};
      this.showDetailFlag = false;
    },
  },
  mounted() {
    this.getAllTaskList();
  },
};
</script>

<style lang="scss" scoped>
.isDue {
  border: 1px solid #fff;
  border-radius: 4px;
}
</style>
