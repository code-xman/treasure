<template>
  <q-page class="fit column q-pa-md">
    <div class="col overflow-auto q-pb-sm">
      <q-form ref="form" class="q-gutter-xs q-pb-md">
        <q-select
          v-for="item in formList"
          :key="item.key"
          v-model="formValue[item.key]"
          clearable
          :label="item.label"
          :options="item.options"
          :hide-dropdown-icon="true"
          :rules="[(val) => !!val || '必填']"
          :disable="!(item.options.length > 0)"
        >
          <template v-slot:hint v-if="!(item.options.length > 0)">
            请先完善前置信息
          </template>
        </q-select>
      </q-form>
      <q-card
        v-for="item in daily"
        :key="item.fxDate"
        class="q-ma-xs q-mb-sm weather-card"
        :class="osFlagObj[item.fxDate] ? 'stow' : 'open'"
      >
        <q-btn
          flat
          rounded
          color="primary"
          class="os-btn"
          :label="osFlagObj[item.fxDate] ? '收起' : '更多'"
          @click="() => osBtnClick(item.fxDate, osFlagObj[item.fxDate])"
        />

        <q-card-section>
          <div class="text-h6 flex justify-between">
            <span> {{ item.fxDate }} </span>
            <span> {{ item.textDay }} </span>
          </div>
          <div class="flex warp">
            <div
              v-for="oKey in otherKeys"
              :key="oKey"
              class="q-pb-sm harf-width"
            >
              {{ dailyObj[oKey].name }}: {{ item[oKey] }}
              {{ dailyObj[oKey].unit || "" }}
            </div>
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="q-pb-xs text-subtitle1 flex justify-between">
            <span> 白天详情 </span>
            <i :class="`qi-${item.iconDay}`"></i>
            <span> {{ item.textDay }} </span>
          </div>
          <div class="flex warp">
            <div v-for="dKey in dayKeys" :key="dKey" class="q-pb-sm harf-width">
              {{ dailyObj[dKey].name }}: {{ item[dKey] || "-" }}
              {{ dailyObj[dKey].unit || "" }}
            </div>
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="q-pb-xs text-subtitle1 flex justify-between">
            <span> 夜间详情 </span>
            <span>
              {{ item.textNight }} <i :class="`qi-${item.iconNight}`"></i>
            </span>
            <span>
              {{ item.moonPhase }} <i :class="`qi-${item.moonPhaseIcon}`"></i>
            </span>
          </div>
          <div class="flex warp">
            <div
              v-for="nKey in nightKeys"
              :key="nKey"
              class="q-pb-sm harf-width"
            >
              {{ dailyObj[nKey].name }}: {{ item[nKey] }}
              {{ dailyObj[nKey].unit || "" }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="full-width flex justify-between">
      <q-btn
        class="full-width shadow-up-3"
        color="teal"
        label="查询"
        @click="getLocationId"
      />
    </div>
  </q-page>
</template>

<script>
import { apiCityLookup, apiWeather } from "src/api/publicInterface";
import { province_list, getDataList } from "src/data/area";
import {
  dailyObj,
  otherKeys,
  dayKeys,
  nightKeys,
  uvArr,
  testData,
} from "./data";

export default {
  name: "myWeather",
  data() {
    return {
      formList: [
        {
          label: "省",
          key: "province",
          options: province_list,
        },
        {
          label: "市",
          key: "city",
          options: [],
        },
        {
          label: "区",
          key: "county",
          options: [],
        },
      ],
      formValue: {
        province: null,
        city: null,
        county: null,
      },
      /** 通过城市搜索服务获取的location */
      locationId: null,
      dailyObj,
      otherKeys,
      dayKeys,
      nightKeys,
      uvArr,
      /** 预报信息 */
      daily: [],
      /** 展开收起控制 */
      osFlagObj: {},
    };
  },
  methods: {
    /** 获取地区id */
    async getLocationId() {
      const validateRes = await this.$refs.form.validate();
      if (!validateRes) {
        this.$q.notify({
          position: "top",
          message: "请先选择需要查询的地址",
          color: "warning",
        });
      }
      if (!this.formValue.county) return;
      try {
        const res = await apiCityLookup({
          location: this.formValue.county.value,
        });
        if (res.status === 200) {
          this.locationId = res.location[0].id;
          this.getWeather();
        } else {
          throw "error";
        }
      } catch (error) {
        this.$q.notify({
          position: "top",
          message: "查询失败，发生了不可描述的错误",
          color: "warning",
        });
      }
    },
    /** 获取地区预报信息 */
    async getWeather() {
      if (!this.locationId) return;
      const res = await apiWeather({ location: this.locationId, day: 3 });
      if (res.status === 200 && res.daily.length > 0) {
        this.osFlagObj = {};
        const osFlagObj = {};
        const dailyRes = res.daily.map((item) => {
          osFlagObj[item.fxDate] = false;
          return {
            ...item,
            // 处理紫外线指数
            uvIndex: uvArr[item.uvIndex],
          };
        });
        this.daily = dailyRes;
        this.osFlagObj = { ...osFlagObj };
      } else {
        this.$q.notify({
          position: "top",
          message: "查询失败，发生了不可描述的错误",
          color: "warning",
        });
      }
    },
    /** 展开收起click */
    osBtnClick(fxDate, flag) {
      this.osFlagObj[fxDate] = !flag;
    },
  },
  watch: {
    // 监听省数据
    "formValue.province": {
      async handler(val) {
        this.formValue.city = null;
        this.formList[1].options = val ? getDataList(val.value) : [];
      },
    },
    // 监听市数据
    "formValue.city": {
      async handler(val) {
        this.formValue.county = null;
        this.formList[2].options = val ? getDataList(val.value) : [];

        await this.$nextTick();
        this.$refs.form.resetValidation();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-card {
  position: relative;
  overflow: hidden;
  transition: max-height 1s ease-in-out 0s;
  &.stow {
    max-height: 500px;
  }
  &.open {
    max-height: 180px;
  }
  .os-btn {
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 1;
  }
}
</style>
