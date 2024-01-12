<!-- 新增每日任务 -->
<template>
  <q-card class="fit column">
    <q-card-section class="row items-center q-pb-none shadow-3">
      <div class="text-h6">编辑</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="flex-1 overflow-auto">
      <q-form ref="form" class="col q-pb-sm overflow-auto q-gutter-md">
        <q-input
          v-for="item in formItems"
          :key="item.key"
          v-model.trim="formValue[item.key]"
          :label="item.label"
          :rules="item.rules"
          stack-label
          v-bind="item.attr"
        >
          <template v-if="item.hint" v-slot:hint>
            {{ item.hint }}
          </template>
          <template v-if="!!item.append" v-slot:append>
            <q-icon
              v-if="item.key === 'bgColor'"
              name="colorize"
              class="cursor-pointer"
              :style="{ color: `${formValue[item.key] || '#0000008a'}` }"
            >
              <q-popup-proxy
                cover
                ref="colorRef"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color
                  v-model="formValue[item.key]"
                  no-header-tabs
                  no-footer
                  class="my-picker"
                  default-view="palette"
                />
              </q-popup-proxy>
            </q-icon>
            <q-icon
              v-if="item.key === 'stratDate'"
              name="event"
              class="cursor-pointer"
            >
              <q-popup-proxy
                cover
                ref="stratDate"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="formValue[item.key]" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <!-- 是否正向 -->
        <q-toggle
          v-model="formValue.isDue"
          :label="formValue.isDue ? '正向任务' : '反向任务'"
          left-label
          color="primary"
          keep-color
        />
      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        rounded
        class="full-width shadow-up-3"
        color="primary"
        label="确定"
        @click="onSubmit"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import dayjs from "dayjs";
import { DB_addData, DB_updateData } from "@/utils/idb";

export default {
  name: "AddForm",
  props: {
    type: String,
    rowData: {
      type: Object,
      default: () => ({
        id: "",
        task: "",
        bgColor: "",
        stratDate: "",
        complete: 0,
        unComplete: 0,
        dayTimes: 1,
        isDue: true,
        detail: {},
      }),
    },
  },
  data() {
    const formList = [
      {
        label: "任务",
        key: "task",
        rules: [(val) => !!val || "必填"],
      },
      {
        label: "每天完成次数",
        key: "dayTimes",
        attr: {
          type: "number",
        },
        rules: [
          (val) =>
            (!!val &&
              val >= 1 &&
              val <= 100 &&
              !val.toString().includes(".")) ||
            "需填写1~100的整数",
        ],
      },
      // {
      //   label: "开始日期",
      //   key: "stratDate",
      //   rules: [(val) => !!val || "必填", "date"],
      //   append: true,
      //   hint: "请点击右侧的图标进行选择",
      //   attr: {
      //     mask: "date",
      //     readonly: true,
      //   },
      // },
      {
        label: "颜色",
        key: "bgColor",
        rules: [(val) => !!val || "必填"],
        append: true,
        hint: "请点击右侧的图标进行选择",
        attr: {
          readonly: true,
        },
      },
    ];
    return {
      formItems: [...formList],
      formValue: {
        task: "",
        dayTimes: 1,
        bgColor: "",
        isDue: true,
      },
    };
  },
  methods: {
    // DB 新增/修改数据回调
    callbackDB(res) {
      this.$q.notify({
        message: res.message,
        color: res.status === "success" ? "teal" : "warning",
      });
      if (res.status === "success") {
        this.$emit("closeModal");
      }
    },
    // 提交
    async onSubmit() {
      const validateRes = await this.$refs.form.validate();
      if (validateRes) {
        const data = {
          ...this.rowData,
          ...this.formValue,
          dayTimes: Number(this.formValue.dayTimes),
        };
        if (this.type === "add") {
          // 给id赋值
          data.id = new Date().getTime().toString();
          // 初始日期赋值
          data.stratDate = dayjs(new Date()).format("YYYY/MM/DD");

          DB_addData("dailyTask", data, this.callbackDB);
        } else if (this.type === "update") {
          DB_updateData("dailyTask", data, this.callbackDB);
        }
      }
    },
  },
  watch: {
    rowData: {
      handler() {
        if (this.type === "update") {
          this.formValue = { ...this.rowData };
        }
      },
      immediate: true,
    },
    // 监听发生日期，数据改变关闭popup
    "formValue.stratDate": {
      handler(val) {
        if (val) {
          this.$refs.stratDate[0].hide();
        }
      },
    },
    // 监听背景颜色，数据改变关闭popup
    "formValue.bgColor": {
      handler(val) {
        if (val) {
          this.$refs.colorRef[0].hide();
        }
      },
    },
  },
};
</script>

<style lang=" scss" scoped></style>
